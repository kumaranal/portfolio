export interface ExperienceProject {
  name: string;
  description: string;
  tech: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyShort: string;
  url: string;
  role: string;
  start: string;
  end: string;
  current?: boolean;
  projects: ExperienceProject[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "gnapi",
    company: "Gnapi Technologies Pvt. Ltd.",
    companyShort: "Gnapi",
    url: "https://gnapitechnologies.com/",
    role: "Senior Software Engineer",
    start: "Jul 2025",
    end: "Present",
    current: true,
    projects: [
      {
        name: "QA Automation Framework",
        description:
          "Architected a centralized QA automation platform with automated bug tracking and Jira ticketing workflows. Integrated Kafka and Redis for high-throughput event processing, with system observability via OpenTelemetry and OpenSearchDB.",
        tech: ["Nest.js", "React", "Kafka", "Redis", "OpenTelemetry", "OpenSearchDB"],
      },
      {
        name: "Electrical Instrumentation System (IQGeo)",
        description:
          "Designed and deployed an asset management system for electrical infrastructure, using Geo-Server for complex spatial data mapping and MongoDB for flexible data storage.",
        tech: ["FastAPI", "React", "Geo-Server", "MongoDB", "AWS", "Jenkins"],
      },
    ],
  },
  {
    id: "xotiv",
    company: "Xotiv Technologies Pvt. Ltd.",
    companyShort: "Xotiv",
    url: "https://xotiv.com/",
    role: "Full Stack Developer",
    start: "Dec 2023",
    end: "Jun 2025",
    projects: [
      {
        name: "AI Sports Edu-Tech App — DEVEBOL",
        description:
          "Engineered a sports club management platform with AI capabilities via LangChain and Redis, and real-time communications through Firebase push, Twilio, and SendGrid.",
        tech: ["Next.js", "Prisma", "Supabase", "LangChain", "Redis"],
      },
      {
        name: "Healthcare App — ReadMyRhythm",
        description:
          "Built a secure telemedicine application for institutional EKG reviews, with compliant data handling via Truevault and payment processing through Stripe.",
        tech: ["Next.js", "Supabase", "Truevault", "Stripe"],
      },
      {
        name: "PropTech SaaS — AFFCO",
        description:
          "Built a property and tenant management system for a real estate agency with automated rent processing via Stripe and notifications via SendGrid/Twilio.",
        tech: ["Next.js", "Prisma", "Stripe", "SendGrid", "Twilio"],
      },
      {
        name: "Golf Course Management System",
        description:
          "Delivered an in-house enterprise product for golf organizations with scalable data models and efficient data fetching via GraphQL.",
        tech: ["Angular", "Node.js", "Express.js", "Sequelize", "GraphQL"],
      },
    ],
  },
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    companyShort: "TCS",
    url: "https://www.tcs.com/",
    role: "Software Analyst",
    start: "Nov 2020",
    end: "Nov 2023",
    projects: [
      {
        name: "Incentive Management System — FIAT Automobile",
        description:
          "Developed an enterprise sales management platform enabling dynamic configuration of sales strategies and incentives, with deployment pipelines on Git, Jenkins, and AWS.",
        tech: ["Java", "Spring Boot", "Angular", "AWS", "Jenkins"],
      },
      {
        name: "Optical Fiber Management System — Comcast",
        description:
          "Built a network traffic and maintenance application for critical telecom infrastructure, ensuring high availability and reliable data querying.",
        tech: ["Angular", "Express.js", "Node.js", "MongoDB"],
      },
    ],
  },
];
