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

export const impactMetrics = [
  { label: "Mean time to recovery", value: 40, unit: "%" },
  { label: "Operational latency", value: 70, unit: "%" },
  { label: "Telecom query latency", value: 60, unit: "%" },
  { label: "API response time", value: 25, unit: "%" },
];

export const domainBreakdown = [
  { domain: "Distributed systems", years: 3 },
  { domain: "Media & real-time", years: 1 },
  { domain: "AI product engineering", years: 1.5 },
  { domain: "Healthcare & compliance", years: 1 },
  { domain: "Enterprise & telecom", years: 3 },
];

export type WorkItem = {
  id: string;
  title: string;
  domain: string;
  meta: string;
  problem: string;
  approach: string;
  result: string;
  tier: "star" | "showcase";
  diagram?: { label: string; caption: string }[];
  diagramCaption?: string;
  deepDiveId?: string;
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
        domain: "Media & Real-time Infrastructure",
        meta: "WebRTC · LiveKit · EKS",
        problem:
          "Tournament traffic broke a legacy streaming pipeline. Latency climbed with the audience, feeds dropped mid-match, and capacity had to be guessed days ahead of an event.",
        approach:
          "I owned the architecture and the migration to a WebRTC and LiveKit media plane on Amazon EKS — horizontal scaling instead of vertical, with autoscaling tuned to the traffic curve of a live event.",
        result:
          "10,000+ concurrent viewers, 50+ simultaneous camera feeds, 99.99% availability at peak.",
        tier: "star",
        diagram: [
          { label: "50+ feeds", caption: "venue ingest" },
          { label: "LiveKit SFU", caption: "WebRTC forwarding" },
          { label: "EKS node pool", caption: "HPA on event curve" },
          { label: "10k viewers", caption: "sub-second fan-out" },
        ],
        diagramCaption:
          "Scaling happens at the node pool, so an unexpected audience costs capacity, not uptime.",
        deepDiveId: "p1",
      },
      {
        id: "p2",
        title: "Enterprise QA Automation & Event-Driven Platform",
        domain: "Distributed Systems",
        meta: "Kafka · NestJS · 15+ services",
        problem:
          "Synchronous service-to-service calls meant one slow test runner stalled the entire QA pipeline, and a failed run stayed invisible until somebody went looking for it.",
        approach:
          "I led the move to 15+ Kafka-based NestJS services: versioned event contracts, idempotent consumers, bounded retries with dead-letter queues, and OpenTelemetry carried through the event envelope.",
        result:
          "1M+ telemetry events a day, 70% lower operational latency, 40% better mean time to recovery.",
        tier: "star",
        diagram: [
          { label: "Producers", caption: "runners, schedulers" },
          { label: "Kafka topics", caption: "keyed, replayable" },
          { label: "15+ consumers", caption: "idempotent, retry + DLQ" },
          { label: "Telemetry store", caption: "1M events / day" },
        ],
        diagramCaption:
          "Ordering and replay come from the topic; correctness under retry comes from the consumer.",
        deepDiveId: "p2",
      },
      {
        id: "p3",
        title: "Spatial Asset Management System",
        domain: "GIS & Spatial Data",
        meta: "FastAPI · GeoServer · Terraform",
        problem:
          "Electrical infrastructure had to be tracked through its lifecycle on an interactive map — a hundred thousand assets whose spatial queries were too slow to browse.",
        approach:
          "I designed the FastAPI, GeoServer and MongoDB services with the GIS team, provisioned the infrastructure in Terraform, and optimised the geospatial queries behind the map.",
        result:
          "Real-time lifecycle tracking for 100,000+ assets, with map rendering roughly 50% faster.",
        tier: "showcase",
      },
      {
        id: "p4",
        title: "AI Developer Automation Agents",
        domain: "AI & Developer Tooling",
        meta: "MCP · Claude Code · Python",
        problem:
          "Every new engineer lost most of a day to environment setup, and build failures were diagnosed by whoever happened to recognise the error.",
        approach:
          "I engineered automation on Claude Code and the Model Context Protocol, wired to orchestrated Ubuntu environments, covering provisioning, dependencies and build-failure diagnostics.",
        result:
          "Environment setup fell from roughly four hours to under fifteen minutes.",
        tier: "showcase",
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
        domain: "AI Product Engineering",
        meta: "FastAPI · LangChain · Redis",
        problem:
          "All the traffic arrives during the match, and the AI features were the slowest, most expensive thing on the request path.",
        approach:
          "FastAPI behind a Next.js front end, LangChain workflows moved into the service layer, and Redis in front of the hot reads so Postgres only saw durable writes.",
        result:
          "500+ requests per second sustained at peak, with roughly 300ms off API response time.",
        tier: "showcase",
      },
      {
        id: "p6",
        title: "ReadMyRhythm — Healthcare Telemedicine Platform",
        domain: "Healthcare & Compliance",
        meta: "TrueVault · Supabase · Stripe",
        problem:
          "Institutional EKG review puts protected health data, third-party payments and an unforgiving compliance surface in one system.",
        approach:
          "I drew the data boundaries first — PHI isolated in TrueVault, application state in Supabase, neither crossing over — then automated Stripe reconciliation so the finance trail was a job, not a person.",
        result:
          "10,000+ monthly medical transactions reconciled automatically, zero reported compliance breaches.",
        tier: "star",
        diagram: [
          { label: "PHI record", caption: "isolated in TrueVault" },
          { label: "App state", caption: "accounts, scheduling — Supabase" },
          { label: "Stripe payment", caption: "capture on schedule" },
          { label: "Reconciliation job", caption: "matched, or flagged" },
        ],
        diagramCaption:
          "PHI and application state never share a table — the two stores are bridged by reference, not replication.",
        deepDiveId: "p6",
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
        domain: "Enterprise & FinTech",
        meta: "Java · Spring Boot · Jenkins",
        problem:
          "Dealer incentives and commissions were calculated across configurable sales rules where a rounding error is a financial defect.",
        approach:
          "Java and Spring Boot microservices for incentive and commission workflows, dynamic sales configuration, and Jenkins CI/CD on AWS — plus the production support that came with it.",
        result:
          "Processing and reconciliation of more than $50M in annual dealer incentives.",
        tier: "showcase",
      },
      {
        id: "p8",
        title: "Optical Fiber Management System — Comcast",
        domain: "Telecom Infrastructure",
        meta: "Express.js · Angular · MongoDB",
        problem:
          "Engineers monitoring optical fiber infrastructure were waiting on queries over high-volume telecom data during maintenance windows.",
        approach:
          "Express.js backend work and Angular application components, with the heavy MongoDB aggregation pipelines rewritten and indexed for the access patterns that actually ran.",
        result:
          "Roughly 60% lower query latency, supporting high-availability telecom maintenance.",
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
      "Sub-second latency had to hold for 50+ simultaneous camera feeds while an audience could grow from hundreds to 10,000+ viewers within minutes of kickoff. Vertical scaling was ruled out — a single point of failure isn't acceptable on a live broadcast. And the migration itself had to happen without an outage during an active tournament.",
    architecture:
      "A WebRTC and LiveKit media plane replaced the legacy pipeline, deployed on Amazon EKS. Camera feeds ingest through LiveKit's SFU (selective forwarding unit), which forwards media to viewers without re-encoding every stream on a single server — fan-out to 10,000+ viewers happens across the media plane, not through a central bottleneck. The Kubernetes node pool scales horizontally against the traffic curve of the event itself, not a daily average.",
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
      "Feeds from 50+ venue cameras ingest concurrently into the LiveKit SFU running on EKS. Horizontal pod autoscaling is tuned against the shape of a live event — a slow ramp before kickoff, a sharp spike at kickoff, a plateau through play — so new capacity lands ahead of the audience rather than behind it.",
    failureModes:
      "A node failing mid-match had to cost a reconnect, not a dropped broadcast — the media plane is stateless enough that a viewer's connection re-establishes against a healthy node without losing the stream. The traffic pattern that actually threatens the system isn't gradual growth, it's the vertical jump at kickoff, so scaling is tuned ahead of the known shape of a tournament schedule rather than purely reactive to current load.",
    scale:
      "50+ simultaneous camera feeds, 10,000+ concurrent viewers, 99.99% availability sustained through peak tournament traffic.",
    result:
      "10,000+ concurrent viewers and 50+ simultaneous camera feeds served at 99.99% availability at peak — on the same traffic that used to drop feeds and cap latency guesses days in advance.",
    whatIWouldChange:
      "Load-test the exact shape of a kickoff spike earlier. The autoscaling policy was tuned against production data from the first tournament on the new platform, which meant that first live event carried more risk than every one since.",
  },
  {
    id: "p2",
    projectTitle: "Enterprise QA Automation & Event-Driven Platform",
    domain: "Distributed Systems",
    intro:
      "Fifteen services, a million events a day, and the reasoning behind each decision — including what it cost.",
    problem:
      "The platform executed test suites, collected telemetry and drove downstream workflows through a chain of synchronous HTTP calls. It worked at small scale and failed predictably at large: a slow runner held its caller, which held its caller, and a timeout anywhere surfaced as a red build somewhere unrelated. The job was to make execution asynchronous without making correctness optional.",
    constraints:
      "Events had to be ordered per suite, not globally. Duplicate delivery was a certainty, not an edge case. Fifteen teams needed to deploy independently on their own schedules. And the platform had to be diagnosable by whoever was on call, not only by whoever wrote the service.",
    architecture:
      "Producers — test runners, schedulers, webhooks — publish to keyed Kafka topics, so ordering holds per suite while the topic stays parallel across suites. 15+ NestJS consumer services subscribe by concern (execution, telemetry, reporting, notifications), each independently deployable. Trace context travels inside the event envelope via OpenTelemetry, so a single test run stays a single trace across every hop.",
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
        body: "Services agree on the event, not on each other's endpoints, so fifteen teams deploy on their own schedule. Changes stay additive, trading some day-to-day speed for the ability to change anything without a coordinated release.",
      },
    ],
    implementation:
      "NestJS services own their own consumer groups and commit offsets only after a message is durably processed. Deduplication keys off event id against persisted state, so retried delivery is a no-op. Retries use exponential backoff up to a bounded attempt count before a message moves to a dead-letter queue that's inspectable and replayable — draining it became part of the on-call rotation, not a special case.",
    failureModes:
      "A slow or crashed consumer stalls only its own partition, never the producer or a sibling service. Poison messages that can't succeed move to the DLQ instead of blocking a partition indefinitely. Consumer rebalances during a deploy are expected, not exceptional — offsets and idempotency mean a rebalance costs latency, not correctness. The failure mode that wasn't planned for: unbounded partition skew once one large tenant began crowding out the others.",
    scale:
      "15+ Kafka-based NestJS services, 1M+ telemetry events processed daily, fifteen teams deploying against the same event contracts on independent schedules.",
    result:
      "1M+ telemetry events a day, 70% lower operational latency, 40% better mean time to recovery.",
    whatIWouldChange:
      "Stand up a schema registry on day one; we enforced contracts by review for longer than we should have. And treat the partition key as a first-class design decision from the start — per-tenant partitioning was retrofitted once one large customer began crowding out the others, and retrofitting a key means replaying history.",
  },
  {
    id: "p6",
    projectTitle: "ReadMyRhythm — Healthcare Telemedicine Platform",
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
      "10,000+ monthly medical transactions reconciled automatically, across an ongoing telemedicine caseload.",
    result:
      "10,000+ monthly medical transactions reconciled automatically, zero reported compliance breaches.",
    whatIWouldChange:
      "Build the reconciliation mismatch alerting in from day one rather than after the first manual catch. It existed within weeks, but there was a window where a mismatch would have been caught by a person, not a system.",
  },
];

export const skillGroups = [
  {
    id: "a",
    label: "Languages & backend",
    rows: [
      { label: "Languages", value: "Python · Java · JavaScript · TypeScript" },
      {
        label: "Backend frameworks",
        value: "FastAPI · NestJS · Node.js · Express.js ",
      },
      {
        label: "API & service design",
        value:
          "REST APIs · service contracts · asynchronous processing · idempotency",
      },
    ],
  },
  {
    id: "b",
    label: "Distributed & cloud",
    rows: [
      {
        label: "Distributed systems",
        value:
          "Microservices · event-driven architecture · Kafka · retries & dead-letter queues · system design",
      },
      {
        label: "Cloud platforms",
        value: "AWS (EKS, EC2, ECS, S3, Lambda) · Google Cloud Platform",
      },
      {
        label: "Containers & infrastructure",
        value: "Kubernetes · Docker · Terraform · infrastructure as code",
      },
    ],
  },
  {
    id: "c",
    label: "Data & reliability",
    rows: [
      {
        label: "Databases",
        value: "PostgreSQL · MongoDB · Redis · OpenSearch",
      },
      {
        label: "Observability",
        value:
          "OpenTelemetry · distributed tracing · metrics · logging · production troubleshooting",
      },
      {
        label: "Security & identity",
        value:
          "Keycloak · OAuth 2.0 · OpenID Connect · RBAC · Microsoft Entra ID · single sign-on",
      },
    ],
  },
  {
    id: "d",
    label: "AI, frontend & delivery",
    rows: [
      {
        label: "AI & developer automation",
        value: "Model Context Protocol · Claude Code · LangChain",
      },
      { label: "Frontend", value: "React · Next.js · Angular · Electron" },
      {
        label: "CI/CD & delivery",
        value:
          "Jenkins · CI/CD pipelines · Kubernetes deployment · cloud release workflows",
      },
    ],
  },
];

export const about = {
  note: "Came to software from electrical engineering — six years on, still drawn to systems whose behaviour you can reason about.",
  paragraphs: [
    "I came to software from electrical engineering, drawn to systems whose behaviour you can reason about. Six years later that is still the appeal — only the systems are distributed now, and a good deal larger.",
    "I do my best work where accuracy matters and the traffic is real: live broadcast, healthcare data, financial reconciliation, telecom infrastructure. I enjoy the review conversation, I am candid about the cost of my own decisions, and I would rather deliver something smaller that holds than something larger that wobbles.",
  ],
  education: {
    degree: "B.Tech, Electrical Engineering",
    institution: "Academy of Technology (West Bengal University of Technology)",
    years: "2016 — 2020 · CGPA 8.1",
    location: "India · UTC+5:30",
  },
  basesd: {},
};
