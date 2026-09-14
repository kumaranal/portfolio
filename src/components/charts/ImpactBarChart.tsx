import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { impactMetrics } from "@/data/portfolio";
import { ChartTooltip } from "@/components/charts/ChartTooltip";

const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const ImpactBarChart = () => {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const data = impactMetrics.map((m) => ({ ...m, name: m.label }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }} barCategoryGap={18}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 80]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={150}
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltip />} />
          <Bar dataKey="value" name="Improvement" radius={0} isAnimationActive={!reduced} animationDuration={750}>
            {data.map((entry, i) => (
              <Cell key={entry.label} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpactBarChart;
