import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories } from "@/content/skills";
import { SplitText } from "@/components/motion/SplitText";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All";

export function Skills() {
  const [active, setActive] = useState<string>(ALL);
  const categories = [ALL, ...skillCategories.map((c) => c.title)];

  const flatSkills = useMemo(
    () =>
      skillCategories.flatMap((cat) =>
        cat.skills.map((skill) => ({ skill, category: cat.title }))
      ),
    []
  );

  const visible = flatSkills.filter((s) => active === ALL || s.category === active);

  return (
    <section id="skills" className="hairline-t py-24 md:py-32">
      <div className="container-page">
        <SplitText as="h2" text="Skills & tools" className="mb-10 text-4xl font-semibold md:text-6xl" />

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-hairline text-muted-foreground hover:border-hairline-strong"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map(({ skill }) => (
              <motion.span
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={springs.snappy}
                className="rounded-full border border-hairline bg-surface px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
