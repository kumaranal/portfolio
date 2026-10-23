import { about } from "@/data/portfolio";

const EducationSection = () => {
  return (
    <section id="education" className="sec">
      <div className="wrap edu rv">
        <div>
          <p className="mono">05 / Education</p>
        </div>
        <div>
          <h3 className="disp" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.15 }}>
            {about.education.degree}
          </h3>
          <p style={{ marginTop: 10, color: "var(--soft)" }}>{about.education.institution}</p>
          <p className="mono" style={{ marginTop: 10 }}>{about.education.years}</p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
