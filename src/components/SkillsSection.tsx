import { useState } from "react";
import { Button } from "@/components/ui/button";
import { skillGroups } from "@/data/portfolio";

const SkillsSection = () => {
  const [active, setActive] = useState(skillGroups[0].id);
  const current = skillGroups.find((g) => g.id === active)!;

  return (
    <section id="skills" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="mb-6 flex items-baseline gap-3.5 md:mb-8">
          <span className="font-heading text-[13px] font-extrabold text-primary">05</span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">The toolkit</h2>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {skillGroups.map((group) => (
            <Button
              key={group.id}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActive(group.id)}
              className={`rounded-none border-2 justify-start ${
                active === group.id ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : ""
              }`}
            >
              {group.label}
            </Button>
          ))}
        </div>
        <div className="min-h-[200px]">
          <table className="w-full border-collapse text-left">
            <tbody>
              {current.rows.map((row) => (
                <tr key={row.label} className="border-t-2 border-border last:border-b-2">
                  <td className="w-[34%] py-3 pr-4 align-top font-semibold">{row.label}</td>
                  <td className="py-3 align-top text-sm text-muted-foreground sm:text-base">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
