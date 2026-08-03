import { Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="hairline-t container-page flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
      <p className="text-mono-label">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mono-label flex items-center gap-1.5 !text-foreground/70 hover:!text-accent"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
        <a
          href={`mailto:${site.email}`}
          className="text-mono-label flex items-center gap-1.5 !text-foreground/70 hover:!text-accent"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
      </div>
    </footer>
  );
}
