import { Linkedin, Mail } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClock } from "@/hooks/useClock";
import { site } from "@/content/site";

const SECTION_IDS = ["home", "experience", "projects", "skills", "education", "contact"];

const LABELS: Record<string, string> = {
  home: "Home",
  experience: "Work",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  contact: "Contact",
};

export function StatusBar() {
  const active = useActiveSection(SECTION_IDS);
  const time = useClock();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-center justify-between border-t border-hairline bg-background/80 px-6 py-3 backdrop-blur-md md:flex md:px-10">
      <div className="pointer-events-auto flex items-center gap-2 text-mono-label">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {site.availability}
      </div>

      <div className="pointer-events-auto text-mono-label">{LABELS[active] ?? "Home"}</div>

      <div className="pointer-events-auto flex items-center gap-4">
        <span className="text-mono-label">{site.location} · {time} IST</span>
        <div className="flex items-center gap-3">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
