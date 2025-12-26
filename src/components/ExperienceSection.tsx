import { Building2, ExternalLink } from 'lucide-react';

const companies = [
  {
    name: 'TATA CONSULTANCY SERVICES',
    url: 'https://www.tcs.com/',
    logo: 'TCS',
  },
  {
    name: 'XOTIV TECHNOLOGIES PVT. LTD.',
    url: 'https://xotiv.com/',
    logo: 'XOTIV',
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Companies I have been a part of
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {companies.map((company, index) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-8 rounded-2xl hover-glow transition-all duration-500 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
                      {company.logo}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {company.name}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
