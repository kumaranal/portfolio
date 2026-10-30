from functools import lru_cache

import boto3
from botocore.config import Config

from .settings import get_settings


@lru_cache
def get_client():
    s = get_settings()
    return boto3.client(
        "bedrock-runtime",
        region_name=s.aws_region,
        config=Config(retries={"max_attempts": 3, "mode": "adaptive"}, read_timeout=60),
    )
