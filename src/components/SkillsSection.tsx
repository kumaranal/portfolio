import {
  Layers,
  Server,
  Cloud,
  Database,
  GitBranch,
  Code,
  Puzzle,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Technologies",
    icon: Layers,
    skills: ["Angular", "React", "Next.js", "HTML & CSS"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Backend Technologies",
    icon: Server,
    skills: ["Node.js", "Express.js", "Nest.js", "FastAPI", "Pyramid"],
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: ["AWS", "Vercel", "Coolify"],
    color: "from-orange-500 to-amber-400",
  },
  {
    title: "Database Technologies",
    icon: Database,
    skills: ["SQL/PostgreSQL", "NoSQL/MongoDB", "GraphQL"],
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "CI/CD Technologies",
    icon: GitBranch,
    skills: ["Git", "Jenkins", "Docker", "kubernetes"],
    color: "from-red-500 to-rose-400",
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["TypeScript/JavaScript", "Python", "C/C++", "Java"],
    color: "from-indigo-500 to-violet-400",
  },
  {
    title: "Other Technologies",
    icon: Puzzle,
    skills: [
      "Stripe",
      "LangChain",
      "LangGraph",
      "Redis",
      "RabbitMQ",
      "kafka",
      "OpenSearchDB",
      "OpenTelemetry",
      "Geo-Server",
    ],
    color: "from-teal-500 to-cyan-400",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies I have experience with
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-card p-6 rounded-2xl hover-glow transition-all duration-500 group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
