import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const nameWords = site.name.toUpperCase().split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-28 md:pb-24"
    >
      <motion.div style={{ scale, opacity, y }} className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 md:mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-mono-label">{site.availability}</span>
        </motion.div>

        <h1 className="select-none font-display font-semibold leading-[0.92] tracking-tight">
          {nameWords.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.15 + i * 0.1 }}
                className="block text-[15vw] leading-[0.92] md:text-[9vw] lg:text-[7.5vw]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.55 }}
          className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-lg text-muted-foreground md:text-xl">{site.summary}</p>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              View work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-hairline px-6 text-sm font-medium transition-colors hover:border-hairline-strong"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
