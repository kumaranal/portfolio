import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { domainBreakdown } from "@/data/portfolio";
import { ChartTooltip } from "@/components/charts/ChartTooltip";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const DomainDonutChart = () => {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const data = domainBreakdown.map((d) => ({ name: d.domain, value: d.years }));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="h-[220px] w-full sm:w-[220px] sm:flex-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={90}
              paddingAngle={2}
              stroke="hsl(var(--background))"
              strokeWidth={2}
              isAnimationActive={!reduced}
              animationDuration={750}
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid min-w-0 flex-1 gap-2">
        {data.map((entry, i) => (
          <li key={entry.name} className="flex items-center gap-2.5 text-sm">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 flex-none"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="flex-1 text-foreground">{entry.name}</span>
            <span className="text-muted-foreground">{Math.round((entry.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainDonutChart;
