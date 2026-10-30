from conftest import FakeBedrock, parse_sse, text_events, tool_events

USER = {"messages": [{"role": "user", "content": "What does Anal do?"}]}


def test_streams_text_and_done(make_client):
    fake = FakeBedrock(text_events("Anal is ", "a backend engineer."))
    r = make_client(fake).post("/chat", json=USER)
    assert r.status_code == 200
    assert r.headers["content-type"].startswith("text/event-stream")
    events = parse_sse(r.text)
    assert events == [
        ("text", {"delta": "Anal is "}),
        ("text", {"delta": "a backend engineer."}),
        ("done", {}),
    ]


def test_request_has_cache_point_tools_and_page_context(make_client):
    fake = FakeBedrock(text_events("ok"))
    make_client(fake).post("/chat", json={**USER, "page_section": "projects"})
    call = fake.calls[0]
    assert "cachePoint" in call["system"][1]
    assert "'projects'" in call["system"][2]["text"]
    assert "PORTFOLIO DATA" in call["system"][0]["text"]
    assert {t["toolSpec"]["name"] for t in call["toolConfig"]["tools"]} == {"navigate_to_section", "open_link"}


def test_navigation_tool_emits_action_then_continues(make_client):
    fake = FakeBedrock(
        tool_events("navigate_to_section", {"section": "contact"}, lead_text="Sure. "),
        text_events("Here is the contact section."),
    )
    r = make_client(fake).post("/chat", json={"messages": [{"role": "user", "content": "take me to contact"}]})
    events = parse_sse(r.text)
    assert events == [
        ("text", {"delta": "Sure. "}),
        ("action", {"type": "navigate", "target": "contact"}),
        ("text", {"delta": "Here is the contact section."}),
        ("done", {}),
    ]
    # Second round must replay the assistant tool call and our tool result.
    history = fake.calls[1]["messages"]
    assert history[-2]["role"] == "assistant"
    assert history[-2]["content"][1]["toolUse"]["input"] == {"section": "contact"}
    assert history[-1]["content"][0]["toolResult"]["status"] == "success"


def test_invalid_tool_input_emits_no_action_and_reports_error_to_model(make_client):
    fake = FakeBedrock(
        tool_events("navigate_to_section", {"section": "admin"}),
        text_events("Sorry."),
    )
    events = parse_sse(make_client(fake).post("/chat", json=USER).text)
    assert not [e for e in events if e[0] == "action"]
    assert fake.calls[1]["messages"][-1]["content"][0]["toolResult"]["status"] == "error"


def test_tool_rounds_are_capped(make_client):
    loop = tool_events("navigate_to_section", {"section": "top"})
    fake = FakeBedrock(loop, loop, loop, loop, loop)
    events = parse_sse(make_client(fake).post("/chat", json=USER).text)
    assert len(fake.calls) == 3
    assert events[-1][0] == "done"


def test_upstream_failure_becomes_generic_error_event(make_client):
    class Boom:
        def converse_stream(self, **_):
            raise RuntimeError("AccessDeniedException: secret details")

    r = make_client(Boom()).post("/chat", json=USER)
    events = parse_sse(r.text)
    assert events[0][0] == "error"
    assert "secret" not in r.text


def test_validation(make_client):
    c = make_client(FakeBedrock())
    bad = [
        {"messages": []},
        {"messages": [{"role": "assistant", "content": "hi"}]},
        {"messages": [{"role": "user", "content": "a"}, {"role": "user", "content": "b"}]},
        {"messages": [{"role": "user", "content": "x" * 1001}]},
        {"messages": [{"role": "user", "content": "   "}]},
        {"messages": [{"role": "user" if i % 2 == 0 else "assistant", "content": "m"} for i in range(13)]},
    ]
    for body in bad:
        assert c.post("/chat", json=body).status_code == 422, body


def test_unknown_page_section_is_ignored(make_client):
    fake = FakeBedrock(text_events("ok"))
    r = make_client(fake).post("/chat", json={**USER, "page_section": "../etc"})
    assert r.status_code == 200
    assert len(fake.calls[0]["system"]) == 2


def test_rate_limit(make_client):
    c = make_client(FakeBedrock(text_events("a"), text_events("b")), limit=2)
    headers = {"x-forwarded-for": "1.2.3.4"}
    assert c.post("/chat", json=USER, headers=headers).status_code == 200
    assert c.post("/chat", json=USER, headers=headers).status_code == 200
    assert c.post("/chat", json=USER, headers=headers).status_code == 429


def test_rate_limit_uses_rightmost_forwarded_ip(make_client):
    c = make_client(FakeBedrock(text_events("a")), limit=1)
    assert c.post("/chat", json=USER, headers={"x-forwarded-for": "6.6.6.6, 1.1.1.1"}).status_code == 200
    # Spoofing a different leading entry must not buy a fresh quota.
    assert c.post("/chat", json=USER, headers={"x-forwarded-for": "7.7.7.7, 1.1.1.1"}).status_code == 429


def test_cors_preflight(make_client):
    r = make_client(FakeBedrock()).options(
        "/chat",
        headers={"Origin": "https://analkumarbiswas.com", "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type"},
    )
    assert r.headers["access-control-allow-origin"] == "https://analkumarbiswas.com"
    r = make_client(FakeBedrock()).options(
        "/chat", headers={"Origin": "https://evil.example", "Access-Control-Request-Method": "POST"}
    )
    assert "access-control-allow-origin" not in r.headers


def test_health(make_client):
    assert make_client(FakeBedrock()).get("/health").json() == {"status": "ok"}


def test_origin_secret_enforced_when_configured(make_client, monkeypatch):
    from app import main

    monkeypatch.setattr(main.settings, "origin_secret", "s3cret")
    c = make_client(FakeBedrock(text_events("ok")))
    assert c.post("/chat", json=USER).status_code == 403
    assert c.post("/chat", json=USER, headers={"x-origin-secret": "wrong"}).status_code == 403
    assert c.post("/chat", json=USER, headers={"x-origin-secret": "s3cret"}).status_code == 200


def test_tool_call_written_as_text_becomes_action(make_client):
    fake = FakeBedrock(text_events("navigate_to", '_section("ski', 'lls")\n\n', "Anal's main skills are Python."))
    events = parse_sse(make_client(fake).post("/chat", json=USER).text)
    assert events == [
        ("action", {"type": "navigate", "target": "skills"}),
        ("text", {"delta": "Anal's main skills are Python."}),
        ("done", {}),
    ]


def test_backticked_keyword_call_mid_text_is_stripped():
    from app.tools import LeakedCallFilter

    f = LeakedCallFilter()
    out = f.feed("Here you go. `open_link(link='linkedin')` Enjoy.") + f.flush()
    text = "".join(d["delta"] for k, d in out if k == "text")
    assert text == "Here you go. Enjoy."
    assert ("action", {"type": "open_link", "target": "linkedin"}) in out


def test_ordinary_text_passes_through_and_invalid_leak_is_dropped():
    from app.tools import LeakedCallFilter

    f = LeakedCallFilter()
    out = f.feed("He can open") + f.feed("_source work and navigate teams. ") + f.feed('navigate_to_section("admin")') + f.flush()
    assert [k for k, _ in out] == ["text", "text"]
    assert "".join(d["delta"] for _, d in out) == "He can open_source work and navigate teams. "


def test_unclosed_call_is_released_after_hold_limit():
    from app.tools import LeakedCallFilter

    f = LeakedCallFilter()
    out = f.feed("navigate_to_section(" + "x" * 100)
    assert "".join(d["delta"] for _, d in out).startswith("navigate_to_section(")
