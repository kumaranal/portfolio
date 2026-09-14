import { heroStats } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ImpactBarChart from "@/components/charts/ImpactBarChart";
import DomainDonutChart from "@/components/charts/DomainDonutChart";

const MetricsSection = () => {
  return (
    <section id="metrics" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            {/* <span className="font-heading text-[13px] font-extrabold text-primary">02</span> */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              The record, in numbers
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            Six years, eight platforms, three companies — the same numbers a
            technical review would check first.
          </p>
        </Reveal>

        <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-4 md:gap-4">
          {heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <Card className="h-full bg-background p-4 md:p-5">
                <div className="font-heading text-2xl font-extrabold tracking-tight md:text-[32px]">
                  <CountUp value={stat.value} />
                </div>
                <div className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Reveal delay={80}>
            <Card className="h-full bg-background p-5 md:p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Measured improvement, by system</CardTitle>
                <CardDescription>
                  Where a rebuild or migration produced a measured before/after.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ImpactBarChart />
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={140}>
            <Card className="h-full bg-background p-5 md:p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Where the experience comes from</CardTitle>
                <CardDescription>
                  Time spent by domain, across three companies.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DomainDonutChart />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
