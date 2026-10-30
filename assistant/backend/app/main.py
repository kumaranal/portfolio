import hmac
import logging
from typing import Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, field_validator, model_validator

from .bedrock import get_client
from .chat import run_chat
from .prompt import build_system_blocks
from .ratelimit import MemoryLimiter, make_limiter
from .settings import get_settings
from .tools import SECTIONS

logging.basicConfig(level=logging.INFO)
settings = get_settings()

app = FastAPI(title="Portfolio assistant", docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["content-type"],
)

limiter = make_limiter(settings.rate_limit_table, settings.daily_message_limit, settings.aws_region)


class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)

    @field_validator("content")
    @classmethod
    def _cap_length(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("empty message")
        if len(v) > settings.max_message_chars:
            raise ValueError(f"message exceeds {settings.max_message_chars} characters")
        return v


class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1)
    page_section: str | None = None

    @model_validator(mode="after")
    def _check_history(self):
        msgs = self.messages
        if len(msgs) > settings.max_messages:
            raise ValueError(f"at most {settings.max_messages} messages")
        if msgs[0].role != "user" or msgs[-1].role != "user":
            raise ValueError("conversation must start and end with a user message")
        if any(a.role == b.role for a, b in zip(msgs, msgs[1:])):
            raise ValueError("roles must alternate")
        if self.page_section is not None and self.page_section not in SECTIONS:
            self.page_section = None
        return self


def client_ip(request: Request) -> str:
    # Behind CloudFront the rightmost X-Forwarded-For entry is the viewer IP it observed.
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[-1].strip()
    return request.client.host if request.client else "unknown"


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(body: ChatRequest, request: Request):
    if settings.origin_secret and not hmac.compare_digest(
        request.headers.get("x-origin-secret", ""), settings.origin_secret
    ):
        raise HTTPException(status_code=403, detail="Forbidden")
    if not limiter.allow(client_ip(request)):
        raise HTTPException(status_code=429, detail="Daily message limit reached. Please use the contact section.")

    system = build_system_blocks(settings.knowledge_path, body.page_section)
    messages = [{"role": m.role, "content": [{"text": m.content}]} for m in body.messages]

    stream = run_chat(
        get_client().converse_stream,
        model_id=settings.model_id,
        system=system,
        messages=messages,
        max_tokens=settings.max_output_tokens,
        temperature=settings.temperature,
        max_rounds=settings.max_tool_rounds,
    )
    return StreamingResponse(
        stream,
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
