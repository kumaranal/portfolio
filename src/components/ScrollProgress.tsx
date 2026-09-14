import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const lastP = useRef(-1);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const doc = document.documentElement;
      const span = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / span));
      if (p !== lastP.current && barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
        lastP.current = p;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-primary"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ScrollProgress;
