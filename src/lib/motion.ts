import type { Transition, Variants } from "framer-motion";

export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 32, mass: 0.8 } satisfies Transition,
  soft: { type: "spring", stiffness: 180, damping: 24, mass: 1 } satisfies Transition,
  bouncy: { type: "spring", stiffness: 300, damping: 16, mass: 0.9 } satisfies Transition,
};

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: springs.soft },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;
