import PortfolioImage from "@/components/PortfolioImage";
import { about } from "@/data/portfolio";
import Reveal from "@/components/Reveal";

const AboutSection = () => {
  return (
    <section id="about" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal className="flex flex-wrap items-start gap-8 md:gap-14">
          <div className="min-w-0 flex-[1_1_280px] max-w-[360px]">
            <div className="overflow-hidden border-2 border-border">
              <PortfolioImage
                src="/desk.jpg"
                alt="Anal Kumar Biswas working"
                className="aspect-square w-full object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
            </div>
          </div>
          <div className="min-w-0 flex-[1.6_1_420px]">
            <div className="mb-5 flex items-baseline gap-3.5 md:mb-6">
              {/* <span className="font-heading text-[13px] font-extrabold text-primary">07</span> */}
              <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">About</h2>
            </div>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`max-w-[56ch] text-base leading-relaxed sm:text-lg ${
                  i === about.paragraphs.length - 1 ? "" : "mb-3.5"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
