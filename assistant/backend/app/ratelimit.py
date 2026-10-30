import threading
import time
from datetime import datetime, timezone

import boto3
from botocore.exceptions import ClientError


def _today() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


class MemoryLimiter:
    """Process-local counter for local development and tests."""

    def __init__(self, limit: int):
        self.limit = limit
        self._counts: dict[str, int] = {}
        self._lock = threading.Lock()

    def allow(self, ip: str) -> bool:
        key = f"{ip}#{_today()}"
        with self._lock:
            count = self._counts.get(key, 0)
            if count >= self.limit:
                return False
            self._counts[key] = count + 1
            return True


class DynamoLimiter:
    """Atomic per-IP daily counter; items expire via the table's TTL attribute `ttl`."""

    def __init__(self, table_name: str, limit: int, region: str):
        self.table = boto3.resource("dynamodb", region_name=region).Table(table_name)
        self.limit = limit

    def allow(self, ip: str) -> bool:
        try:
            self.table.update_item(
                Key={"pk": f"{ip}#{_today()}"},
                UpdateExpression="ADD cnt :one SET #ttl = if_not_exists(#ttl, :ttl)",
                ConditionExpression="attribute_not_exists(cnt) OR cnt < :limit",
                ExpressionAttributeNames={"#ttl": "ttl"},
                ExpressionAttributeValues={
                    ":one": 1,
                    ":limit": self.limit,
                    ":ttl": int(time.time()) + 2 * 86400,
                },
            )
            return True
        except ClientError as e:
            if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
                return False
            raise


def make_limiter(table_name: str, limit: int, region: str):
    if table_name:
        return DynamoLimiter(table_name, limit, region)
    return MemoryLimiter(limit)
