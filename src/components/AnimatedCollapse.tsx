import { ReactNode, useEffect, useRef, useState } from "react";

const AnimatedCollapse = ({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (open) {
      const h = el.scrollHeight;
      setHeight(h);
      const t = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(t);
    }
    setHeight(el.scrollHeight);
    requestAnimationFrame(() => setHeight(0));
  }, [open]);

  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={className}
      style={{
        height: reduced ? undefined : height,
        overflow: "hidden",
        transition: reduced ? undefined : "height 300ms cubic-bezier(0.4,0,0.2,1)",
        display: reduced && !open ? "none" : undefined,
      }}
      aria-hidden={!open}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

export default AnimatedCollapse;
