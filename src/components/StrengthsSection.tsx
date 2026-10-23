import { strengths } from "@/data/portfolio";

const StrengthsSection = () => {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <p className="mono rv">01 / About</p>
        <h2 className="h2 disp rv">Three things I'm trusted with.</h2>
        <div className="str-grid">
          {strengths.map((s) => (
            <article className="str rv" key={s.n}>
              <span className="mono str-n">{s.n}</span>
              <h3 className="disp">{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
