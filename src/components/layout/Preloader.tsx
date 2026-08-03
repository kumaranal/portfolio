import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const SESSION_KEY = "akb_preloaded";

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown || prefersReducedMotion) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1000;

    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 150);
      }
    }
    raf = requestAnimationFrame(tick);

    sessionStorage.setItem(SESSION_KEY, "1");
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!exiting) return;
    const timeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 700);
    return () => clearTimeout(timeout);
  }, [exiting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: exiting ? "-100%" : 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="fixed inset-0 z-[100] flex items-center justify-between bg-background px-6 pb-8 md:px-10"
        >
          <span className="text-mono-label">Anal Kumar Biswas</span>
          <span className="font-display text-2xl tabular-nums">{count}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
