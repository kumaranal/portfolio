import json

import pytest
from fastapi.testclient import TestClient

from app import main


def text_events(*chunks: str, stop="end_turn"):
    events = [{"contentBlockDelta": {"delta": {"text": c}, "contentBlockIndex": 0}} for c in chunks]
    events.append({"contentBlockStop": {"contentBlockIndex": 0}})
    events.append({"messageStop": {"stopReason": stop}})
    return events


def tool_events(name: str, tool_input: dict, lead_text: str = ""):
    events = []
    idx = 0
    if lead_text:
        events += [
            {"contentBlockDelta": {"delta": {"text": lead_text}, "contentBlockIndex": idx}},
            {"contentBlockStop": {"contentBlockIndex": idx}},
        ]
        idx += 1
    raw = json.dumps(tool_input)
    mid = len(raw) // 2
    events += [
        {"contentBlockStart": {"start": {"toolUse": {"toolUseId": "t1", "name": name}}, "contentBlockIndex": idx}},
        {"contentBlockDelta": {"delta": {"toolUse": {"input": raw[:mid]}}, "contentBlockIndex": idx}},
        {"contentBlockDelta": {"delta": {"toolUse": {"input": raw[mid:]}}, "contentBlockIndex": idx}},
        {"contentBlockStop": {"contentBlockIndex": idx}},
        {"messageStop": {"stopReason": "tool_use"}},
    ]
    return events


class FakeBedrock:
    """Returns scripted streams, one per converse_stream call, and records the requests."""

    def __init__(self, *rounds):
        self.rounds = list(rounds)
        self.calls: list[dict] = []

    def converse_stream(self, **kwargs):
        self.calls.append(kwargs)
        return {"stream": iter(self.rounds[len(self.calls) - 1])}


def parse_sse(body: str) -> list[tuple[str, dict]]:
    out = []
    for block in body.strip().split("\n\n"):
        lines = block.split("\n")
        out.append((lines[0].removeprefix("event: "), json.loads(lines[1].removeprefix("data: "))))
    return out


@pytest.fixture
def make_client(monkeypatch):
    def _make(fake: FakeBedrock, limit: int | None = None):
        monkeypatch.setattr(main, "get_client", lambda: fake)
        if limit is not None:
            monkeypatch.setattr(main, "limiter", main.MemoryLimiter(limit))
        else:
            monkeypatch.setattr(main, "limiter", main.MemoryLimiter(1000))
        return TestClient(main.app)

    return _make
