import type { CSSProperties } from "react";
import { companies, WorkItem } from "@/data/portfolio";

const featuredIds = ["p1", "p6", "p9"];

const allItems: WorkItem[] = companies.flatMap((c) => c.items);
const featured = featuredIds
  .map((id) => allItems.find((item) => item.id === id))
  .filter((item): item is WorkItem => Boolean(item));

const ExtLink = ({ label, href }: { label: string; href: string }) => (
  <a className="ext" href={href} target="_blank" rel="noopener noreferrer">
    {label}
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  </a>
);

const ProjectVisual = ({ item }: { item: WorkItem }) => {
  const visual = item.visual;
  if (!visual) return null;

  if (visual.kind === "flow") {
    return (
      <div className="fh">
        <div>
          <div className="ecg-n disp">{visual.big}</div>
          <div className="fh-t">{visual.caption}</div>
        </div>
        <div className="fh-flow" role="img" aria-label={`${visual.from} replaced by ${visual.to}`}>
          <span className="fh-old">{visual.from}</span>
          <span className="fh-line" aria-hidden="true" />
          <span className="fh-new">{visual.to}</span>
        </div>
      </div>
    );
  }

  if (visual.kind === "ecg") {
    return (
      <div className="ecg-hero">
        <svg className="ecg" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
          <path
            pathLength={400}
            d="M0 40 H60 L72 40 L80 10 L90 70 L100 28 L108 40 H170 L182 40 L190 14 L200 66 L210 30 L218 40 H280 L292 40 L300 12 L310 68 L320 28 L328 40 H400"
          />
        </svg>
        <div className="ecg-n disp">{visual.big}</div>
        <div className="ecg-l">{visual.caption}</div>
      </div>
    );
  }

  return (
    <div className="fh">
      <div>
        <div className="ecg-n disp">
          {visual.big}
          {visual.bigUnit && <span style={{ fontSize: "0.4em" }}> {visual.bigUnit}</span>}
        </div>
        <div className="fh-t">{visual.caption}</div>
      </div>
      <div className="fh-flow" aria-label="Event workflows the platform handles">
        {visual.steps.map((step, i) => (
          <span className="fh-step" key={step} style={{ "--k": i * 0.5 } as CSSProperties}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="sec">
      <div className="wrap">
        <p className="mono rv">03 / Highlighted projects &amp; achievements</p>
        <h2 className="h2 disp rv">What I built, and what it changed.</h2>

        <div className="feat">
          {featured.map((item) => (
            <article className="card rv" key={item.id}>
              <div className="card-top">
                <span className="mono">{item.cardMeta}</span>
                <span className="badge">{item.cardBadge}</span>
              </div>
              <ProjectVisual item={item} />
              <h3 className="disp">{item.cardTitle ?? item.title}</h3>
              {item.externalLink && <ExtLink label={item.externalLink.label} href={item.externalLink.href} />}
              {item.achievement && (
                <p className="ach">
                  <b>Achievement</b>
                  {item.achievement}
                </p>
              )}
              {item.lead && <p className="lead">{item.lead}</p>}
              {item.points && (
                <ul className="pts">
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
              {item.tradeoff && (
                <p className="trade">
                  <b>Trade-off.</b> {item.tradeoff}
                </p>
              )}
              {item.chips && (
                <div className="chips">
                  {item.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
