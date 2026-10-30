"""Tools the model may call. The browser performs them; the server only validates."""
import re

SECTIONS = [
    "top",
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
    "contact",
]
LINKS = ["resume", "full_resume", "linkedin", "whatsapp", "email"]

TOOL_CONFIG = {
    "tools": [
        {
            "toolSpec": {
                "name": "navigate_to_section",
                "description": (
                    "Scroll the visitor's page to a section of the portfolio. Use when the visitor "
                    "asks to be taken somewhere, or when showing a section clearly answers their question."
                ),
                "inputSchema": {
                    "json": {
                        "type": "object",
                        "properties": {"section": {"type": "string", "enum": SECTIONS}},
                        "required": ["section"],
                    }
                },
            }
        },
        {
            "toolSpec": {
                "name": "open_link",
                "description": (
                    "Offer an external link (resume, LinkedIn, WhatsApp, email) to the visitor. "
                    "Use only when they ask for it."
                ),
                "inputSchema": {
                    "json": {
                        "type": "object",
                        "properties": {"link": {"type": "string", "enum": LINKS}},
                        "required": ["link"],
                    }
                },
            }
        },
    ]
}


def to_action(name: str, tool_input: dict) -> dict | None:
    """Return the client action for a tool call, or None if the call is invalid."""
    if name == "navigate_to_section":
        section = tool_input.get("section")
        if section in SECTIONS:
            return {"type": "navigate", "target": section}
    elif name == "open_link":
        link = tool_input.get("link")
        if link in LINKS:
            return {"type": "open_link", "target": link}
    return None


# Some models (Amazon Nova) occasionally write a tool call into the reply text, e.g.
# navigate_to_section("skills"), instead of calling the tool.
_LEAKED_CALL = re.compile(
    r"`?\b(navigate_to_section|open_link)\(\s*(?:\w+\s*=\s*)?[\"']?([\w-]*)[\"']?\s*\)`?[ \t]*\n*"
)
_CALL_PREFIXES = ("navigate_to_section(", "open_link(")
_ARG_NAMES = {"navigate_to_section": "section", "open_link": "link"}


def _hold_from(buf: str) -> int:
    """Index from which buf might still become a leaked call, so must not be streamed yet."""
    starts = []
    for prefix in _CALL_PREFIXES:
        i = buf.rfind(prefix)
        if i != -1 and ")" not in buf[i:]:
            starts.append(i)
    for i in range(max(0, len(buf) - len(_CALL_PREFIXES[0])), len(buf)):
        at_word_start = i == 0 or not (buf[i - 1].isalnum() or buf[i - 1] == "_")
        if at_word_start and any(p.startswith(buf[i:]) for p in _CALL_PREFIXES):
            starts.append(i)
            break
    if not starts:
        return len(buf)
    i = min(starts)
    return i - 1 if i and buf[i - 1] == "`" else i


class LeakedCallFilter:
    """Strips tool calls written as text from streamed deltas and turns them into actions."""

    MAX_HOLD = 80  # never sit on more than this much text waiting for a closing paren

    def __init__(self) -> None:
        self._buf = ""

    def feed(self, text: str) -> list[tuple[str, dict]]:
        self._buf += text
        return self._drain(final=False)

    def flush(self) -> list[tuple[str, dict]]:
        return self._drain(final=True)

    def _drain(self, final: bool) -> list[tuple[str, dict]]:
        out: list[tuple[str, dict]] = []
        while match := _LEAKED_CALL.search(self._buf):
            if match.start():
                out.append(("text", {"delta": self._buf[: match.start()]}))
            action = to_action(match[1], {_ARG_NAMES[match[1]]: match[2]})
            if action:
                out.append(("action", action))
            self._buf = self._buf[match.end() :]
        cut = len(self._buf) if final else _hold_from(self._buf)
        if len(self._buf) - cut > self.MAX_HOLD:
            cut = len(self._buf)
        if cut:
            out.append(("text", {"delta": self._buf[:cut]}))
            self._buf = self._buf[cut:]
        return out
