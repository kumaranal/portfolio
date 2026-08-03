import { motion, type Variants } from "framer-motion";
import { easeOut, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: easeOut } },
};

export function SplitText({ text, className, delay = 0, stagger = 0.05, as = "h2" }: SplitTextProps) {
  const words = text.split(" ");
  const Wrapper = as;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <Wrapper className={cn("overflow-hidden", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={container}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={cn(
              "inline-block overflow-hidden pb-1 align-top",
              i < words.length - 1 && "mr-[0.25em]"
            )}
          >
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
