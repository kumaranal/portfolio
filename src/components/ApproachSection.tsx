import { useState } from "react";
import { Button } from "@/components/ui/button";
import PortfolioImage from "@/components/PortfolioImage";
import { approachTabs } from "@/data/portfolio";

const ApproachSection = () => {
  const [active, setActive] = useState(approachTabs[0].id);
  const current = approachTabs.find((t) => t.id === active)!;

  return (
    <section id="approach" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="mb-6 flex items-baseline gap-3.5 md:mb-8">
          <span className="font-heading text-[13px] font-extrabold text-primary">02</span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
            What working with me looks like
          </h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {approachTabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActive(tab.id)}
              className={`rounded-none border-2 justify-start ${
                active === tab.id ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : ""
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-start gap-8 md:gap-12">
          <div className="min-w-0 flex-[1.5_1_420px] min-h-[240px]">
            <h3 className="mb-3.5 font-heading text-xl font-extrabold tracking-tight md:text-[30px]">
              {current.heading}
            </h3>
            {current.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`max-w-[58ch] text-[15px] leading-relaxed md:text-base ${
                  i === current.paragraphs.length - 1 ? "mb-5" : "mb-3"
                }`}
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-1.5">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <figure className="m-0 min-w-0 flex-[1_1_300px]">
            <div className="overflow-hidden border-2 border-border">
              <PortfolioImage
                src="/presenting.jpg"
                alt="Anal Kumar Biswas presenting an architecture review to a team"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
            </div>
            <figcaption className="mt-2 text-xs leading-snug text-muted-foreground">
              Talking a team through a design and its trade-offs — the conversation that keeps an
              architecture and a roadmap moving together.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
