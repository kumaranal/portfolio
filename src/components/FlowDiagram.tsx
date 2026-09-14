import { Fragment } from "react";

type FlowStep = { label: string; caption: string };

const FlowDiagram = ({
  steps,
  caption,
  className = "",
}: {
  steps: FlowStep[];
  caption?: string;
  className?: string;
}) => {
  return (
    <figure className={className}>
      <div className="flex flex-wrap items-center gap-2.5 border-2 border-border bg-background p-3 sm:p-4">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <div
              className={`min-w-0 flex-[1_1_128px] border-2 px-3 py-2 ${
                i === steps.length - 2 ? "border-primary" : "border-border"
              }`}
            >
              <div className="font-heading text-[13px] font-extrabold leading-tight">{step.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{step.caption}</div>
            </div>
            {i < steps.length - 1 && (
              <div aria-hidden="true" className="flex-none self-center font-heading text-base font-extrabold text-primary">
                →
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {caption && <figcaption className="mt-2 text-xs leading-snug text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
};

export default FlowDiagram;
