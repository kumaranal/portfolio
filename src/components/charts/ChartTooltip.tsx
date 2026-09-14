import type { TooltipProps } from "recharts";

export const ChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-border bg-card px-3 py-2 text-xs shadow-sm">
      {label && <div className="mb-0.5 font-heading font-extrabold text-foreground">{label}</div>}
      {payload.map((entry) => (
        <div key={entry.name} className="text-muted-foreground">
          {entry.name}: <span className="font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
