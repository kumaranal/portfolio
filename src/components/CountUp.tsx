import { useEffect, useRef, useState } from "react";

const CountUp = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const match = value.match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, numStr, post] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (!isFinite(target)) return;
    const decimals = (numStr.split(".")[1] || "").length;
    const grouped = numStr.includes(",");
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          io.disconnect();
          const t0 = performance.now();
          const dur = 950;
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            if (k < 1) {
              const v = (target * eased).toFixed(decimals);
              setDisplay(
                pre +
                  (grouped
                    ? Number(v).toLocaleString("en-US", {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                      })
                    : v) +
                  post,
              );
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <div ref={ref}>{display}</div>;
};

export default CountUp;
