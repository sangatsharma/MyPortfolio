export type ProjectKind = "Commercial" | "Personal";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  kind: ProjectKind;
  featured: boolean;
  year: string;
  /** Path under /public, shown on cards and case-study hero. */
  image?: string;
  live?: string;
  github?: string;
  tech: string[];
  /** Domains used for filtering on the projects grid. */
  domains: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: { title: string; detail: string }[];
  performance: string[];
  lessons: string[];
}

export const projects: Project[] = [
  {
    slug: "consultancy-crm",
    name: "Consultancy CRM & Visa Platform",
    tagline: "Micro-frontend platform running visa pipelines for an international consultancy",
    kind: "Commercial",
    featured: true,
    year: "2025 to 2026",
    tech: ["React", "TypeScript", "Monorepo", "Micro-frontends", "WebSockets", "REST APIs"],
    domains: ["SaaS", "Real-time", "Architecture"],
    overview:
      "A monorepo-based platform of interconnected portals (CRM, visa processing and workforce operations), each deployed independently but sharing design system, auth and data contracts. I led frontend development end to end: solution design, implementation and continuous delivery across releases.",
    problem:
      "The consultancy ran visa pipelines across spreadsheets, email threads and disconnected tools. Every application touched multiple roles and external partners, with compliance requirements that demanded a full audit trail that no system provided.",
    solution:
      "A micro-frontend system where each business domain (CRM, visa operations, workforce) lives in its own independently deployable app, unified by a shared component library and typed API layer. Every pipeline action is tracked, auditable and visible in real time to every role that needs it.",
    architecture: [
      "Monorepo with domain-scoped apps and a shared UI/util layer, so teams ship portals independently without drift.",
      "Typed API contracts shared across apps to keep cross-portal data flow consistent.",
      "WebSocket layer for real-time pipeline updates and in-app chat, synchronized across portals.",
      "Lead-ingestion pipeline: public website → CRM with cross-repo data flow and lead-to-candidate conversion.",
    ],
    features: [
      "Multi-role visa pipelines with strict stage gating and partner hand-offs",
      "Activity tracking and audit flows on every pipeline mutation",
      "Real-time updates and chat via WebSockets",
      "Centralized finance tracking for visa workflows",
      "Role-based access across separately deployed portals",
    ],
    challenges: [
      {
        title: "Keeping independently deployed apps coherent",
        detail:
          "Separate portals meant separate release cycles. Shared packages for UI, auth and API types, versioned inside the monorepo, kept every portal on the same contract without blocking each other's deploys.",
      },
      {
        title: "Compliance without friction",
        detail:
          "Audit requirements could easily have made the UI bureaucratic. Tracking was pushed into the data layer so audit records are produced as a side effect of normal actions, not extra steps for operators.",
      },
      {
        title: "Requirements that evolved weekly",
        detail:
          "I sat in weekly client SRS discussions and translated them into iterative delivery: scoping what ships this release versus what needs design, keeping trust on both sides.",
      },
    ],
    performance: [
      "Centralized workflows removed manual hand-offs and measurably accelerated case throughput.",
      "Domain-level code splitting keeps each portal's bundle scoped to its own workflows.",
    ],
    lessons: [
      "Micro-frontends pay off only with disciplined shared contracts, because the architecture is a social agreement as much as a technical one.",
      "Sitting in requirement discussions directly makes you a better engineer: half of good architecture is knowing which requirements are actually stable.",
    ],
  },
  {
    slug: "restrox",
    name: "RestroX",
    tagline: "Multi-tenant restaurant management platform",
    kind: "Commercial",
    featured: true,
    year: "2024 to 2025",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "WebSockets"],
    domains: ["SaaS", "Real-time"],
    overview:
      "A multi-tenant restaurant management platform spanning three applications (Product Owner, Client Admin and customer-facing) inside a monorepo with a shared design system. I built frontend modules across all three, gradually taking ownership through sprint planning, code reviews and production releases.",
    problem:
      "Restaurants juggle orders, tables, menus and payments across tools that don't talk to each other. RestroX needed one platform serving three very different audiences, namely platform operators, restaurant admins and diners, without building three separate products.",
    solution:
      "A monorepo of three apps on a shared design system, so a diner's order, an admin's dashboard and the platform owner's controls all speak the same visual and data language. Real-time WebSocket features keep orders and operational notifications live across roles.",
    architecture: [
      "Monorepo with three deployable apps sharing one design system for cross-module UX consistency.",
      "Zustand for local UI state, React Query for server state, a deliberate split that kept caching predictable.",
      "Payment gateway integration wired into order workflows with real-time status updates.",
    ],
    features: [
      "Tenant-scoped admin dashboards for menus, tables and staff",
      "Live order tracking with WebSocket-driven notifications",
      "Integrated payment gateway workflows",
      "Shared component library across all three apps",
    ],
    challenges: [
      {
        title: "Three audiences, one design system",
        detail:
          "A component library serving a POS-style admin and a consumer app pulls in opposite directions. We kept primitives unopinionated and moved opinion into app-level composition.",
      },
      {
        title: "Server-state consistency across live updates",
        detail:
          "WebSocket events and React Query caches can disagree. Events were funneled through cache invalidation rather than direct state writes, keeping one source of truth.",
      },
    ],
    performance: [
      "React Query caching tuned per-resource to cut redundant fetches in high-frequency order views.",
      "Route-level code splitting keeps the customer app lean, so it never pays for admin code.",
    ],
    lessons: [
      "In multi-tenant systems, the data model is the product. UI mistakes are cheap to fix; tenancy mistakes are not.",
      "Owning modules end to end, from planning to production, taught me more than any amount of ticket work.",
    ],
  },
  {
    slug: "simple-patro",
    name: "Simple Patro",
    tagline: "Admin platform behind a production Nepali calendar",
    kind: "Commercial",
    featured: false,
    year: "2024",
    tech: ["React", "TypeScript", "REST APIs"],
    domains: ["SaaS"],
    overview:
      "The admin platform powering Simple Patro, a widely used Nepali calendar. It centralizes management of holidays, events, horoscopes and auspicious-time data published daily to a large audience.",
    problem:
      "Culturally sensitive, time-critical content such as panchang data, holidays and horoscopes was being managed through fragile manual processes where a single wrong date ships to thousands of users.",
    solution:
      "Structured admin workflows for daily publishing: validated forms, reusable components and state management designed around the operators' actual daily routine, making the correct action the fast one.",
    architecture: [
      "Reusable form and table components with structured state management for maintainability.",
      "Validation at the edit boundary so bad data is caught before publish, not after.",
    ],
    features: [
      "Holiday, event and horoscope content pipelines",
      "Auspicious-time (sait) workflow management",
      "Publish-safe editing with validation",
    ],
    challenges: [
      {
        title: "Accuracy as the core feature",
        detail:
          "Calendar data has zero tolerance for error, because it's checked against tradition, not just schemas. The UI surfaces context (adjacent days, previous years) so operators verify while they edit.",
      },
    ],
    performance: [
      "Component reuse cut new-workflow build time significantly as the admin surface grew.",
    ],
    lessons: [
      "Admin tools deserve product thinking. Operators are users too, and their efficiency compounds daily.",
    ],
  },
  {
    slug: "ciy",
    name: "CIY, Cook It Yourself",
    tagline: "Full-stack recipe platform with personalized discovery",
    kind: "Personal",
    featured: true,
    year: "2024",
    image: "/images/ciydark.png",
    live: "https://www.ciy.sangat.tech/",
    github: "https://github.com/sangatsharma/Recipe-recommender",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    domains: ["Full-stack", "AI"],
    overview:
      "A full-stack recipe platform where people discover, share and save recipes, with recommendations that adapt to taste. Built end to end: PostgreSQL schema, Express REST API and a React frontend.",
    problem:
      "Recipe sites optimize for SEO walls of text, not for the person deciding what to cook tonight. I wanted discovery that starts from your ingredients and preferences instead of a search box.",
    solution:
      "A community-driven platform with ingredient-aware recommendations, clean recipe authoring and a reading experience designed for the kitchen: large type, clear steps, no clutter.",
    architecture: [
      "Express REST API over PostgreSQL with a normalized recipe/ingredient schema that makes ingredient-based querying cheap.",
      "JWT-based auth with route-level guards on the API.",
      "React frontend with route-based code splitting; images lazy-loaded and sized responsively.",
    ],
    features: [
      "Ingredient-aware recipe recommendations",
      "Recipe authoring with images and structured steps",
      "User profiles, favorites and social sharing",
      "Dark and light reading modes",
    ],
    challenges: [
      {
        title: "Modeling recipes relationally",
        detail:
          "Free-text ingredients kill recommendations. A normalized ingredient vocabulary with a join table made 'what can I cook with X' a fast indexed query instead of a text search.",
      },
    ],
    performance: [
      "Indexed ingredient joins keep recommendation queries fast as the recipe count grows.",
      "Responsive image sizing and lazy loading keep the feed light on mobile connections.",
    ],
    lessons: [
      "Owning the schema changes how you build UI, because half of frontend complexity is usually a data-model problem in disguise.",
    ],
  },
  {
    slug: "easyurl",
    name: "EasyURL",
    tagline: "URL shortener with analytics, built for speed",
    kind: "Personal",
    featured: false,
    year: "2024",
    image: "/images/easyurl.png",
    live: "https://www.easyurl.me/",
    github: "https://github.com/sangatsharma",
    tech: ["Node.js", "Express", "Redis", "React"],
    domains: ["Full-stack"],
    overview:
      "A production URL shortener with click analytics. The interesting part isn't shortening a URL. It's doing the redirect fast enough that nobody notices the hop.",
    problem:
      "A redirect service lives or dies on latency: every millisecond sits directly in a user's navigation path, and cold database lookups on the hot path are unacceptable.",
    solution:
      "Redis-backed lookup on the redirect path with the database as source of truth: reads hit cache, while writes and analytics happen off the critical path.",
    architecture: [
      "Redis cache-aside on the redirect hot path; persistent store behind it.",
      "Async analytics recording so click tracking never delays the redirect.",
    ],
    features: [
      "Instant short-link creation with custom aliases",
      "Click analytics per link",
      "QR code generation",
    ],
    challenges: [
      {
        title: "Analytics without latency",
        detail:
          "Recording a click before redirecting adds user-visible delay. Analytics writes were made fire-and-forget with periodic reconciliation, keeping redirects at cache speed.",
      },
    ],
    performance: [
      "Cache-hit redirects respond in single-digit milliseconds server-side.",
    ],
    lessons: [
      "Small systems are the best place to practice hot-path thinking, because the constraints are real but the blast radius is yours.",
    ],
  },
  {
    slug: "tictactoe",
    name: "Tic-Tac-Toe Online",
    tagline: "Real-time multiplayer game with an unbeatable AI",
    kind: "Personal",
    featured: true,
    year: "2023",
    image: "/images/tictactoe.png",
    live: "https://sangatsharma.github.io/Tictactoe/",
    github: "https://github.com/sangatsharma/Tictactoe",
    tech: ["JavaScript", "WebSockets", "PWA", "Minimax"],
    domains: ["Real-time", "AI"],
    overview:
      "An online Tic-Tac-Toe that looks simple and isn't: real-time multiplayer over WebSockets, an unbeatable AI via Minimax with alpha-beta pruning, and PWA support for offline play.",
    problem:
      "The game is trivial; the engineering isn't. Two players on flaky connections must see one consistent board, and the AI must be provably unbeatable without freezing the UI.",
    solution:
      "Server-authoritative game state over WebSockets, where clients render and the server decides, plus a pruned Minimax engine that evaluates instantly. Installable as a PWA with a full offline mode against the AI.",
    architecture: [
      "WebSocket rooms with server-authoritative state to prevent desync and cheating.",
      "Minimax with alpha-beta pruning: optimal play with a fraction of the search space.",
      "Service worker for offline play and installability.",
    ],
    features: [
      "Real-time online multiplayer with rooms",
      "Unbeatable AI opponent",
      "Offline play as an installable PWA",
      "Sound effects and cross-device responsive UI",
    ],
    challenges: [
      {
        title: "Consistency over flaky connections",
        detail:
          "Letting clients apply moves optimistically caused desync on reconnect. Moving to server-authoritative state with client rendering eliminated an entire class of bugs.",
      },
    ],
    performance: [
      "Alpha-beta pruning cuts Minimax evaluation enough to respond instantly even on low-end phones.",
    ],
    lessons: [
      "'Simple' games are a perfect harness for distributed-systems fundamentals: authority, reconciliation and latency.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
