import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: keyof typeof motion;
  variants?: Variants;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as = "div", variants = fadeUp, delay = 0, className }: RevealProps) {
  const Component = motion[as] as typeof motion.div;

  const show = variants.show;
  const delayedVariants: Variants =
    delay && typeof show === "object"
      ? {
          ...variants,
          show: {
            ...show,
            transition: { ...(show as Record<string, unknown>).transition, delay },
          },
        }
      : variants;

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={delayedVariants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
