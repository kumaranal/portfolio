import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
}

export function Marquee({ children, className, durationSeconds = 28, reverse = false }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-10 pr-10 [animation-play-state:running] group-hover:[animation-play-state:paused]"
          style={{
            animation: `marquee ${durationSeconds}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
