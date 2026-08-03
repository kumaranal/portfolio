import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToTarget(target: string | HTMLElement, offset = -20) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
