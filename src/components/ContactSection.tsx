import { useState } from "react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/Reveal";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard unavailable — still flip the label so the click feels acknowledged
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 md:py-16 lg:py-24">
        {/* <div className="mb-6 font-heading text-xs font-semibold uppercase tracking-[0.14em] md:mb-8">
          06 · Contact
        </div> */}
        <h2 className="mb-7 max-w-[24ch] font-heading text-[30px] font-extrabold leading-[0.98] tracking-tight md:mb-9 md:text-6xl lg:text-[72px]">
          Open to my next role — let's talk about where I'd fit.
        </h2>
        <Reveal className="flex flex-wrap items-end gap-8 md:gap-14">
          <div className="min-w-0 flex-[1_1_300px] grid gap-3">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t-2 border-primary-foreground/50 pt-2.5">
              <span className="w-[68px] flex-none font-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
                Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-base underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t-2 border-primary-foreground/50 pt-2.5">
              <span className="w-[68px] flex-none font-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
                Phone
              </span>
              <a
                href={profile.phoneHref}
                className="text-base underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                {profile.phone}
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t-2 border-primary-foreground/50 pt-2.5">
              <span className="w-[68px] flex-none font-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
                LinkedIn
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                {profile.linkedinLabel}
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-y-2 border-primary-foreground/50 py-2.5">
              <span className="w-[68px] flex-none font-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
                Web
              </span>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                analkumarbiswas.com
              </a>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_260px] flex-wrap gap-2.5">
            <a href={profile.resumeFile} download>
              <Button className="rounded-none border-2 border-transparent bg-primary-foreground justify-start text-primary hover:bg-primary-foreground/90">
                Download resume
              </Button>
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={copyEmail}
              className="min-w-[124px] justify-start rounded-none border-2 border-primary-foreground/65 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              {copied ? "Copied" : "Copy email"}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
