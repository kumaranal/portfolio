export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["Angular", "React", "Next.js", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Nest.js", "FastAPI", "Core Java", "Python"],
  },
  {
    title: "Databases & ORMs",
    skills: ["PostgreSQL", "MongoDB", "GraphQL", "Supabase", "Prisma", "Sequelize"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Vercel", "Firebase", "Coolify", "Docker", "Jenkins", "Git", "CI/CD"],
  },
  {
    title: "Architecture & Tools",
    skills: [
      "Kafka",
      "RabbitMQ",
      "Redis",
      "LangChain",
      "OpenTelemetry",
      "OpenSearchDB",
      "Geo-Server",
      "Stripe API",
      "SendGrid",
      "Twilio",
      "Swagger",
      "Jest",
    ],
  },
];
