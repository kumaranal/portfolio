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
            Open to conversations about backend, full-stack and real-time systems. The fastest way to reach
            me is email.
          </p>
          <div className="c-row">
            <a className="clink clink-f" href={profile.resumeFile} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download resume
            </a>
            <a className="clink" href={`mailto:${profile.email}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {profile.email}
            </a>
            <button
              type="button"
              className={copied ? "clink clink-f" : "clink"}
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="8" y="8" width="14" height="14" rx="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
              {copied ? "Copied" : "Copy email"}
            </button>
            <a className="clink" href={profile.phoneHref}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              {profile.phone}
            </a>
            <a className="clink" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
