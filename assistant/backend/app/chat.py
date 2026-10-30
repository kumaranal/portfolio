"""Agent loop: stream Bedrock Converse output to SSE events, executing tool calls as client actions."""
import json
import logging
from collections.abc import Callable, Iterator

from .tools import TOOL_CONFIG, LeakedCallFilter, to_action

log = logging.getLogger("assistant.chat")

GENERIC_ERROR = "The assistant is unavailable right now. Please use the contact section instead."


def sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _tool_result(tool_use_id: str, payload: dict, ok: bool) -> dict:
    return {
        "toolResult": {
            "toolUseId": tool_use_id,
            "content": [{"json": payload}],
            "status": "success" if ok else "error",
        }
    }


def run_chat(
    converse_stream: Callable[..., dict],
    *,
    model_id: str,
    system: list[dict],
    messages: list[dict],
    max_tokens: int,
    temperature: float,
    max_rounds: int,
) -> Iterator[str]:
    messages = list(messages)
    try:
        for _ in range(max_rounds):
            response = converse_stream(
                modelId=model_id,
                system=system,
                messages=messages,
                toolConfig=TOOL_CONFIG,
                inferenceConfig={"maxTokens": max_tokens, "temperature": temperature},
            )

            content: list[dict] = []  # assistant message being rebuilt, in order
            text_parts: list[str] = []
            tool: dict | None = None
            stop_reason = None
            leaks = LeakedCallFilter()

            def emit(items: list[tuple[str, dict]]) -> Iterator[str]:
                for kind, data in items:
                    if kind == "text":
                        text_parts.append(data["delta"])
                    yield sse(kind, data)

            for event in response["stream"]:
                if "contentBlockStart" in event:
                    start = event["contentBlockStart"]["start"].get("toolUse")
                    if start:
                        tool = {"id": start["toolUseId"], "name": start["name"], "input": ""}
                elif "contentBlockDelta" in event:
                    delta = event["contentBlockDelta"]["delta"]
                    if "text" in delta:
                        yield from emit(leaks.feed(delta["text"]))
                    elif "toolUse" in delta and tool is not None:
                        tool["input"] += delta["toolUse"].get("input", "")
                elif "contentBlockStop" in event:
                    yield from emit(leaks.flush())
                    if tool is not None:
                        try:
                            tool["parsed"] = json.loads(tool["input"] or "{}")
                        except json.JSONDecodeError:
                            tool["parsed"] = {}
                        content.append(
                            {"toolUse": {"toolUseId": tool["id"], "name": tool["name"], "input": tool["parsed"]}}
                        )
                        tool = None
                    elif text_parts:
                        content.append({"text": "".join(text_parts)})
                        text_parts = []
                elif "messageStop" in event:
                    stop_reason = event["messageStop"]["stopReason"]

            yield from emit(leaks.flush())
            if text_parts:
                content.append({"text": "".join(text_parts)})
                text_parts = []

            if stop_reason != "tool_use":
                break

            results = []
            for block in content:
                if "toolUse" not in block:
                    continue
                call = block["toolUse"]
                action = to_action(call["name"], call["input"])
                if action:
                    yield sse("action", action)
                    results.append(_tool_result(call["toolUseId"], {"status": "done"}, True))
                else:
                    results.append(_tool_result(call["toolUseId"], {"error": "invalid tool input"}, False))

            messages.append({"role": "assistant", "content": content})
            messages.append({"role": "user", "content": results})

        yield sse("done", {})
    except Exception:  # noqa: BLE001 - never leak provider errors to visitors
        log.exception("chat failed")
        yield sse("error", {"code": "upstream_error", "message": GENERIC_ERROR})
