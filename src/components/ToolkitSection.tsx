import { Code2, Cloud, Database, Sparkles, LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const icons: Record<string, LucideIcon> = {
  a: Code2,
  b: Cloud,
  c: Database,
  d: Sparkles,
};

const ToolkitSection = () => {
  return (
    <section id="toolkit" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            {/* <span className="font-heading text-[13px] font-extrabold text-primary">05</span> */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              Toolkit
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            What actually ships the projects above — grouped by where it sits in
            the stack.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.id] ?? Code2;
            return (
              <Reveal key={group.id} delay={gi * 70}>
                <Card className="h-full bg-background p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading text-base font-extrabold tracking-tight md:text-lg">
                      {group.label}
                    </h3>
                  </div>
                  <div className="grid gap-3.5">
                    {group.rows.map((row) => (
                      <div key={row.label}>
                        <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          {row.label}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {row.value.split("·").map((skill) => (
                            <Badge key={skill.trim()}>{skill.trim()}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolkitSection;
