export type ProjectKind = "Commercial" | "Personal";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  kind: ProjectKind;
  featured: boolean;
  year: string;
  /**
   * Screenshots under /public, shown as a slideshow on the card and the
   * case-study hero. Convention: /images/projects/<slug>/01.png, 02.png, ...
   */
  images?: string[];
  /** Animated walkthrough (GIF) shown on the case-study page instead of the slideshow. */
  demo?: string;
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
    tagline:
      "Micro-frontend platform running visa pipelines for an international consultancy",
    kind: "Commercial",
    featured: true,
    year: "2025 to 2026",
    images: [1, 2, 3, 4, 5].map(
      (n) => `/images/projects/consultancy-crm/0${n}.png`,
    ),
    demo: "/images/projects/consultancy-crm/walkthrough.gif",
    tech: [
      "React",
      "TypeScript",
      "Monorepo",
      "Micro-frontends",
      "WebSockets",
      "OneSignal",
      "REST APIs",
    ],
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
      "OneSignal push notifications fired from the activity stream, so every tracked event also reaches staff outside the app.",
      "Lead-ingestion pipeline: public website → CRM with cross-repo data flow and lead-to-candidate conversion.",
    ],
    features: [
      "Multi-role visa pipelines with strict stage gating and partner hand-offs",
      "Activity tracking and audit flows on every pipeline mutation",
      "OneSignal push notifications triggered by every activity event",
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
    live: "https://www.restrox.com/np",
    images: [1, 2, 3, 4, 5].map((n) => `/images/projects/restrox/0${n}.png`),
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Electron.js",
      "Tailwind CSS",
      "Zustand",
      "React Query",
      "WebSockets",
    ],
    domains: ["SaaS", "Real-time"],
    overview:
      "A multi-tenant restaurant management platform spanning three applications (Product Owner, Client Admin and customer-facing) inside a monorepo with a shared design system. I built frontend modules across all three, gradually taking ownership through sprint planning, code reviews and production releases. I also independently designed and built the RestroX Electron desktop application end to end, covering system design, backend and user interface.",
    problem:
      "Restaurants juggle orders, tables, menus and payments across tools that don't talk to each other. RestroX needed one platform serving three very different audiences, namely platform operators, restaurant admins and diners, without building three separate products.",
    solution:
      "A monorepo of three apps on a shared design system, so a diner's order, an admin's dashboard and the platform owner's controls all speak the same visual and data language. Real-time WebSocket features keep orders and operational notifications live across roles.",
    architecture: [
      "Monorepo with three deployable apps sharing one design system for cross-module UX consistency.",
      "Zustand for local UI state, React Query for server state, a deliberate split that kept caching predictable.",
      "Payment gateway integration wired into order workflows with real-time status updates.",
      "Electron desktop application, designed and built solo end to end, from system design through backend and UI.",
    ],
    features: [
      "Tenant-scoped admin dashboards for menus, tables and staff",
      "Live order tracking with WebSocket-driven notifications",
      "Integrated payment gateway workflows",
      "Shared component library across all three apps",
      "Desktop application built with Electron",
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
    featured: true,
    year: "2024",
    live: "https://www.simplepatro.com/",
    // Public calendar in light and dark, alternating: month, day detail, year
    images: [1, 2, 3, 4, 5, 6].map(
      (n) => `/images/projects/simple-patro/0${n}.png`,
    ),
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
    slug: "healthpost",
    name: "HealthPost Management System",
    tagline:
      "Offline-first, bilingual records platform for Nepal's community health posts",
    kind: "Personal",
    featured: true,
    year: "2025",
    live: "https://healthpost.vercel.app",
    // Admin, health post and patient portals
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (n) => `/images/projects/healthpost/0${n}.png`,
    ),
    github: "https://github.com/sangatsharma/healthpost-management-frontend",
    tech: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "IndexedDB",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
    ],
    domains: ["Full-stack", "Architecture"],
    overview:
      "A full-stack platform for running Nepal's community health posts: client registration, OPD tickets, referrals, staff management and a patient portal for personal records. Built as my final-year B.E. Software Engineering project, end to end from the Prisma schema and Express API to a bilingual Next.js frontend.",
    problem:
      "Health posts in rural Nepal keep records on paper and work on internet that drops for hours. Any digital system has to keep working offline, speak Nepali, use Bikram Sambat dates and respect who on staff is allowed to see what.",
    solution:
      "Three portals in one app (Admin, Health Post and Patient), selected by role after login, with an offline layer underneath: cached pages, a persisted query cache for reads and a queued write path that staff review and sync once the connection returns.",
    architecture: [
      "Service worker pre-caches the app shell and every portal route in both locales, serving network-first with a cache fallback.",
      "TanStack Query cache persisted to IndexedDB for 24 hours so loaded clients, OPD visits and referrals stay readable offline.",
      "Axios interceptor queues offline writes in IndexedDB, serializing FormData file uploads to base64 so attachments survive the queue.",
      "Express 5 REST API over PostgreSQL and Prisma with cookie-based JWT auth, an OTP login step and Zod-validated requests.",
    ],
    features: [
      "Multi-step client registration and OPD visits with vitals, prescriptions and printable tickets",
      "Referrals with printable referral slips and incoming referral handling",
      "Staff roles mirroring real positions (Health Assistant, ANM, Lab Technician, FCHV) with resource-level permissions",
      "English and Nepali UI, Bikram Sambat dates and Devanagari PDF export",
      "Patient portal for medical history, reports, medications, vaccinations and reminders",
    ],
    challenges: [
      {
        title: "Writes that happen offline",
        detail:
          "Silently replaying queued requests risks duplicate or stale records. Queued registrations and OPD records surface under an Offline tab so staff review each one before syncing, and synced entries leave the queue.",
      },
      {
        title: "Nepali as a first-class locale",
        detail:
          "Localization went beyond translated strings: localized numerals, a B.S. date picker, API messages returned in the user's language and PDFs with an embedded Devanagari font so printed tickets read correctly.",
      },
    ],
    performance: [
      "Persisted query cache means revisiting a client record loads instantly, online or not.",
      "Network-first page caching keeps content fresh when online without blocking staff when it isn't.",
    ],
    lessons: [
      "Offline-first is a product decision before it is a technical one: deciding who resolves a conflicting record matters more than the queue itself.",
      "Modeling permissions after real job titles made access rules easy for health-post staff to reason about.",
    ],
  },
  {
    slug: "escpos-printer-emulator",
    name: "ESC/POS Printer Emulator",
    tagline: "Open-source network receipt printer emulator, published on npm",
    kind: "Personal",
    featured: true,
    year: "2026",
    live: "https://www.npmjs.com/package/escpos-printer-emulator",
    github: "https://github.com/sangatsharma/escpos-printer-emulator",
    // Live viewer (dark): restaurant invoice, its end with payment QR and cut, decoded commands, kitchen ticket and its copy split by a cut
    images: [1, 2, 3, 4].map(
      (n) => `/images/projects/escpos-printer-emulator/0${n}.png`,
    ),
    tech: [
      "Node.js",
      "TypeScript",
      "TCP sockets",
      "React",
      "Vite",
      "Server-Sent Events",
    ],
    domains: ["Real-time", "Architecture"],
    overview:
      "A fake network receipt printer for developing and testing ESC/POS printing without hardware. It listens on raw TCP port 9100 like a real printer, interprets the byte stream the way printer firmware does and renders exactly what would print in a live web viewer. Published on npm and runnable with a single npx command.",
    problem:
      "Testing receipt and kitchen printing for POS apps meant wasting paper on a physical printer sitting next to your desk, and bugs in the raw bytes only showed up once printed. Several printers at once, on different IPs, was out of reach.",
    solution:
      "An emulator that behaves like the firmware rather than a pretty preview: printer state carries across jobs, commands split across TCP packets are reassembled and unsupported commands fail the way a real head would. Any app, driver or library that prints to a network printer works unchanged.",
    architecture: [
      "Pure interpreter core (no server dependencies) that turns ESC/POS bytes into a positioned display list per ticket.",
      "One TCP listener per configured printer, each on its own IP and port, queuing connections like real hardware.",
      "HTTP API with Server-Sent Events streams jobs live to a React and Vite viewer.",
      "CLI, library API and job history stored as raw bytes plus rendered JSON.",
    ],
    features: [
      "Text styles, code pages and GBK double-byte Kanji",
      "Raster and column images, QR, PDF417, DataMatrix and all common 1D barcodes",
      "Paper cuts at the blade offset, cash drawer kicks, beeper and status replies on the socket",
      "Thermal and dot-matrix profiles in 58mm and 80mm widths",
      "Multiple printers from one printers.json config",
    ],
    challenges: [
      {
        title: "Emulating firmware, not a spec",
        detail:
          "Real printers have quirks: alignment latches on the first character of a line, state leaks between jobs and bytes without a final line feed print with the next job. Reproducing these is what makes byte-level bugs show up the way they would on paper.",
      },
      {
        title: "Clone printer variants",
        detail:
          "Popular Xprinter and Bixolon style clones differ from Epson on commands like the beeper. The interpreter supports both variants so apps tested against it behave on the hardware customers actually buy.",
      },
    ],
    performance: [
      "Commands split across TCP packets are reassembled without buffering whole jobs before rendering.",
      "Interpreter and TCP and HTTP behaviour covered by node:test suites, with generated sample jobs shipped in the package.",
    ],
    lessons: [
      "Publishing to npm forces good boundaries: a clean core, a small CLI and documentation someone else can follow without asking you.",
    ],
  },
  {
    slug: "ciy",
    name: "CIY, Cook It Yourself",
    tagline: "Full-stack recipe platform with personalized discovery",
    kind: "Personal",
    featured: false,
    year: "2024",
    images: ["/images/ciydark.png", "/images/ciylight.png"],
    live: "https://recipe-recommender-five.vercel.app/",
    github: "https://github.com/sangatsharma/Recipe-recommender",
    tech: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
    ],
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
    // Dashboard with links, QR codes and clicks; a fresh short link; the home page
    images: [1, 2, 3].map((n) => `/images/projects/easyurl/0${n}.png`),
    live: "https://easy-url-frontend.vercel.app/",
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
    // Vs the AI: a deliberate loss, then a draw (25 fps, ~1.6 MB, light enough for the card too)
    images: ["/images/projects/tictactoe/walkthrough.gif"],
    demo: "/images/projects/tictactoe/walkthrough.gif",
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
