import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Magnetic } from "@/components/motion/Magnetic";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-hairline bg-background/80 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <a href="#home" className="font-display text-base font-semibold tracking-tight">
            {site.name}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-mono-label !text-foreground/70 hover:!text-foreground"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Magnetic>
              <a
                href={site.resumeUrl}
                download={site.resumeFileName}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-hairline px-4 text-mono-label !text-foreground transition-colors hover:border-hairline-strong"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </Magnetic>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: easeOut }}
                  className="font-display text-4xl font-medium"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <a
              href={site.resumeUrl}
              download={site.resumeFileName}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-mono-label !text-foreground"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
