import { useCallback, useEffect, useRef, useState } from "react";
import { navigateToSection } from "./actions";
import { API_URL, useAssistant } from "./useAssistant";

const STARTERS = [
  "What has Anal built?",
  "Which technologies are a strength?",
  "Take me to contact",
];

const icon = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const isMobile = () => window.matchMedia("(max-width: 640px)").matches;

const AssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  const { messages, streaming, error, send, reset } = useAssistant({
    onNavigate: (section) => navigateToSection(section, { moveFocus: false }),
    // On phones the panel covers the page, so reveal the section once the reply is complete.
    onDone: (navigated) => {
      if (navigated && isMobile()) setOpen(false);
    },
  });

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, error, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!API_URL) return null;

  const submit = (text: string) => {
    if (!text.trim() || streaming) return;
    setDraft("");
    void send(text);
  };

  return (
    <>
      {!open && (
        <button ref={launcherRef} type="button" className="ai-fab" onClick={() => setOpen(true)} aria-label="Ask the portfolio assistant" aria-haspopup="dialog">
          <svg {...icon}>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
          </svg>
          <span className="ai-fab-t">Ask AI</span>
        </button>
      )}

      {open && (
        <section className="ai-panel" role="dialog" aria-label="Portfolio assistant">
          <header className="ai-head">
            <div>
              <b className="disp">Portfolio assistant</b>
              <span>AI answers from this portfolio only</span>
            </div>
            <div className="ai-head-btns">
              {messages.length > 0 && (
                <button type="button" className="ai-ibtn" onClick={reset} aria-label="Clear conversation">
                  <svg {...icon} width={18} height={18}><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" /></svg>
                </button>
              )}
              <button type="button" className="ai-ibtn" onClick={close} aria-label="Close assistant">
                <svg {...icon} width={18} height={18}><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
          </header>

          <div className="ai-log" ref={logRef} role="log" aria-live="polite" aria-busy={streaming}>
            {messages.length === 0 && (
              <div className="ai-empty">
                <p>Ask about experience, projects or skills, or ask me to take you to a section.</p>
                <div className="ai-starters">
                  {STARTERS.map((q) => (
                    <button key={q} type="button" className="ai-chip" onClick={() => submit(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`ai-msg ai-${m.role}`}>
                {m.content || (streaming && m.role === "assistant" ? <span className="ai-dots" aria-label="Thinking"><i /><i /><i /></span> : null)}
                {m.links?.map((l) => (
                  <a key={l.href} className="ai-link" href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            ))}

            {error && <div className="ai-msg ai-err" role="alert">{error}</div>}
          </div>

          <form
            className="ai-form"
            onSubmit={(e) => {
              e.preventDefault();
              submit(draft);
            }}
          >
            <label htmlFor="ai-input" className="ai-sr">Message</label>
            <textarea
              id="ai-input"
              ref={inputRef}
              rows={1}
              maxLength={1000}
              value={draft}
              placeholder="Ask a question…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(draft);
                }
              }}
            />
            <button type="submit" className="ai-send" disabled={streaming || !draft.trim()} aria-label="Send message">
              <svg {...icon} width={18} height={18}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default AssistantWidget;
