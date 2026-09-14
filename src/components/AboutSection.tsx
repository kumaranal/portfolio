import PortfolioImage from "@/components/PortfolioImage";
import { about } from "@/data/portfolio";

const AboutSection = () => {
  return (
    <section id="about" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="flex flex-wrap items-start gap-8 md:gap-14">
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
              <span className="font-heading text-[13px] font-extrabold text-primary">06</span>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">About</h2>
            </div>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`max-w-[56ch] text-base leading-relaxed sm:text-lg ${
                  i === about.paragraphs.length - 1 ? "mb-6" : "mb-3.5"
                }`}
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-x-10 gap-y-3 border-t-2 border-border pt-4">
              <div>
                <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Education
                </div>
                <div className="font-heading text-base font-extrabold leading-snug">{about.education.degree}</div>
                <div className="text-sm">{about.education.institution}</div>
                <div className="text-[13px] text-muted-foreground">{about.education.years}</div>
              </div>
              <div>
                <div className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Based in
                </div>
                <div className="font-heading text-base font-extrabold leading-snug">{about.based.location}</div>
                <div className="text-sm">{about.based.note}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
