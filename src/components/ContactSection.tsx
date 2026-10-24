import { useState } from "react";
import { profile } from "@/data/portfolio";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    // Fire-and-forget: a hung or denied clipboard permission shouldn't block the feedback below.
    navigator.clipboard?.writeText(profile.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact rv">
          <h2 className="c-h disp">Let's build something that scales.</h2>
          <p className="c-sub">
            Open to conversations about backend, full-stack and real-time
            systems. Reach me by email, phone or WhatsApp.
          </p>
          <div className="c-row">
            <a
              className="clink clink-f"
              href={profile.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download resume
            </a>
            <a className="clink" href={`mailto:${profile.email}`}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {profile.email}
            </a>
            <a className="clink" href={profile.phoneHref}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92z" />
              </svg>
              {profile.phone}
            </a>
            <button
              type="button"
              className={copied ? "clink clink-f" : "clink"}
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="8" y="8" width="14" height="14" rx="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              className="clink"
              href={profile.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.25 11.5a8.25 8.25 0 0 1-12.1 7.25L3 20l1.25-4.9A8.25 8.25 0 1 1 20.25 11.5Z" />
                <path d="M8.1 6.9a1.1 1.1 0 0 0-.8.35l-.7.75a2 2 0 0 0-.45 1.8c.65 2.9 3.15 5.65 6.25 6.95a2 2 0 0 0 1.85-.2l.9-.6a1.1 1.1 0 0 0 .05-1.8l-1.45-1.1a1.1 1.1 0 0 0-1.4.1l-.55.55a8.1 8.1 0 0 1-2.8-2.95l.55-.5a1.1 1.1 0 0 0 .2-1.35L9.05 7.5a1.1 1.1 0 0 0-.95-.6Z" />
              </svg>
              WhatsApp
            </a>
            <a
              className="clink"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
