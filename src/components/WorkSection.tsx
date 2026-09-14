import { Fragment, useState } from "react";
import { companies, WorkItem } from "@/data/portfolio";

const WorkDiagram = ({ item }: { item: WorkItem }) => {
  if (!item.diagram) return null;
  return (
    <figure className="mt-1">
      <div className="flex flex-wrap items-center gap-2.5 border-2 border-border bg-card p-3 sm:p-4">
        {item.diagram.map((step, i) => (
          <Fragment key={step.label}>
            <div
              className={`min-w-0 flex-[1_1_128px] border-2 bg-background px-3 py-2 ${
                i === item.diagram!.length - 2 ? "border-primary" : "border-border"
              }`}
            >
              <div className="font-heading text-[13px] font-extrabold leading-tight">{step.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{step.caption}</div>
            </div>
            {i < item.diagram!.length - 1 && (
              <div aria-hidden="true" className="flex-none self-center font-heading text-base font-extrabold text-primary">
                →
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {item.diagramCaption && (
        <figcaption className="mt-2 text-xs leading-snug text-muted-foreground">{item.diagramCaption}</figcaption>
      )}
    </figure>
  );
};

const WorkSection = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="work" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="mb-4 flex items-baseline gap-3.5">
          <span className="font-heading text-[13px] font-extrabold text-primary">03</span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
            Where the experience comes from
          </h2>
        </div>
        <p className="mb-8 max-w-[56ch] text-sm text-muted-foreground md:mb-10">
          Eight platforms, three companies, six years. Open any one to see the problem, the
          approach and the outcome.
        </p>

        {companies.map((company) => (
          <div key={company.name}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t-2 border-border pt-4">
              <h3 className="font-heading text-lg font-extrabold tracking-tight md:text-[23px]">
                {company.name}
              </h3>
              <span className="text-sm">{company.role}</span>
              <span className="ml-auto text-[13px] text-muted-foreground">{company.dates}</span>
            </div>

            {company.items.map((item) => {
              const isOpen = open === item.id;
              return (
                <div key={item.id} className="border-t-2 border-border last:border-b-2">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-1.5 py-4 text-left transition-colors hover:text-primary"
                  >
                    <span aria-hidden="true" className="flex-none font-heading text-[15px] font-extrabold text-primary">
                      {isOpen ? "−" : "+"}
                    </span>
                    <span className="flex-[1_1_260px] font-heading text-base font-extrabold leading-snug md:text-lg">
                      {item.title}
                    </span>
                    <span className="text-[13px] text-muted-foreground">{item.meta}</span>
                  </button>
                  {isOpen && (
                    <div className="grid max-w-[78ch] gap-4 pb-6 pl-0 md:pl-8">
                      <div>
                        <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Problem
                        </div>
                        <p className="text-[15.5px] leading-relaxed">{item.problem}</p>
                      </div>
                      <div>
                        <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Approach
                        </div>
                        <p className="text-[15.5px] leading-relaxed">{item.approach}</p>
                      </div>
                      <div>
                        <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Result
                        </div>
                        <p className="text-[15.5px] leading-relaxed">{item.result}</p>
                      </div>
                      <WorkDiagram item={item} />
                      {item.deepDiveLink && (
                        <a
                          href="#deepdive"
                          className="w-fit font-heading text-[13px] font-extrabold text-primary hover:underline"
                        >
                          Read the full design write-up ↓
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
