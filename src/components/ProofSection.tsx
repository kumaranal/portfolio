import { useState } from "react";
import { promises } from "@/data/portfolio";

const ProofSection = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="proof" className="border-b-2 border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8 md:py-16 lg:py-[88px]">
        <div className="mb-4 flex items-baseline gap-3.5">
          <span className="font-heading text-[13px] font-extrabold text-primary">01</span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl">
            Three promises, and the proof behind them
          </h2>
        </div>
        <p className="mb-8 max-w-[56ch] text-sm text-muted-foreground md:mb-10">
          Anyone can promise reliability. Here is what mine is built on — every number below comes
          from a production system.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => {
            const isOpen = open === p.id;
            return (
              <div key={p.id} className="flex flex-col border-2 border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="block w-full border-b-2 border-border p-5 text-left transition-colors hover:bg-muted md:p-6"
                >
                  <div className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {p.title}
                  </div>
                  <div className="mb-3.5 font-heading text-2xl font-extrabold tracking-tight md:text-[28px]">
                    {p.heading}
                  </div>
                  <div className="flex items-center gap-2 font-heading text-[13px] font-extrabold text-primary">
                    <span>{isOpen ? "−" : "+"}</span>
                    <span>See the proof</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="grid gap-2.5 bg-background p-5 md:p-6">
                    {p.proof.map((line) => (
                      <div key={line} className="flex gap-2.5 text-sm leading-relaxed">
                        <span aria-hidden="true" className="font-bold text-primary">
                          —
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
