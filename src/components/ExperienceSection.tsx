import { companies } from "@/data/portfolio";

const CornerArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const ExperienceSection = () => {
  return (
    <section id="experience" className="sec">
      <div className="wrap">
        <p className="mono rv">02 / Experience</p>
        <h2 className="h2 disp rv">Six years, three companies, one thread: ownership.</h2>
        <div style={{ marginTop: 48 }}>
          {companies.map((company) => (
            <article className="role rv" key={company.name}>
              <div>
                <h3 className="role-co disp">
                  {company.href ? (
                    <a className="co" href={company.href} target="_blank" rel="noopener noreferrer">
                      {company.name} <CornerArrow />
                    </a>
                  ) : (
                    company.name
                  )}
                </h3>
                <p className="role-t">{company.role}</p>
                <p className="mono" style={{ marginTop: 10 }}>{company.dates}</p>
              </div>
              <div>
                {company.items.map((item) => (
                  <div className="proj" key={item.id}>
                    <h4 className="proj-t" style={{ margin: 0 }}>{item.title}</h4>
                    <p className="proj-d">{item.blurb}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
