import { GraduationCap, Calendar, Award } from 'lucide-react';

const educationData = [
  {
    institution: 'ACADEMY OF TECHNOLOGY',
    board: 'West Bengal University of Technology',
    degree: 'Bachelor of Technology',
    score: 'Score: 8.1',
    year: '2020',
  },
  {
    institution: 'HOOGHLY COLLEGIATE SCHOOL',
    board: 'West Bengal Board of Higher Secondary Education',
    degree: '12th Board',
    score: 'Score: 80%',
    year: '2016',
  },
  {
    institution: 'HOOGHLY COLLEGIATE SCHOOL',
    board: 'West Bengal Board of Secondary Education',
    degree: '10th Board',
    score: 'Score: 88%',
    year: '2014',
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My academic journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20" />

            {educationData.map((edu, index) => (
              <div
                key={`${edu.institution}-${edu.degree}`}
                className={`relative flex items-center gap-8 mb-12 animate-fade-in-up opacity-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 z-10" />

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-6 rounded-2xl hover-glow transition-all duration-500 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {edu.board}
                        </p>

                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1.5 text-foreground">
                            <Award className="w-4 h-4 text-secondary" />
                            {edu.degree}
                          </span>
                          <span className="text-primary font-medium">
                            {edu.score}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-3 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>Completed: {edu.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
