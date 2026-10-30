"""Tools the model may call. The browser performs them; the server only validates."""

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
