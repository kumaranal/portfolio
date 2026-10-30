import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Scroll to a section id through Lenis (matches the sticky-nav offset); falls back to native scrolling. */
export const scrollToSection = (id: string) => {
  const target = id === "top" ? document.documentElement : document.getElementById(id);
  if (!target) return;
  if (instance) {
    if (id === "top") instance.scrollTo(0);
    else instance.scrollTo(target, { offset: -72 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/** Smooth, inertial scrolling site-wide. No-ops under prefers-reduced-motion. */
export const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });

    instance = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);
};
