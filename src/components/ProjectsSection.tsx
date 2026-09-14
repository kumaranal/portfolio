import { useState } from "react";
import { companies, deepDives, WorkItem } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import AnimatedCollapse from "@/components/AnimatedCollapse";
import FlowDiagram from "@/components/FlowDiagram";
import CaseStudyDialog from "@/components/CaseStudyDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FlatItem = WorkItem & { company: string };

const flatProjects: FlatItem[] = companies.flatMap((c) =>
  c.items.map((item) => ({ ...item, company: c.name })),
);
const starProjects = flatProjects.filter((p) => p.tier === "star");
const showcaseProjects = flatProjects.filter((p) => p.tier === "showcase");

const StarCard = ({ item, delay }: { item: FlatItem; delay: number }) => {
  const deepDive = deepDives.find((d) => d.id === item.deepDiveId);

  return (
    <Reveal delay={delay}>
      <Card className="flex h-full flex-col gap-4 bg-background p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">★ Star project</Badge>
          <Badge>{item.domain}</Badge>
          <span className="ml-auto text-[12.5px] text-muted-foreground">
            {item.company}
          </span>
        </div>
        <h3 className="font-heading text-xl font-extrabold leading-snug tracking-tight md:text-2xl">
          {item.title}
        </h3>
        <p className="text-[13px] text-muted-foreground">{item.meta}</p>
        <p className="font-heading text-[15px] font-extrabold leading-snug text-primary">
          {item.result}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.problem}
        </p>
        {item.diagram && (
          <FlowDiagram steps={item.diagram} caption={item.diagramCaption} />
        )}
        {deepDive && (
          <CaseStudyDialog
            deepDive={deepDive}
            diagram={item.diagram}
            diagramCaption={item.diagramCaption}
            trigger={
              <Button
                type="button"
                className="mt-auto w-fit rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Read full case study
              </Button>
            }
          />
        )}
      </Card>
    </Reveal>
  );
};

const ShowcaseCard = ({ item, delay }: { item: FlatItem; delay: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <Card className="flex h-full flex-col gap-3 bg-background p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{item.domain}</Badge>
          <span className="ml-auto text-[12px] text-muted-foreground">
            {item.company}
          </span>
        </div>
        <h3 className="font-heading text-base font-extrabold leading-snug md:text-lg">
          {item.title}
        </h3>
        <p className="text-[12.5px] text-muted-foreground">{item.meta}</p>
        <p className="font-heading text-[13.5px] font-extrabold leading-snug text-primary">
          {item.result}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-1 flex w-fit items-center gap-1.5 font-heading text-[12.5px] font-extrabold text-foreground transition-colors duration-150 hover:text-primary"
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 200ms",
            }}
          >
            +
          </span>
          {open ? "Hide details" : "Problem & approach"}
        </button>
        <AnimatedCollapse open={open}>
          <div className="grid gap-3 pb-1 pt-1">
            <div>
              <div className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Problem
              </div>
              <p className="text-sm leading-relaxed">{item.problem}</p>
            </div>
            <div>
              <div className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Approach
              </div>
              <p className="text-sm leading-relaxed">{item.approach}</p>
            </div>
          </div>
        </AnimatedCollapse>
      </Card>
    </Reveal>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            {/* <span className="font-heading text-[13px] font-extrabold text-primary">04</span> */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              Projects
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            Eight platforms across three companies. Three star projects get the
            full architecture write-up; the rest are one card away.
          </p>
        </Reveal>

        <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-[0.1em] text-muted-foreground">
          Star projects
        </h3>
        <div className="mb-10 grid gap-4 lg:grid-cols-3 lg:gap-5 md:mb-14">
          {starProjects.map((item, i) => (
            <StarCard key={item.id} item={item} delay={i * 70} />
          ))}
        </div>

        <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-[0.1em] text-muted-foreground">
          More projects
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {showcaseProjects.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
