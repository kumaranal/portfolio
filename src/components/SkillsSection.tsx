import { skillGroups, marquee } from "@/data/portfolio";

const SkillsSection = () => {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <p className="mono rv">04 / Skills</p>
        <h2 className="h2 disp rv">The toolbox, grouped by what it's for.</h2>
        <div className="sk-grid">
          {skillGroups.map((group) => (
            <article className="sk rv" key={group.title}>
              <h3 className="disp">{group.title}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="marq" aria-hidden="true">
        <div className="track">
          <div className="grp">
            {marquee.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="grp">
            {marquee.map((m) => (
              <span key={`${m}-dup`}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
