import { ReactNode } from "react";
import type { DeepDive } from "@/data/portfolio";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import FlowDiagram from "@/components/FlowDiagram";

const stages: { key: keyof DeepDive; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "constraints", label: "Constraints" },
  { key: "architecture", label: "Architecture" },
];

const laterStages: { key: keyof DeepDive; label: string }[] = [
  { key: "implementation", label: "Implementation" },
  { key: "failureModes", label: "Failure modes" },
  { key: "scale", label: "Scale" },
  { key: "result", label: "Result" },
];

const CaseStudyDialog = ({
  deepDive,
  diagram,
  diagramCaption,
  trigger,
}: {
  deepDive: DeepDive;
  diagram?: { label: string; caption: string }[];
  diagramCaption?: string;
  trigger: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            {deepDive.domain}
          </span>
          <DialogTitle>{deepDive.projectTitle}</DialogTitle>
          <DialogDescription>{deepDive.intro}</DialogDescription>
        </DialogHeader>

        {diagram && <FlowDiagram steps={diagram} caption={diagramCaption} />}

        <div className="grid gap-5">
          {stages.map((s) => (
            <div key={String(s.key)}>
              <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </div>
              <p className="text-[15px] leading-relaxed">{deepDive[s.key] as string}</p>
            </div>
          ))}

          <div>
            <div className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Trade-offs
            </div>
            <div className="grid gap-4">
              {deepDive.tradeoffs.map((t) => (
                <div key={t.title} className="border-t-2 border-border pt-3">
                  <h4 className="mb-1 font-heading text-base font-extrabold">{t.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </div>
          </div>

          {laterStages.map((s) => (
            <div key={String(s.key)}>
              <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </div>
              <p className="text-[15px] leading-relaxed">{deepDive[s.key] as string}</p>
            </div>
          ))}

          <div className="border-t-2 border-border pt-4">
            <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              What I would do differently
            </div>
            <p className="text-[15px] leading-relaxed">{deepDive.whatIWouldChange}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDialog;
