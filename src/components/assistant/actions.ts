import { profile } from "@/data/portfolio";
import { scrollToSection } from "@/hooks/use-lenis";

export type AssistantAction =
  | { type: "navigate"; target: string }
  | { type: "open_link"; target: string };

export type AssistantLink = { label: string; href: string };

const LINKS: Record<string, AssistantLink> = {
  resume: { label: "Resume", href: profile.resumeFile },
  full_resume: { label: "Full resume", href: profile.fullResumeFile },
  linkedin: { label: "LinkedIn", href: profile.linkedin },
  whatsapp: { label: "WhatsApp", href: profile.whatsappHref },
  email: { label: "Email", href: `mailto:${profile.email}` },
};

export const resolveLink = (target: string): AssistantLink | undefined => LINKS[target];

/** Scrolls to the section and moves focus to its heading so screen-reader users land there too. */
export const navigateToSection = (id: string, { moveFocus }: { moveFocus: boolean }) => {
  scrollToSection(id);
  if (!moveFocus) return;
  const heading = document.querySelector<HTMLElement>(`#${CSS.escape(id)} h1, #${CSS.escape(id)} h2`);
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
};
