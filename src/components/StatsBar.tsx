import CountUp from "@/components/CountUp";
import { heroStats } from "@/data/portfolio";

const StatsBar = () => {
  return (
    <section aria-label="Record at a glance" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-border py-7 px-4 md:py-8 ${i === 0 ? "pl-0" : ""} ${
                i === heroStats.length - 1 ? "pr-0" : ""
              } ${i % 2 === 0 ? "border-r-2" : "border-r-0"} ${
                i !== heroStats.length - 1 ? "sm:border-r-2" : "sm:border-r-0"
              }`}
            >
              <div className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-2 text-[12.5px] leading-snug text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
