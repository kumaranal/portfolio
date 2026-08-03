export interface Project {
  id: string;
  index: string;
  title: string;
  client: string;
  period: string;
  description: string;
  tech: string[];
  url?: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "qa-automation",
    index: "01",
    title: "QA Automation Framework",
    client: "Gnapi Technologies",
    period: "2025 — Present",
    description:
      "Centralized QA automation platform with automated bug tracking, Jira ticketing workflows, and Kafka/Redis-backed event processing, plus full-stack observability via OpenTelemetry.",
    tech: ["Nest.js", "React", "Kafka", "Redis", "OpenTelemetry"],
    category: "Internal Platform",
  },
  {
    id: "iqgeo",
    index: "02",
    title: "Electrical Instrumentation System",
    client: "IQGeo",
    period: "2025 — Present",
    description:
      "Asset management system for electrical infrastructure with complex spatial data mapping and geo-server driven visualization.",
    tech: ["FastAPI", "React", "Geo-Server", "MongoDB", "AWS"],
    category: "Asset Management",
  },
  {
    id: "devebol",
    index: "03",
    title: "AI Sports Edu-Tech Platform",
    client: "DEVEBOL",
    period: "2023 — 2025",
    description:
      "Sports club management platform with AI-assisted coaching workflows via LangChain, real-time push notifications, and automated communications.",
    tech: ["Next.js", "Prisma", "Supabase", "LangChain"],
    url: "https://elevatedev.vercel.app/",
    category: "EdTech",
  },
  {
    id: "readmyrhythm",
    index: "04",
    title: "Healthcare EKG Review App",
    client: "ReadMyRhythm",
    period: "2023 — 2025",
    description:
      "Secure telemedicine application for institutional EKG reviews with compliant data handling and integrated payment processing.",
    tech: ["Next.js", "Supabase", "Truevault", "Stripe"],
    url: "https://readmyrhythm.com/",
    category: "Healthcare",
  },
  {
    id: "affco",
    index: "05",
    title: "PropTech Rent Management SaaS",
    client: "AFFCO",
    period: "2023 — 2025",
    description:
      "Property and tenant management system with automated rent processing and multi-channel tenant notifications.",
    tech: ["Next.js", "Prisma", "Stripe", "Twilio"],
    url: "https://affco-dev.vercel.app/",
    category: "Real Estate",
  },
  {
    id: "golf",
    index: "06",
    title: "Golf Course Management System",
    client: "Xotiv Technologies",
    period: "2023 — 2025",
    description:
      "In-house enterprise product for golf organizations to manage course assets, with scalable data models and GraphQL data fetching.",
    tech: ["Angular", "Node.js", "Sequelize", "GraphQL"],
    url: "https://turfassistant.com/",
    category: "Enterprise",
  },
  {
    id: "fiat",
    index: "07",
    title: "Incentive Management System",
    client: "FIAT Automobile",
    period: "2020 — 2023",
    description:
      "Enterprise sales management platform enabling dynamic configuration of sales strategies and dealer incentives at scale.",
    tech: ["Java", "Spring Boot", "Angular", "AWS"],
    category: "Enterprise",
  },
  {
    id: "comcast",
    index: "08",
    title: "Optical Fiber Management System",
    client: "Comcast",
    period: "2020 — 2023",
    description:
      "Network traffic and maintenance application for critical telecom infrastructure, built for high availability and reliable data querying.",
    tech: ["Angular", "Express.js", "MongoDB"],
    category: "Telecom",
  },
];
