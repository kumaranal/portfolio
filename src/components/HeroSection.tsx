import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import PortfolioImage from "@/components/PortfolioImage";
import { profile } from "@/data/portfolio";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const HeroSection = () => {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [eyebrowRef.current, headingRef.current, paraRef.current, ctaRef.current, portraitRef.current];
    if (reducedMotion || targets.some((t) => !t)) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 22 });
      gsap.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.05 });
      gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.15 });
      gsap.to(paraRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay: 0.4 });
      gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.55 });
      gsap.to(portraitRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header id="top" className="relative overflow-hidden border-b-2 border-border">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-0 pt-10 sm:px-8 sm:pt-16 md:pt-20">
        <div className="flex flex-wrap items-end gap-8 md:gap-12">
          <div className="min-w-0 flex-[2_1_460px] pb-8 md:pb-14">
            <div
              ref={eyebrowRef}
              className="mb-6 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:mb-8"
            >
              Senior Software Engineer
            </div>
            <h1
              ref={headingRef}
              className="mb-5 max-w-[18ch] font-heading text-[38px] font-extrabold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-[86px]"
            >
              I build distributed systems that hold up under real traffic.
            </h1>
            <p
              ref={paraRef}
              className="mb-7 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              I'm Anal Biswas — a senior software engineer with six years building cloud platforms
              for live broadcast, healthcare, finance and telecom. I care about the systems that
              have to be right the first time: available under real load, accurate under retries,
              and easy to reason about when something goes wrong.
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <a href={profile.resumeFile} download>
                <Button className="rounded-none border-2 border-primary bg-primary px-5 text-primary-foreground hover:bg-primary/90">
                  Download resume
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="rounded-none border-2 px-5">
                  Start a conversation
                </Button>
              </a>
            </div>
          </div>
          <div ref={portraitRef} className="min-w-0 flex-[1_1_280px] max-w-[420px] pb-8 md:pb-14">
            <div className="overflow-hidden border-2 border-border bg-background/70 backdrop-blur-[2px]">
              <PortfolioImage
                src="/portrait.jpg"
                alt="Portrait of Anal Kumar Biswas"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: "50% 18%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
