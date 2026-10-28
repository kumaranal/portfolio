import { useCallback, useEffect, useRef, useState } from "react";
import { resolveLink, type AssistantAction, type AssistantLink } from "./actions";

export const API_URL: string | undefined = import.meta.env.VITE_ASSISTANT_API_URL;

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: AssistantLink[];
};

type Options = {
  onNavigate: (section: string) => void;
  onDone: (navigated: boolean) => void;
};

const STORAGE_KEY = "akb-assistant-chat";
const HISTORY_LIMIT = 10;
const GENERIC_ERROR = "The assistant is unavailable right now. Please use the contact section instead.";

const uid = () => Math.random().toString(36).slice(2);

const load = (): ChatMessage[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
};

/** The API requires alternating roles that start and end with the user, so merge repeats and drop leading replies. */
const toHistory = (messages: ChatMessage[]) => {
  const out: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of messages) {
    if (!m.content.trim()) continue;
    const last = out[out.length - 1];
    if (last && last.role === m.role) last.content += `\n${m.content}`;
    else out.push({ role: m.role, content: m.content });
  }
  const recent = out.slice(-HISTORY_LIMIT);
  while (recent.length && recent[0].role !== "user") recent.shift();
  return recent;
};

/** Section currently in view, sent as context so "this project" questions make sense. */
const useCurrentSection = () => {
  const ref = useRef<string | undefined>();
  useEffect(() => {
    const ids = ["top", "about", "experience", "projects", "skills", "education", "certifications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) ref.current = e.target.id;
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
};

export const useAssistant = ({ onNavigate, onDone }: Options) => {
  const [messages, setMessages] = useState<ChatMessage[]>(load);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sectionRef = useCurrentSection();
  const handlers = useRef({ onNavigate, onDone });
  handlers.current = { onNavigate, onDone };

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage unavailable: chat still works, just isn't remembered */
    }
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const patchReply = (id: string, fn: (m: ChatMessage) => ChatMessage) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? fn(m) : m)));

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || streaming || !API_URL) return;

      const replyId = uid();
      const history = toHistory([...messages, { id: "", role: "user", content }]);
      setMessages((prev) => [...prev, { id: uid(), role: "user", content }, { id: replyId, role: "assistant", content: "" }]);
      setStreaming(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;
      let navigated = false;

      const fail = (message: string) => {
        setError(message);
        setMessages((prev) => prev.filter((m) => m.id !== replyId || m.content));
      };

      try {
        const res = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history, page_section: sectionRef.current }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const detail = res.status === 429 ? (await res.json().catch(() => null))?.detail : null;
          return fail(detail ?? GENERIC_ERROR);
        }

        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += value;
          const frames = buffer.split("\n\n");
          buffer = frames.pop() ?? "";
          for (const frame of frames) {
            const event = /^event: (.+)$/m.exec(frame)?.[1];
            const raw = /^data: (.+)$/m.exec(frame)?.[1];
            if (!event || !raw) continue;
            const data = JSON.parse(raw);
            if (event === "text") {
              patchReply(replyId, (m) => ({ ...m, content: m.content + data.delta }));
            } else if (event === "action") {
              const action = data as AssistantAction;
              if (action.type === "navigate") {
                navigated = true;
                handlers.current.onNavigate(action.target);
              } else {
                const link = resolveLink(action.target);
                if (link) patchReply(replyId, (m) => ({ ...m, links: [...(m.links ?? []), link] }));
              }
            } else if (event === "error") {
              fail(data.message ?? GENERIC_ERROR);
            }
          }
        }
        handlers.current.onDone(navigated);
      } catch (e) {
        if ((e as Error).name !== "AbortError") fail(GENERIC_ERROR);
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming, sectionRef],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setStreaming(false);
  }, []);

  return { messages, streaming, error, send, reset };
};
