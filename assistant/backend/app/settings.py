from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="ASSISTANT_", env_file=".env", extra="ignore")

    # Bedrock cross-region inference profile ID (or model ID) for Claude Haiku.
    # Verify with: aws bedrock list-inference-profiles
    model_id: str = "us.amazon.nova-2-lite-v1:0"
    aws_region: str = "us-east-1"
    max_output_tokens: int = 600
    temperature: float = 0.3
    max_tool_rounds: int = 3

    # Request limits
    max_messages: int = 12
    max_message_chars: int = 1000

    # Comma-separated list of allowed browser origins.
    allowed_origins: str = "http://localhost:8080,https://analkumarbiswas.com"

    # Per-IP daily quota. Empty table name -> in-memory counter (local dev only).
    rate_limit_table: str = ""
    daily_message_limit: int = 40

    # Shared secret CloudFront adds to origin requests; /chat rejects calls without it when set.
    origin_secret: str = ""

    knowledge_path: Path = Path(__file__).resolve().parent.parent / "knowledge" / "portfolio.json"

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
