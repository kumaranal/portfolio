import type { CSSProperties } from "react";
import { profile } from "@/data/portfolio";

const HeroSection = () => {
  return (
    <section id="top" className="hero">
      <div className="dots" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <p className="mono in" style={{ "--i": 0 } as CSSProperties}>
            {profile.role} · 6 years · India
          </p>
          <h1
            className="h1 disp in"
            style={{ "--i": 1, marginTop: 22 } as CSSProperties}
          >
            Building <span className="hl">Full-stack systems</span> at scale.
          </h1>
          <p
            className="sub in"
            style={{ "--i": 2, marginTop: 26 } as CSSProperties}
          >
            Senior Software Engineer with 6 years of experience building
            full-stack and backend systems with Python, FastAPI, Node.js, and
            TypeScript, backed by React/Angular frontends and PostgreSQL/MongoDB
            data layers. Experienced in REST/GraphQL APIs, microservices,
            event-driven systems, cloud deployments, and applied AI
            integrations.
          </p>
          <div
            className="in"
            style={
              {
                "--i": 3,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 36,
              } as CSSProperties
            }
          >
            <a
              className="btn btn-p"
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
            <a className="btn btn-g" href="#projects">
              View projects
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
            </a>
          </div>
        </div>
        <div className="portrait-wrap in" style={{ "--i": 2 } as CSSProperties}>
          <div className="portrait">
            <img
              src="/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
