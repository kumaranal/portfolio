import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
              Certifications
            </h2>
          </div>
          <p className="mb-8 max-w-[58ch] text-sm text-muted-foreground md:mb-10">
            Credentials kept current alongside the day-to-day work.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 70}>
              <Card className="flex h-full flex-col gap-3 p-5 md:p-6">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-heading text-base font-extrabold leading-snug tracking-tight md:text-lg">
                  {cert.title}
                </h3>
                <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                <div className="text-[13px] text-muted-foreground">
                  Issued {cert.issued}
                </div>
                {cert.credentialId && (
                  <div className="break-all text-[12px] text-muted-foreground">
                    Credential ID: {cert.credentialId}
                  </div>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-auto flex w-fit items-center gap-1.5 font-heading text-[12.5px] font-extrabold text-foreground transition-colors duration-150 hover:text-primary"
                  >
                    Verify credential
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
