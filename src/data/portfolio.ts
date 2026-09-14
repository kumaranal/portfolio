export const profile = {
  name: "Anal Kumar Biswas",
  role: "Senior Software Engineer",
  location: "India · UTC+5:30",
  email: "kumaranal.official@gmail.com",
  phone: "+91 70030 80703",
  phoneHref: "tel:+917003080703",
  linkedin: "https://linkedin.com/in/anal-kumar-biswas-733488356",
  linkedinLabel: "anal-kumar-biswas",
  website: "https://analkumarbiswas.com",
  resumeFile: "/Anal_Kumar_Biswas_Resume.pdf",
};

export const heroStats = [
  { value: "99.99%", label: "availability held through peak live traffic" },
  { value: "1M+", label: "events processing experience" },
  { value: "10,000+", label: "concurrent users served at once" },
  { value: "6", label: "years shipping to production" },
];

export const promises = [
  {
    id: "a",
    title: "Promise 01",
    heading: "Always available.",
    proof: [
      "99.99% availability sustained through peak tournament traffic on a live broadcasting platform.",
      "10,000+ concurrent viewers and 50+ simultaneous camera feeds, served from one media plane.",
      "Autoscaling sized to the traffic curve of a live event rather than a daily average.",
      "A legacy streaming pipeline replaced with WebRTC and LiveKit on Kubernetes, in production.",
    ],
  },
  {
    id: "b",
    title: "Promise 02",
    heading: "Always accurate.",
    proof: [
      "Idempotent consumers across 15+ services, so duplicate delivery is a no-op instead of a bug.",
      "Bounded retries and dead-letter queues: one bad message never blocks a partition.",
      "Zero reported compliance breaches on a platform handling protected health data.",
      "$50M+ in annual dealer incentives reconciled without a financial defect.",
    ],
  },
  {
    id: "c",
    title: "Promise 03",
    heading: "Quick to recover.",
    proof: [
      "40% improvement in mean time to recovery after centralising observability.",
      "Trace context carried through every async hop — one test run stays one trace.",
      "70% lower operational latency after the event-driven rebuild.",
      "~60% cut in query latency on high-volume telecom data.",
    ],
  },
];

export const approachTabs = [
  {
    id: "arch",
    label: "Architecture",
    heading: "I plan for the hard days, not only the good ones",
    paragraphs: [
      "Duplicate messages, partial writes, a dependency that disappears mid-request — these quiet edge cases are what decide whether a platform feels trustworthy. I would rather handle them in the design than meet them in an incident review.",
      'In practice that means clear contracts between services, retries that are safe to repeat, and a confident answer to "what happens if this runs twice?" well before anything reaches production.',
    ],
    tags: ["Event-driven architecture", "System design", "Kafka", "Versioned contracts", "Idempotency"],
  },
  {
    id: "scale",
    label: "Scale",
    heading: "I scale where the pressure actually lands",
    paragraphs: [
      "Real traffic is rarely even. A sports platform sits quiet until kickoff; a tournament broadcast goes from hundreds of viewers to ten thousand in a minute. Capacity planned around averages tends to disappoint at exactly the wrong moment.",
      "So I measure the real curve, place the cache or the autoscaler where the load genuinely arrives, and let the database do only the work that has to be durable. The result is headroom on the day it matters.",
    ],
    tags: ["Kubernetes + HPA", "Redis caching", "Async processing", "Query optimisation", "Load profiling"],
  },
  {
    id: "ops",
    label: "Operations",
    heading: "I leave systems easy to understand under pressure",
    paragraphs: [
      "A system you can see into is a system you can improve. Tracing, metrics and readable logs go in before the traffic does, so when something moves the wrong way the answer is already visible rather than hunted for.",
      "That habit is what a 40% improvement in recovery time looks like from the inside: calm, unhurried, and repeatable by whoever is on call.",
    ],
    tags: ["OpenTelemetry", "Distributed tracing", "Metrics & logging", "On-call readiness", "Production triage"],
  },
  {
    id: "own",
    label: "Ownership",
    heading: "One owner, from first sketch to on-call",
    paragraphs: [
      "I carry a piece of work from the first design sketch through the service, the infrastructure, the pipeline and the dashboard — and I stay with it in production. Ownership that complete is how a design proves itself.",
      "I also make the reasoning easy to follow: trade-offs stated plainly in a review, and in language stakeholders can act on. Fifteen teams shipping in parallel only works when everyone trusts the contract.",
    ],
    tags: ["Terraform / IaC", "CI/CD", "Design reviews", "Cross-team delivery", "Developer automation"],
  },
];

export type WorkItem = {
  id: string;
  title: string;
  meta: string;
  problem: string;
  approach: string;
  result: string;
  diagram?: { label: string; caption: string }[];
  diagramCaption?: string;
  deepDiveLink?: boolean;
};

export type Company = {
  name: string;
  role: string;
  dates: string;
  items: WorkItem[];
};

export const companies: Company[] = [
  {
    name: "GNAPI Technologies",
    role: "Senior Software Engineer",
    dates: "July 2025 — Present",
    items: [
      {
        id: "p1",
        title: "AI-Based Live Broadcasting Platform",
        meta: "WebRTC · LiveKit · EKS",
        problem:
          "Tournament traffic broke a legacy streaming pipeline. Latency climbed with the audience, feeds dropped mid-match, and capacity had to be guessed days ahead of an event.",
        approach:
          "I owned the architecture and the migration to a WebRTC and LiveKit media plane on Amazon EKS — horizontal scaling instead of vertical, with autoscaling tuned to the traffic curve of a live event.",
        result: "10,000+ concurrent viewers, 50+ simultaneous camera feeds, 99.99% availability at peak.",
        diagram: [
          { label: "50+ feeds", caption: "venue ingest" },
          { label: "LiveKit SFU", caption: "WebRTC forwarding" },
          { label: "EKS node pool", caption: "HPA on event curve" },
          { label: "10k viewers", caption: "sub-second fan-out" },
        ],
        diagramCaption: "Scaling happens at the node pool, so an unexpected audience costs capacity, not uptime.",
      },
      {
        id: "p2",
        title: "Enterprise QA Automation & Event-Driven Platform",
        meta: "Kafka · NestJS · 15+ services",
        problem:
          "Synchronous service-to-service calls meant one slow test runner stalled the entire QA pipeline, and a failed run stayed invisible until somebody went looking for it.",
        approach:
          "I led the move to 15+ Kafka-based NestJS services: versioned event contracts, idempotent consumers, bounded retries with dead-letter queues, and OpenTelemetry carried through the event envelope.",
        result: "1M+ telemetry events a day, 70% lower operational latency, 40% better mean time to recovery.",
        diagram: [
          { label: "Producers", caption: "runners, schedulers" },
          { label: "Kafka topics", caption: "keyed, replayable" },
          { label: "15+ consumers", caption: "idempotent, retry + DLQ" },
          { label: "Telemetry store", caption: "1M events / day" },
        ],
        diagramCaption: "Ordering and replay come from the topic; correctness under retry comes from the consumer.",
        deepDiveLink: true,
      },
      {
        id: "p3",
        title: "Spatial Asset Management System",
        meta: "FastAPI · GeoServer · Terraform",
        problem:
          "Electrical infrastructure had to be tracked through its lifecycle on an interactive map — a hundred thousand assets whose spatial queries were too slow to browse.",
        approach:
          "I designed the FastAPI, GeoServer and MongoDB services with the GIS team, provisioned the infrastructure in Terraform, and optimised the geospatial queries behind the map.",
        result: "Real-time lifecycle tracking for 100,000+ assets, with map rendering roughly 50% faster.",
      },
      {
        id: "p4",
        title: "AI Developer Automation Agents",
        meta: "MCP · Claude Code · Python",
        problem:
          "Every new engineer lost most of a day to environment setup, and build failures were diagnosed by whoever happened to recognise the error.",
        approach:
          "I engineered automation on Claude Code and the Model Context Protocol, wired to orchestrated Ubuntu environments, covering provisioning, dependencies and build-failure diagnostics.",
        result: "Environment setup fell from roughly four hours to under fifteen minutes.",
      },
    ],
  },
  {
    name: "Xotiv Technologies",
    role: "Full Stack Developer",
    dates: "December 2023 — June 2025",
    items: [
      {
        id: "p5",
        title: "DEVEBOL — AI Sports Education Platform",
        meta: "FastAPI · LangChain · Redis",
        problem:
          "All the traffic arrives during the match, and the AI features were the slowest, most expensive thing on the request path.",
        approach:
          "FastAPI behind a Next.js front end, LangChain workflows moved into the service layer, and Redis in front of the hot reads so Postgres only saw durable writes.",
        result: "500+ requests per second sustained at peak, with roughly 300ms off API response time.",
      },
      {
        id: "p6",
        title: "ReadMyRhythm — Healthcare Telemedicine Platform",
        meta: "TrueVault · Supabase · Stripe",
        problem:
          "Institutional EKG review puts protected health data, third-party payments and an unforgiving compliance surface in one system.",
        approach:
          "I drew the data boundaries first — PHI isolated in TrueVault, application state in Supabase, neither crossing over — then automated Stripe reconciliation so the finance trail was a job, not a person.",
        result: "10,000+ monthly medical transactions reconciled automatically, zero reported compliance breaches.",
      },
    ],
  },
  {
    name: "Tata Consultancy Services",
    role: "Software Analyst",
    dates: "November 2020 — November 2023",
    items: [
      {
        id: "p7",
        title: "Incentive Management System — FIAT",
        meta: "Java · Spring Boot · Jenkins",
        problem:
          "Dealer incentives and commissions were calculated across configurable sales rules where a rounding error is a financial defect.",
        approach:
          "Java and Spring Boot microservices for incentive and commission workflows, dynamic sales configuration, and Jenkins CI/CD on AWS — plus the production support that came with it.",
        result: "Processing and reconciliation of more than $50M in annual dealer incentives.",
      },
      {
        id: "p8",
        title: "Optical Fiber Management System — Comcast",
        meta: "Express.js · Angular · MongoDB",
        problem:
          "Engineers monitoring optical fiber infrastructure were waiting on queries over high-volume telecom data during maintenance windows.",
        approach:
          "Express.js backend work and Angular application components, with the heavy MongoDB aggregation pipelines rewritten and indexed for the access patterns that actually ran.",
        result: "Roughly 60% lower query latency, supporting high-availability telecom maintenance.",
      },
    ],
  },
];

export const deepDive = {
  intro:
    "Fifteen services, a million events a day, and the reasoning behind each decision — including what it cost. For anyone who would like to look past the summary.",
  context:
    "The platform executed test suites, collected telemetry and drove downstream workflows through a chain of synchronous HTTP calls. It worked at small scale and failed predictably at large: a slow runner held its caller, which held its caller, and a timeout anywhere surfaced as a red build somewhere unrelated. My job was to make execution asynchronous without making correctness optional.",
  constraints:
    "Events had to be ordered per suite, not globally. Duplicate delivery was a certainty. Fifteen teams needed to deploy independently. And the platform had to be diagnosable by whoever was on call, not only by whoever wrote the service.",
  decisions: [
    {
      title: "Kafka over a task queue",
      body: "Partition keys give ordering per suite while the topic stays parallel, and a retained log makes a consumer bug replayable instead of a data loss. The cost is operational weight: partition counts, rebalances and lag monitoring became things the team had to understand.",
    },
    {
      title: "Idempotency at the consumer, not the producer",
      body: "At-least-once delivery is the honest default, so every consumer dedupes on event id against persisted state and treats reprocessing as a no-op. It costs a read and a write per message; it buys the freedom to retry anything.",
    },
    {
      title: "Bounded retries, then a dead-letter queue",
      body: "Transient failures retry with backoff; a message that cannot succeed moves aside instead of blocking its partition. The DLQ is inspectable and replayable — which only works because draining it became part of the on-call rotation.",
    },
    {
      title: "Versioned event schemas as the service contract",
      body: "Services agree on the event, not on each other's endpoints, so fifteen teams deploy on their own schedule. Changes stay additive, trading some day-to-day speed for the ability to change anything without a coordinated release.",
    },
    {
      title: "Trace context inside the event envelope",
      body: 'OpenTelemetry context travels with the message, so one test run is one trace even across queue hops. This is the change that moved MTTR: the first question in an incident stopped being "which service?".',
    },
  ],
  whatIWouldChange:
    "Stand up a schema registry on day one; we enforced contracts by review for longer than we should have. And treat the partition key as a first-class design decision from the start — per-tenant partitioning was retrofitted once one large customer began crowding out the others, and retrofitting a key means replaying history.",
};

export const skillGroups = [
  {
    id: "a",
    label: "Languages & backend",
    rows: [
      { label: "Languages", value: "Python · Java · JavaScript · TypeScript" },
      { label: "Backend frameworks", value: "FastAPI · NestJS · Node.js · Express.js · Spring Boot" },
      { label: "API & service design", value: "REST APIs · service contracts · asynchronous processing · idempotency" },
    ],
  },
  {
    id: "b",
    label: "Distributed & cloud",
    rows: [
      { label: "Distributed systems", value: "Microservices · event-driven architecture · Kafka · retries & dead-letter queues · system design" },
      { label: "Cloud platforms", value: "AWS (EKS, EC2, ECS, S3, Lambda) · Google Cloud Platform" },
      { label: "Containers & infrastructure", value: "Kubernetes · Docker · Terraform · infrastructure as code" },
    ],
  },
  {
    id: "c",
    label: "Data & reliability",
    rows: [
      { label: "Databases", value: "PostgreSQL · MongoDB · Redis · OpenSearch" },
      { label: "Observability", value: "OpenTelemetry · distributed tracing · metrics · logging · production troubleshooting" },
      { label: "Security & identity", value: "Keycloak · OAuth 2.0 · OpenID Connect · RBAC · Microsoft Entra ID · single sign-on" },
    ],
  },
  {
    id: "d",
    label: "AI, frontend & delivery",
    rows: [
      { label: "AI & developer automation", value: "Model Context Protocol · Claude Code · LangChain" },
      { label: "Frontend", value: "React · Next.js · Angular · Electron" },
      { label: "CI/CD & delivery", value: "Jenkins · CI/CD pipelines · Kubernetes deployment · cloud release workflows" },
    ],
  },
];

export const about = {
  paragraphs: [
    "I came to software from electrical engineering, drawn to systems whose behaviour you can reason about. Six years later that is still the appeal — only the systems are distributed now, and a good deal larger.",
    "I do my best work where accuracy matters and the traffic is real: live broadcast, healthcare data, financial reconciliation, telecom infrastructure. I enjoy the review conversation, I am candid about the cost of my own decisions, and I would rather deliver something smaller that holds than something larger that wobbles.",
  ],
  education: {
    degree: "B.Tech, Electrical Engineering",
    institution: "Academy of Technology (WBUT)",
    years: "2016 — 2020 · CGPA 8.1",
  },
  based: {
    location: "India · UTC+5:30",
    note: "Open to remote and relocation",
  },
};
