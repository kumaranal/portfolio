import { GraduationCap, MapPin } from "lucide-react";
import { about } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";

const EducationSection = () => {
  return (
    <section id="education" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            {/* <span className="font-heading text-[13px] font-extrabold text-primary">06</span> */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              Education
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            The academic foundation, and where I'm based.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          <Reveal delay={70}>
            <Card className="flex h-full flex-col gap-3 p-5 md:p-6">
              <GraduationCap
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <div className="font-heading text-lg font-extrabold leading-snug tracking-tight md:text-xl">
                {about.education.degree}
              </div>
              <div className="text-sm text-muted-foreground">
                {about.education.institution}
              </div>
              <div className="text-[13px] text-muted-foreground">
                {about.education.years}
              </div>
            </Card>
          </Reveal>
          {/* <Reveal delay={140}>
            <Card className="flex h-full flex-col gap-3 p-5 md:p-6">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <div className="font-heading text-lg font-extrabold leading-snug tracking-tight md:text-xl">
                {about.based.location}
              </div>
              <div className="text-sm text-muted-foreground">{about.based.note}</div>
            </Card>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
