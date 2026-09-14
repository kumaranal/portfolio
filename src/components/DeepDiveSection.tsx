import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deepDive } from "@/data/portfolio";

const DeepDiveSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="deepdive" className="border-b-2 border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="mb-4 flex items-baseline gap-3.5">
          <span className="font-heading text-[13px] font-extrabold text-primary">04</span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
            A closer look at one system
          </h2>
        </div>
        <p className="mb-6 max-w-[52ch] text-base leading-relaxed md:text-[19px]">{deepDive.intro}</p>
        <Button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-none border-2 border-primary bg-primary justify-start text-primary-foreground hover:bg-primary/90"
        >
          {open ? "Hide the write-up" : "Read the write-up"}
        </Button>

        {open && (
          <div className="mt-8 flex flex-wrap gap-8 md:mt-11 md:gap-12">
            <div className="min-w-0 flex-[1.6_1_440px]">
              <div className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Context
              </div>
              <p className="mb-5 text-[15.5px] leading-relaxed">{deepDive.context}</p>

              <div className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Constraints
              </div>
              <p className="mb-5 text-[15.5px] leading-relaxed">{deepDive.constraints}</p>

              <div className="mb-3.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Decisions and trade-offs
              </div>
              {deepDive.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className={`border-t-2 border-border py-4 ${
                    i === deepDive.decisions.length - 1 ? "mb-5 border-b-2" : ""
                  }`}
                >
                  <h4 className="mb-1.5 font-heading text-[17px] font-extrabold">{d.title}</h4>
                  <p className="text-sm leading-relaxed">{d.body}</p>
                </div>
              ))}

              <div className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                What I would do differently
              </div>
              <p className="text-[15.5px] leading-relaxed">{deepDive.whatIWouldChange}</p>
            </div>

            <div className="min-w-0 flex-[1_1_300px]">
              <figure>
                <div className="grid gap-2.5 border-2 border-border bg-background p-4 sm:p-5">
                  <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Producers
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Runners", "Schedulers", "Webhooks"].map((s) => (
                      <div key={s} className="flex-[1_1_88px] border-2 border-border px-2.5 py-2 font-heading text-xs font-extrabold">
                        {s}
                      </div>
                    ))}
                  </div>
                  <div aria-hidden="true" className="text-center font-heading text-base font-extrabold text-primary">
                    ↓
                  </div>
                  <div className="border-2 border-primary px-3 py-2.5">
                    <div className="font-heading text-[13px] font-extrabold">Kafka — keyed topics</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      order per suite · retained log · replayable
                    </div>
                  </div>
                  <div aria-hidden="true" className="text-center font-heading text-base font-extrabold text-primary">
                    ↓
                  </div>
                  <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    15+ consumer groups
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Execution", "Telemetry", "Reporting", "Notify"].map((s) => (
                      <div key={s} className="flex-[1_1_88px] border-2 border-border px-2.5 py-2 font-heading text-xs font-extrabold">
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-stretch gap-2">
                    <div className="flex-[1_1_120px] border-2 border-border px-2.5 py-2">
                      <div className="font-heading text-xs font-extrabold">Retry w/ backoff</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">bounded attempts</div>
                    </div>
                    <div aria-hidden="true" className="flex-none self-center font-heading text-sm font-extrabold text-primary">
                      →
                    </div>
                    <div className="flex-[1_1_120px] border-2 border-dashed border-primary px-2.5 py-2">
                      <div className="font-heading text-xs font-extrabold">Dead-letter queue</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">inspect · fix · replay</div>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-border px-3 py-2">
                    <div className="font-heading text-xs font-extrabold">OpenTelemetry</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      trace context in the envelope — one run, one trace, every hop
                    </div>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  The platform as deployed on Kubernetes.
                </figcaption>
              </figure>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeepDiveSection;
