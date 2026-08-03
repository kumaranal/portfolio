import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/experience";
import { SplitText } from "@/components/motion/SplitText";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Experience() {
  const ids = experience.map((e) => `exp-${e.id}`);
  const active = useActiveSection(ids);
  const activeEntry = experience.find((e) => `exp-${e.id}` === active) ?? experience[0];

  return (
    <section id="experience" className="hairline-t py-24 md:py-32">
      <div className="container-page">
        <SplitText as="h2" text="Where I've worked" className="mb-16 text-4xl font-semibold md:mb-24 md:text-6xl" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-28 flex flex-col gap-6">
              <motion.span
                key={activeEntry.companyShort}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display text-5xl font-semibold"
              >
                {activeEntry.companyShort}
              </motion.span>
              <p className="text-sm text-muted-foreground">{activeEntry.role}</p>
              <p className="text-mono-label">
                {activeEntry.start} — {activeEntry.end}
              </p>
              <a
                href={activeEntry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Visit company
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <div className="mt-4 flex flex-col gap-2">
                {experience.map((e) => (
                  <div
                    key={e.id}
                    className="h-px w-full origin-left bg-hairline transition-transform duration-500"
                    style={{
                      transform: `scaleX(${e.id === activeEntry.id ? 1 : 0.25})`,
                      opacity: e.id === activeEntry.id ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {experience.map((entry) => (
              <div key={entry.id} id={`exp-${entry.id}`} className="scroll-mt-28">
                <div className="mb-8 flex flex-col gap-1 md:hidden">
                  <h3 className="font-display text-3xl font-semibold">{entry.companyShort}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.role} · {entry.start} — {entry.end}
                  </p>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={staggerContainer(0.12)}
                  className="flex flex-col gap-10"
                >
                  {entry.projects.map((project) => (
                    <motion.div key={project.name} variants={fadeUp} className="group">
                      <h4 className="mb-2 font-display text-xl font-medium md:text-2xl">
                        {project.name}
                      </h4>
                      <p className="max-w-2xl text-muted-foreground">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
