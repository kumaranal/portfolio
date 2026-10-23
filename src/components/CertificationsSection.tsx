import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/portfolio";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="sec">
      <div className="wrap">
        <p className="mono rv">06 / Certifications</p>
        <h2 className="h2 disp rv">Credentials kept current.</h2>
        <div className="str-grid">
          {certifications.map((cert) => (
            <article className="str rv" key={cert.title}>
              <Award className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
              <h3 className="disp" style={{ marginTop: 14 }}>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <p className="mono" style={{ marginTop: 10, textTransform: "none", letterSpacing: "normal" }}>
                Issued {cert.issued}
              </p>
              {cert.credentialId && (
                <p style={{ marginTop: 6, fontSize: 13, color: "var(--faint)", wordBreak: "break-all" }}>
                  Credential ID: {cert.credentialId}
                </p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ext"
                  style={{ marginTop: 14 }}
                >
                  Verify credential
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
