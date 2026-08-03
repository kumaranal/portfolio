import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Linkedin, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  }

  return (
    <section id="contact" className="hairline-t py-24 md:py-32">
      <div className="container-page">
        <p className="text-mono-label mb-6">Contact</p>

        <a href={`mailto:${site.email}`} className="group block">
          <SplitText
            as="h2"
            text="Let's build something."
            className="text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-8xl"
          />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-3 border-b border-hairline pb-2 font-display text-2xl transition-colors group-hover:border-accent group-hover:text-accent md:text-3xl"
          >
            {site.email}
            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.span>
        </a>

        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-10 md:flex-row md:items-center md:justify-between">
          <Reveal className="flex flex-wrap gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {site.location}
            </span>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Reveal>

          <Magnetic>
            <button
              onClick={handleCopy}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-5 text-sm transition-colors hover:border-hairline-strong"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
