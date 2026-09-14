import { companies } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseMonthYear = (s: string): number => {
  const trimmed = s.trim().toLowerCase();
  if (trimmed === "present") {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [month, year] = trimmed.split(" ");
  return parseInt(year, 10) * 12 + (MONTHS[month] ?? 0);
};

const timelineColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3"];

const CompaniesSection = () => {
  const spans = companies.map((c) => {
    const [startStr, endStr] = c.dates.split("—").map((s) => s.trim());
    return {
      name: c.name,
      start: parseMonthYear(startStr),
      end: parseMonthYear(endStr),
    };
  });
  const timelineStart = Math.min(...spans.map((s) => s.start));
  const timelineEnd = Math.max(...spans.map((s) => s.end));
  const totalMonths = Math.max(1, timelineEnd - timelineStart);

  return (
    <section id="companies" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            {/* <span className="font-heading text-[13px] font-extrabold text-primary">
              03
            </span> */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              Companies
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            Three companies, one continuous line — production engineering the
            entire way through.
          </p>

          <div
            aria-hidden="true"
            className="mb-10 hidden h-2 w-full overflow-hidden border-2 border-border sm:flex"
          >
            {[...spans].reverse().map((s, i) => (
              <div
                key={s.name}
                className={timelineColors[i % timelineColors.length]}
                style={{ width: `${((s.end - s.start) / totalMonths) * 100}%` }}
              />
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={i * 70}>
              <Card className="flex h-full flex-col gap-3 p-5 md:p-6">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-8 flex-none ${timelineColors[(companies.length - 1 - i) % timelineColors.length]}`}
                />
                <h3 className="font-heading text-lg font-extrabold leading-snug tracking-tight md:text-xl">
                  {company.name}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {company.role}
                </div>
                <div className="text-[13px] text-muted-foreground">
                  {company.dates}
                </div>
                <div className="mt-auto border-t-2 border-border pt-3 text-[13px] text-muted-foreground">
                  {company.items.length} platform
                  {company.items.length === 1 ? "" : "s"} shipped ·{" "}
                  {
                    Array.from(new Set(company.items.map((it) => it.domain)))
                      .length
                  }{" "}
                  domains
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
