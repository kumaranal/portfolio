import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/content/projects";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { springs } from "@/lib/motion";

const GRADIENTS: Record<string, string> = {
  "qa-automation": "from-blue-500 to-cyan-400",
  iqgeo: "from-amber-500 to-orange-400",
  devebol: "from-violet-500 to-fuchsia-400",
  readmyrhythm: "from-rose-500 to-red-400",
  affco: "from-emerald-500 to-teal-400",
  golf: "from-lime-500 to-green-400",
  fiat: "from-sky-500 to-blue-400",
  comcast: "from-indigo-500 to-purple-400",
};

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.soft);
  const springY = useSpring(y, springs.soft);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const hovered = projects.find((p) => p.id === hoveredId);

  return (
    <section id="projects" className="hairline-t py-24 md:py-32">
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <SplitText as="h2" text="Selected work" className="text-4xl font-semibold md:text-6xl" />
          <Reveal delay={0.2} className="max-w-sm text-muted-foreground">
            Eight products shipped across QA tooling, healthcare, real estate, sports-tech, and
            telecom — spanning three companies over six years.
          </Reveal>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredId(null)}
          className="relative"
        >
          {projects.map((project) => {
            const Wrapper = project.url ? "a" : "div";
            return (
              <Reveal key={project.id} as="div">
                <Wrapper
                  {...(project.url
                    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onMouseEnter={() => setHoveredId(project.id)}
                  className="hairline-t group flex flex-col gap-2 py-6 md:flex-row md:items-center md:gap-8 md:py-8"
                >
                  <span className="font-mono text-sm text-muted-foreground md:w-12">
                    {project.index}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-medium transition-colors group-hover:text-accent md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.client} · {project.period}
                    </p>
                  </div>

                  <div className="hidden max-w-md flex-1 text-sm text-muted-foreground lg:block">
                    {project.description}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:w-56 md:justify-end">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex w-10 shrink-0 justify-end">
                    {project.url ? (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
          <div className="hairline-t" />

          {/* Cursor-tracking preview */}
          <motion.div
            style={{ x: springX, y: springY }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            {hovered && (
              <div
                className={`flex h-40 w-56 flex-col justify-between rounded-2xl bg-gradient-to-br p-4 text-white shadow-lg ${
                  GRADIENTS[hovered.id] ?? "from-neutral-500 to-neutral-400"
                }`}
              >
                <span className="text-xs uppercase tracking-wide opacity-80">{hovered.category}</span>
                <span className="font-display text-lg font-semibold leading-tight">{hovered.title}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
