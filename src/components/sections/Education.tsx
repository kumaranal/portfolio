import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { education } from "@/content/education";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="hairline-t py-24 md:py-32">
      <div className="container-page">
        <SplitText as="h2" text="Education" className="mb-16 text-4xl font-semibold md:mb-24 md:text-6xl" />

        <div ref={ref} className="relative">
          <div className="absolute left-0 right-0 top-2 hidden h-px bg-hairline md:block" />
          <motion.div
            style={{ scaleX }}
            className="absolute left-0 right-0 top-2 hidden h-px origin-left bg-accent md:block"
          />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {education.map((entry, i) => (
              <Reveal key={entry.degree} delay={i * 0.1} className="relative pt-0 md:pt-8">
                <span className="mb-4 hidden h-3 w-3 -translate-y-[calc(2rem+6px)] rounded-full border-2 border-accent bg-background md:absolute md:left-0 md:top-2 md:block md:-translate-x-1/2" />
                <p className="text-mono-label mb-2">
                  {entry.start} — {entry.end}
                </p>
                <h3 className="mb-1 font-display text-xl font-medium">{entry.degree}</h3>
                <p className="text-sm text-muted-foreground">{entry.institution}</p>
                <p className="text-sm text-muted-foreground">{entry.board}</p>
                <p className="mt-2 text-sm font-medium text-accent">{entry.score}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
