import { externalLinks } from "@/config/links";

export const profile = {
  name: "ANAL KUMAR BISWAS",
  role: "Senior Software Engineer ",
  location: "Kolkata, India · Open to relocation",
  email: "kumaranal.official@gmail.com",
  phone: "+91 7003080703",
  phoneHref: "tel:+917003080703",
  whatsappHref: "https://wa.me/917003080703",
  linkedin: "https://www.linkedin.com/in/anal-kumar-biswas-733488356/",
  linkedinLabel: "linkedin.com/in/anal-kumar-biswas-733488356",
  website: "https://analkumarbiswas.com",
  resumeFile: externalLinks.resumeUrl,
  fullResumeFile: externalLinks.fullResumeUrl,
};

export const topStats = [
  {
    label: "Live Broadcasting Platform",
    value: "20+",
    unit: "feeds",
    desc: "Replaced a cable-based setup with software: 20+ camera feeds, commentary and scoreboard graphics orchestrated at 99.9% availability per match window.",
  },
  {
    label: "IQGeo Electrical Assets",
    value: "100k+",
    unit: "assets",
    desc: "Built a spatial asset management platform with real-time mapping for more than 100,000 electrical grid assets.",
  },
  {
    label: "Turf Assistant",
    value: "1M+",
    unit: "req/day",
    desc: "Handled daily operational requests with real-time sensor and dispatch syncs at 99.95% uptime during peak facility hours.",
  },
  {
    label: "FIAT Incentive Settlement",
    value: "3h→40",
    unit: "min",
    desc: "Re-engineered the settlement batch for a system processing $50M+ in annual incentives.",
  },
];

export const strengths = [
  {
    n: "01",
    title: "Backend & API ownership",
    body: "Design and implement production REST/GraphQL APIs, service boundaries, data models and integration flows using Python/FastAPI and Node.js/NestJS/Express.js.",
  },
  {
    n: "02",
    title: "Full-stack delivery",
    body: "Build React and Angular interfaces alongside backend services, with a practical focus on scalability, caching, async processing, observability, CI/CD and cloud deployment.",
  },
  {
    n: "03",
    title: "System design",
    body: "Work across HLD/LLD, microservices, event-driven architecture, Kafka, Redis, database optimization and production debugging; mentor through design and code review.",
  },
];

export type ProjectVisual =
  | { kind: "flow"; big: string; caption: string; from: string; to: string }
  | { kind: "ecg"; big: string; caption: string }
  | {
      kind: "steps";
      big: string;
      bigUnit?: string;
      caption: string;
      steps: string[];
    };

export type WorkItem = {
  id: string;
  title: string;
  domain: string;
  meta: string;
  problem: string;
  approach: string;
  result: string;
  blurb: string;
  tier: "star" | "showcase";
  diagram?: { label: string; caption: string }[];
  diagramCaption?: string;
  deepDiveId?: string;
  cardMeta?: string;
  cardBadge?: string;
  cardTitle?: string;
  visual?: ProjectVisual;
  achievement?: string;
  lead?: string;
  points?: string[];
  tradeoff?: string;
  chips?: string[];
  externalLink?: { label: string; href: string };
};

export type Company = {
  name: string;
  role: string;
  dates: string;
  href?: string;
  items: WorkItem[];
};

export const companies: Company[] = [
  {
    name: "GNAPI Technologies Pvt. Ltd.",
    role: "Senior Software Engineer",
    dates: "July 2025 — Present",
    href: "https://linkedin.com/company/gnapi",
    items: [
      {
        id: "p1",
        title: "Live Broadcasting Platform",
        domain: "Media & Real-time Infrastructure",
        meta: "Python · FastAPI · WebRTC · LiveKit",
        blurb:
          "Architected a greenfield WebRTC and LiveKit platform for the production side of live sport: cameras, commentary and scoreboard graphics, feeding YouTube Live and Discord.",
        problem:
          "A legacy, cable-based production setup broke under tournament traffic: latency climbed with the audience, feeds dropped mid-match, and capacity had to be guessed days ahead of an event.",
        approach:
          "I owned system architecture and Python media orchestration, building a greenfield WebRTC and LiveKit platform with a React producer console, FastAPI orchestration, Redis caching and fault-tolerant fallback paths. The platform integrates with YouTube Live and Discord for distribution.",
        result:
          "20+ camera feeds, live commentary feeds and real-time scoreboard graphics from one platform at 99.9% availability per match window, built from scratch by a team of 8.",
        tier: "star",
        diagram: [
          { label: "20+ feeds", caption: "venue ingest" },
          { label: "LiveKit SFU", caption: "WebRTC forwarding" },
          {
            label: "Production workflows",
            caption: "orchestration + graphics",
          },
          { label: "YouTube / Discord", caption: "distribution" },
        ],
        diagramCaption:
          "Software orchestration connects venue feeds and production workflows to distribution platforms.",
        deepDiveId: "p1",
        cardMeta: "GNAPI · 2025 – Present",
        cardBadge: "Built from scratch · Team of 8",
        visual: {
          kind: "flow",
          big: "20+",
          caption:
            "camera feeds orchestrated with commentary and scoreboard graphics",
          from: "Cable-based setup",
          to: "Software-defined production",
        },
        achievement:
          "Architected a greenfield WebRTC and LiveKit platform replacing cable-based production setups. It orchestrates 20+ camera feeds, live commentary and real-time scoreboard graphics at 99.9% availability per match window, with distribution to YouTube Live and Discord.",
        lead: "A high-throughput, low-latency production platform for multi-camera broadcasting. I owned system architecture and Python media orchestration services as part of a team of 8.",
        points: [
          "Defined APIs, data models and service boundaries for real-time media workflows.",
          "Built a React producer console and FastAPI orchestration with Redis caching and fault-tolerant fallback paths.",
          "Integrated third-party distribution to YouTube Live and Discord.",
        ],
        tradeoff:
          "Designed the production platform around software orchestration while retaining third-party platforms for viewer-facing distribution and playback.",
        chips: [
          "React",
          "TypeScript",
          "FastAPI",
          "WebRTC",
          "LiveKit",
          "Redis",
          "PostgreSQL",
          "Docker",
          "Kubernetes",
          "Helm",
          "Terraform",
          "AWS EKS",
          "S3",
          "Jenkins",
        ],
      },
      {
        id: "p3",
        title: "AI-Assisted Electrical Instrumentation System (IQGeo)",
        domain: "GIS & Spatial Data",
        meta: "Python · FastAPI · GeoServer · MongoDB",
        blurb:
          "Built spatial asset management backends and React interfaces enabling real-time mapping for 100,000+ electrical grid assets.",
        problem:
          "Build a robust spatial asset management platform for IQGeo to monitor, maintain and map critical electrical infrastructure in real time.",
        approach:
          "Designed asset-management backends in Python FastAPI and React, integrated GeoServer with MongoDB for dynamic spatial layers, and built a LangChain RAG system for network installation planning. Automated AWS infrastructure and Jenkins CI/CD.",
        result:
          "Enabled real-time mapping for 100,000+ grid assets, reduced map load latency by 40%, and cut network installation planning effort by 50%.",
        tier: "showcase",
        chips: [
          "React",
          "JavaScript",
          "Python",
          "FastAPI",
          "Pyramid",
          "GeoServer",
          "MongoDB",
          "AWS",
          "Docker",
          "Jenkins",
          "LangChain",
          "RAG",
          "Terraform",
          "Kubernetes",
        ],
      },
      {
        id: "p2",
        title: "AI-Assisted Enterprise QA Automation & Event-Driven Platform",
        domain: "Distributed Systems",
        meta: "Kafka · NestJS · 11 services",
        blurb:
          "Split a monolithic test runner into 11 NestJS microservices over Kafka and cut production MTTR by 40% across ~1M daily events.",
        problem:
          "Synchronous service-to-service calls meant one slow test runner stalled the entire QA pipeline, and a failed run stayed invisible until somebody went looking for it.",
        approach:
          "I decomposed the monolithic runner into 11 Kafka-based NestJS microservices: versioned event contracts, idempotent consumers, bounded retries with dead-letter queues, and OpenTelemetry carried through the event envelope. Alongside it, I integrated Keycloak for OAuth 2.0/OIDC single sign-on, automated bug tracking and Jira ticketing workflows, and built AI developer agents on MCP and Claude Code that cut new-service setup from four hours to fifteen minutes.",
        result:
          "1M+ telemetry events a day, 70% lower operational latency, 40% better mean time to recovery.",
        tier: "star",
        diagram: [
          { label: "Producers", caption: "runners, schedulers" },
          { label: "Kafka topics", caption: "keyed, replayable" },
          { label: "11 consumers", caption: "idempotent, retry + DLQ" },
          { label: "Telemetry store", caption: "1M events / day" },
        ],
        diagramCaption:
          "Ordering and replay come from the topic; correctness under retry comes from the consumer.",
        deepDiveId: "p2",
      },
    ],
  },
  {
    name: "Xotiv Technologies Pvt. Ltd.",
    role: "Full Stack Developer",
    dates: "December 2023 — June 2025",
    href: "https://xotiv.com",
    items: [
      {
        id: "p9",
        title: "Turf Assistant — Sports & Golf Facility Management Platform",
        domain: "Multi-tenant SaaS",
        meta: "Angular · TypeScript · Node.js · GraphQL",
        blurb:
          "Handled 1M+ daily operational requests with real-time sensor and dispatch syncs at 99.95% uptime during peak facility hours.",
        problem:
          "Modernize end-to-end operations for sports facilities, golf courses, local maintenance contractors and agronomic consulting teams.",
        approach:
          "Architected Angular portals and Node.js/Express APIs over PostgreSQL, used GraphQL for dynamic operations dashboards and REST for third-party integrations, and migrated containerized services to AWS ECS via Jenkins. Built a LangChain pipeline for hardware maintenance planning.",
        result:
          "Handled 1M+ daily requests at 99.95% uptime during peak facility hours, improved field technician utilization by 25%, reduced deployment downtime by 80%, and cut manual scheduling overhead by 35%.",
        tier: "star",
        deepDiveId: undefined,
        cardMeta: "Xotiv · 2023 – 2025",
        cardBadge: "Team of 6 · API architecture + AWS migration",
        visual: {
          kind: "steps",
          big: "1M+",
          bigUnit: "req/day",
          caption:
            "daily operational requests with real-time sensor and dispatch syncs at 99.95% uptime during peak facility hours",
          steps: [
            "Equipment tracking",
            "Dispatch",
            "Facility operations",
            "Sensor sync",
          ],
        },
        externalLink: {
          label: "Visit Turf Assistant",
          href: "https://app.turfassistant.com/",
        },
        achievement:
          "Handled 1M+ daily operational requests with real-time sensor and dispatch syncs at 99.95% uptime during peak facility hours. Improved field technician utilization by 25% and reduced deployment downtime by 80% through containerization and AWS ECS migration.",
        lead: "Operations software for sports facilities, golf courses and maintenance teams. I owned API architecture and AWS migration as part of a team of 6.",
        points: [
          "Engineered equipment tracking and dispatch workflows, improving field technician utilization by 25%.",
          "Used GraphQL for dashboards and REST APIs for third-party integrations.",
          "Built a LangChain maintenance-planning pipeline that reduced manual scheduling overhead by 35%.",
        ],
        chips: [
          "Angular",
          "Node.js",
          "Express",
          "GraphQL",
          "PostgreSQL",
          "Sequelize",
          "Redis",
          "AWS ECS",
          "Jenkins",
        ],
      },
      {
        id: "p5",
        title: "DEVEBOL — AI-Assisted Sports Club Management Platform",
        domain: "AI Product Engineering",
        meta: "Next.js · Prisma · LangChain",
        blurb: "A sports club platform with AI features.",
        problem:
          "Sports clubs ran rosters, schedules and member communication by hand, with no AI assistance and no reliable way to reach members in real time.",
        approach:
          "I built the platform on Next.js with Prisma over Supabase, added LangChain and Redis for the AI-assisted features, and wired up real-time member communication through Firebase push notifications, Twilio and SendGrid.",
        result:
          "Roster management, AI-assisted workflows and member notifications running on one platform instead of manual coordination.",
        tier: "showcase",
      },
      {
        id: "p10",
        title: "AFFCO — Property & Tenant Management SaaS",
        domain: "PropTech",
        meta: "Next.js · Prisma · Stripe",
        blurb: "A property management SaaS with automated rent processing.",
        problem:
          "A real estate agency tracked properties, tenants and rent collection across spreadsheets and manual follow-up, with no automated way to process rent or notify tenants.",
        approach:
          "I built the property and tenant management system on Next.js and Prisma, integrated Stripe to automate rent processing, and added SendGrid and Twilio for tenant and staff notifications.",
        result:
          "Rent collection and tenant communication running as one automated workflow instead of spreadsheets and manual follow-up calls.",
        tier: "showcase",
      },
      {
        id: "p6",
        title: "ReadMyRhythm — Telemedicine & EKG Review Platform",
        domain: "Healthcare & Compliance",
        meta: "Next.js · Python · FastAPI · LangChain",
        blurb:
          "Owned system architecture for an AI-assisted clinician platform processing 50,000 ECGs per month.",
        problem:
          "Enable ingestion of diagnostic ECG/EKG data from smartwatches and personal devices for cardiologist interpretation within 24 hours, while connecting users with cardiac providers.",
        approach:
          "Created a Next.js clinician platform with Python FastAPI file parsing and a LangChain RAG system for AI-assisted first-pass report drafting. Implemented OAuth 2.0/OIDC and secure document access with TrueVault, Supabase and short-lived signed URLs.",
        result:
          "Processes 50,000 ECGs per month through a secure clinician workflow.",
        tier: "star",
        deepDiveId: "p6",
        cardMeta: "Xotiv · 2023 – 2025",
        cardBadge: "Team of 4 · Architecture",
        cardTitle: "ReadMyRhythm — Telemedicine & EKG Review",
        visual: {
          kind: "ecg",
          big: "50,000",
          caption: "ECGs processed every month",
        },
        externalLink: {
          label: "Visit readmyrhythm.com",
          href: "https://readmyrhythm.com/",
        },
        achievement:
          "Created a clinician platform processing 50,000 ECGs every month, with secure diagnostic data access and AI-assisted first-pass report drafting for cardiologist review.",
        lead: "A telemedicine workflow connecting users with cardiac providers for review of wearable and uploaded diagnostic ECG/EKG data.",
        points: [
          "Built Next.js clinician workflows and Python FastAPI ECG file parsing.",
          "Integrated LangChain RAG for AI-assisted first-pass report drafting.",
          "Implemented OAuth 2.0/OIDC and secure document access with TrueVault, Supabase and short-lived signed URLs.",
        ],
        chips: [
          "Next.js",
          "FastAPI",
          "LangChain",
          "Supabase",
          "TrueVault",
          "Stripe",
          "AWS ECS",
        ],
      },
    ],
  },
  {
    name: "Tata Consultancy Services (TCS)",
    role: "Software Analyst",
    dates: "November 2020 — November 2023",
    href: "https://www.tcs.com",
    items: [
      {
        id: "p7",
        title: "Incentive Management System — FIAT",
        domain: "Enterprise & FinTech",
        meta: "Java · REST APIs · Angular · PostgreSQL",
        blurb:
          "Owned low-level design for settlement services under the lead architect and optimized a batch processing $50M+ in annual dealer incentives.",
        problem:
          "Optimize the enterprise sales incentive lifecycle with a multi-tier approval pipeline and a high-performance financial settlement engine.",
        approach:
          "Developed Java microservices and Angular dashboards, authored low-level designs for settlement services, partitioned dealer datasets and implemented set-based aggregation. Automated AWS EC2 releases via Jenkins.",
        result:
          "Reduced settlement batch processing from 3 hours to 40 minutes and scaled batch capacity 4x without additional cloud infrastructure costs.",
        tier: "showcase",
      },
      {
        id: "p8",
        title: "Optical Fiber Management System — Comcast",
        domain: "Telecom Infrastructure",
        meta: "Angular · TypeScript · Node.js · MongoDB",
        blurb:
          "Owned network topology APIs and dashboard queries monitoring more than 15,000 optical fiber nodes.",
        problem:
          "Deliver real-time visibility, route planning and predictive maintenance across extensive optical fiber infrastructure.",
        approach:
          "Created Angular topology dashboards and Node.js REST services on MongoDB, then redesigned complex MongoDB aggregation pipelines for the dashboard query layer.",
        result:
          "Reduced query latency by more than 60%, improving affected queries from repeated 30-second timeouts to approximately 2 seconds.",
        tier: "showcase",
      },
    ],
  },
];

export type DeepDive = {
  id: string;
  projectTitle: string;
  domain: string;
  intro: string;
  problem: string;
  constraints: string;
  architecture: string;
  tradeoffs: { title: string; body: string }[];
  implementation: string;
  failureModes: string;
  scale: string;
  result: string;
  whatIWouldChange: string;
};

export const deepDives: DeepDive[] = [
  {
    id: "p1",
    projectTitle: "AI-Based Live Broadcasting Platform",
    domain: "Media & Real-time Infrastructure",
    intro:
      "Replacing a streaming pipeline that failed predictably at kickoff, without an outage during an active tournament.",
    problem:
      "The legacy streaming pipeline broke under tournament traffic: latency climbed with the audience, feeds dropped mid-match, and capacity had to be guessed days ahead of an event because the old architecture scaled vertically and reactively.",
    constraints:
      "Sub-second latency had to hold for 20+ simultaneous camera feeds while an audience could grow quickly within minutes of kickoff. Vertical scaling was ruled out — a single point of failure isn't acceptable on a live broadcast. And the migration itself had to happen without an outage during an active tournament.",
    architecture:
      "A WebRTC and LiveKit media plane replaced the legacy pipeline, deployed on Amazon EKS. Camera feeds ingest through LiveKit's SFU (selective forwarding unit), which forwards media to viewers without re-encoding every stream on a single server. The Kubernetes node pool scales horizontally against the traffic curve of the event itself, not a daily average, with bare-metal GPU nodes handling the heavier media work.",
    tradeoffs: [
      {
        title: "Horizontal over vertical scaling",
        body: "A bigger box has a ceiling and a single point of failure. Horizontal scaling on EKS trades operational complexity — node pool sizing, health checks, rolling updates mid-event — for a system that survives losing any one node during a live broadcast.",
      },
      {
        title: "SFU over a mixing unit",
        body: "A selective forwarding unit forwards media instead of decoding and re-encoding every stream, which keeps latency low and server cost predictable at scale. The trade-off is that more of the rendering work happens on the client.",
      },
      {
        title: "Autoscaling tuned to the event curve, not average load",
        body: "Sizing for a typical day would have meant guessing capacity days ahead of an event. A scaling policy keyed to the live traffic curve costs some responsiveness at the very first moment of a spike, in exchange for not paying for capacity nobody uses between events.",
      },
    ],
    implementation:
      "Feeds from 20+ venue cameras ingest concurrently into the LiveKit SFU running on EKS, alongside commentary feeds and real-time scoreboard graphics, with the finished production distributed to YouTube Live and Discord. Horizontal pod autoscaling is tuned against the shape of a live event — a slow ramp before kickoff, a sharp spike at kickoff, a plateau through play — so new capacity lands ahead of the audience rather than behind it.",
    failureModes:
      "A node failing mid-match had to cost a reconnect, not a dropped broadcast — the media plane is stateless enough that a viewer's connection re-establishes against a healthy node without losing the stream. The traffic pattern that actually threatens the system isn't gradual growth, it's the vertical jump at kickoff, so scaling is tuned ahead of the known shape of a tournament schedule rather than purely reactive to current load.",
    scale:
      "20+ simultaneous camera feeds plus commentary feeds, 99.9% availability sustained per match window, built from scratch by a team of 8.",
    result:
      "20+ camera feeds, live commentary and real-time scoreboard graphics served from one platform at 99.9% availability per match window — on infrastructure that used to drop feeds and cap latency guesses days in advance.",
    whatIWouldChange:
      "Load-test the exact shape of a kickoff spike earlier. The autoscaling policy was tuned against production data from the first tournament on the new platform, which meant that first live event carried more risk than every one since.",
  },
  {
    id: "p2",
    projectTitle: "Enterprise QA Automation & Event-Driven Platform",
    domain: "Distributed Systems",
    intro:
      "Eleven services, a million events a day, and the reasoning behind each decision — including what it cost.",
    problem:
      "The platform executed test suites, collected telemetry and drove downstream workflows through a chain of synchronous HTTP calls. It worked at small scale and failed predictably at large: a slow runner held its caller, which held its caller, and a timeout anywhere surfaced as a red build somewhere unrelated. The job was to make execution asynchronous without making correctness optional.",
    constraints:
      "Events had to be ordered per suite, not globally. Duplicate delivery was a certainty, not an edge case. Multiple teams needed to deploy independently on their own schedules. And the platform had to be diagnosable by whoever was on call, not only by whoever wrote the service.",
    architecture:
      "Producers — test runners, schedulers, webhooks — publish to keyed Kafka topics, so ordering holds per suite while the topic stays parallel across suites. 11 NestJS consumer services subscribe by concern (execution, telemetry, reporting, notifications), each independently deployable. Trace context travels inside the event envelope via OpenTelemetry, so a single test run stays a single trace across every hop.",
    tradeoffs: [
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
        body: "Services agree on the event, not on each other's endpoints, so teams deploy on their own schedule. Changes stay additive, trading some day-to-day speed for the ability to change anything without a coordinated release.",
      },
    ],
    implementation:
      "NestJS services own their own consumer groups and commit offsets only after a message is durably processed. Deduplication keys off event id against persisted state, so retried delivery is a no-op. Retries use exponential backoff up to a bounded attempt count before a message moves to a dead-letter queue that's inspectable and replayable — draining it became part of the on-call rotation, not a special case.",
    failureModes:
      "A slow or crashed consumer stalls only its own partition, never the producer or a sibling service. Poison messages that can't succeed move to the DLQ instead of blocking a partition indefinitely. Consumer rebalances during a deploy are expected, not exceptional — offsets and idempotency mean a rebalance costs latency, not correctness. The failure mode that wasn't planned for: unbounded partition skew once one large tenant began crowding out the others.",
    scale:
      "11 Kafka-based NestJS services, 1M+ telemetry events processed daily, multiple teams deploying against the same event contracts on independent schedules.",
    result:
      "1M+ telemetry events a day, 70% lower operational latency, 40% better mean time to recovery.",
    whatIWouldChange:
      "Stand up a schema registry on day one; we enforced contracts by review for longer than we should have. And treat the partition key as a first-class design decision from the start — per-tenant partitioning was retrofitted once one large customer began crowding out the others, and retrofitting a key means replaying history.",
  },
  {
    id: "p6",
    projectTitle: "AI-Assisted ReadMyRhythm — Healthcare Telemedicine Platform",
    domain: "Healthcare & Compliance",
    intro:
      "Protected health data, real payments and a compliance surface that doesn't forgive a shortcut, in one system.",
    problem:
      "Institutional EKG review put protected health data, third-party payments and an unforgiving compliance surface in one system. Any one of the three going wrong is the kind of incident that ends a healthcare product.",
    constraints:
      "PHI had to stay isolated from general application state, not merely access-controlled within the same store — a breach of one shouldn't touch the other. Payment reconciliation for 10,000+ monthly medical transactions had to be automatic and auditable, because a manual finance process at that volume is itself a source of error. And none of it could slow down a clinician trying to review an EKG.",
    architecture:
      "PHI lives in TrueVault, a data store built for that exact boundary; application state — accounts, scheduling, everything that isn't clinical data — lives in Supabase. The two never share a table or a join; the application layer bridges them by reference, not by replication. Stripe handles payment capture, with a reconciliation job that matches transactions against the application's own record of what was owed, on a schedule rather than by a person checking a spreadsheet.",
    tradeoffs: [
      {
        title: "Two data stores instead of one",
        body: "Keeping PHI and application state in separate systems costs an extra integration layer, and every feature touching both has to be written deliberately. It buys a much smaller PHI blast radius, and a compliance story that doesn't depend on every future engineer getting a table-level access rule right.",
      },
      {
        title: "Automated reconciliation over manual review",
        body: "A person checking payments against invoices scales until it doesn't, and a tired reviewer at 10,000+ transactions a month is a worse error rate than a scheduled job with alerting. The trade-off is that the reconciliation logic itself became a piece of software that has to be correct — bugs there are silent until someone notices a mismatch.",
      },
      {
        title: "Data boundaries drawn before the schema, not after",
        body: "Deciding what counts as PHI first meant some early features took longer to design. Retrofitting that boundary after data has already commingled is a much larger, riskier migration than most teams want to admit.",
      },
    ],
    implementation:
      "The application layer resolves a patient record by reference — an identifier pointing into TrueVault — rather than holding clinical fields itself. Payment events feed a reconciliation job that reads both the payment ledger and the application's expected-charges record, flags any mismatch, and only pulls in a person when something doesn't line up automatically.",
    failureModes:
      "A reconciliation mismatch fails loud, not silent — it raises a flag rather than resolving itself, because a self-healing financial job is exactly the kind of thing that hides a real defect. On the PHI side, the failure mode being defended against isn't a system crash, it's a boundary getting blurred by a well-intentioned shortcut in a future feature — which is why the separation is structural, two systems, rather than a permissions rule inside one.",
    scale:
      "50,000 ECGs processed every month, 10,000+ monthly medical transactions reconciled automatically, across an ongoing telemedicine caseload.",
    result:
      "50,000 ECGs processed every month and 10,000+ monthly medical transactions reconciled automatically, zero reported compliance breaches.",
    whatIWouldChange:
      "Build the reconciliation mismatch alerting in from day one rather than after the first manual catch. It existed within weeks, but there was a window where a mismatch would have been caught by a person, not a system.",
  },
];

export const skillGroups = [
  {
    title: "Programming languages",
    items: [
      "Python",
      "JavaScript (ES6+)",
      "TypeScript",
      "Java (working knowledge)",
      "SQL",
      "C++",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Angular", "HTML5", "CSS3"],
  },
  {
    title: "Backend & architecture",
    items: [
      "FastAPI",
      "Node.js",
      "NestJS",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "OAuth 2.0 / OIDC",
      "Microservices",
      "Event-Driven Architecture",
      "Kafka",
      "RabbitMQ",
      "WebRTC",
      "Model Context Protocol (MCP)",
      "Claude Code",
      "System design",
      "HLD (High Level Design)",
      "LLD (Low Level Design)",
      "Data Structures & Algorithms",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EKS, ECS, EC2, S3, Lambda)",
      "GCP",
      "Kubernetes",
      "Docker",
      "Helm",
      "Terraform",
      "Jenkins",
      "CI/CD",
      "Git",
      "Microsoft Entra ID",
    ],
  },
  {
    title: "Data & AI",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "OpenSearch",
      "Supabase",
      "GeoServer",
      "Prisma",
      "Sequelize",
      "LLMs",
      "RAG",
      "LangChain",
    ],
  },
  {
    title: "Quality & observability",
    items: [
      "OpenTelemetry",
      "Distributed tracing",
      "Swagger",
      "Jest",
      "Code review",
      "Agile / Scrum",
      "Sentry",
      "Datadog",
    ],
  },
];

export const marquee = [
  "Python",
  "FastAPI",
  "Node.js",
  "NestJS",
  "TypeScript",
  "React",
  "Angular",
  "Kafka",
  "WebRTC",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Kubernetes",
  "Terraform",
];

export const about = {
  education: {
    degree: "Bachelor of Technology (B.Tech), Electrical Engineering",
    institution:
      "Academy of Technology (West Bengal University of Technology), West Bengal",
    years: "2016 — 2020 · CGPA 8.1",
    location: "India · UTC+5:30",
  },
};

export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Claude Code 101",
    issuer: "Claude Academy · Anthropic",
    issued: "September 2026",
    credentialId: "c749e82dcf22d97d77eaf13e7caa46db",
    credentialUrl:
      "https://academy.claude.com/verify/c749e82dcf22d97d77eaf13e7caa46db",
  },
  {
    title: "Certified Associate JavaScript Programmer",
    issuer: "JS Institute",
    issued: "January 2026",
    credentialId: "gixL.k6x8.KKpc",
  },
  {
    title: "PCAP — Certified Associate in Python Programming",
    issuer: "OpenEDG",
    issued: "October 2025",
    credentialUrl: "https://verify.openedg.org/?id=2F2G.Bwkw.p7zS",
  },
];
