import { Button } from "@/components/ui/button";
import PortfolioImage from "@/components/PortfolioImage";
import { profile } from "@/data/portfolio";

const HeroSection = () => {
  return (
    <header id="top" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 pb-0 pt-10 sm:px-8 sm:pt-16 md:pt-20">
        <div className="flex flex-wrap items-end gap-8 md:gap-12">
          <div className="min-w-0 flex-[2_1_460px] pb-8 md:pb-14">
            <div className="mb-6 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:mb-8">
              Senior Software Engineer
            </div>
            <h1 className="mb-5 max-w-[18ch] font-heading text-[38px] font-extrabold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-[86px]">
              Software your business can rely on.
            </h1>
            <p className="mb-7 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              I'm Anal Biswas — a senior software engineer who has spent six years building cloud
              platforms for live broadcast, healthcare, finance and telecom. My work is quiet by
              design: systems that stay available, data you can trust, and teams that ship with
              confidence.
            </p>
            <div className="flex flex-wrap gap-3">
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
          <div className="min-w-0 flex-[1_1_280px] max-w-[420px] pb-8 md:pb-14">
            <div className="overflow-hidden border-2 border-border">
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
