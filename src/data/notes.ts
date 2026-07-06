export interface NoteSection {
  heading: string;
  body: string[];
  /** Optional short mono snippet rendered after the body paragraphs. */
  code?: { label: string; snippet: string };
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  readingTime: string;
  /** Publication date, ISO. */
  date: string;
  intro: string[];
  sections: NoteSection[];
  takeaways: string[];
}

/**
 * Engineering notes drawn from production work — full articles,
 * rendered at /notes/[slug]. Content only; presentation lives in the page.
 */
export const notes: Note[] = [
  {
    slug: "micro-frontends-shared-contracts",
    title: "Micro-frontends without the chaos: shared contracts in a monorepo",
    summary:
      "What kept five independently deployed portals coherent for a year: versioned UI packages, typed API contracts, and treating architecture as a social agreement.",
    tag: "Architecture",
    readingTime: "8 min",
    date: "2026-05-14",
    intro: [
      "Micro-frontends have a reputation problem, and it's earned. Most write-ups either sell you the dream — independent teams shipping independently, forever — or the horror story: five design systems, three React versions, and a shell app nobody wants to touch. I spent a year leading the frontend of a platform that ran visa pipelines for an international consultancy, split across independently deployed portals: CRM, visa operations, workforce management. It worked. Not because we picked the right framework, but because we treated the architecture as a set of contracts — and enforced them where drift actually starts.",
      "This is what survived a year of weekly requirement changes, and what I'd keep doing.",
    ],
    sections: [
      {
        heading: "Split by business domain, not by page",
        body: [
          "The first decision that mattered: each app in the monorepo maps to a business domain with its own release cadence and its own operators. The CRM team's counselors never touch visa stage gating; visa officers never see lead capture. Splitting there means a deploy of one portal is genuinely low-risk to the others — which is the entire point of micro-frontends. If your split doesn't follow real organizational seams, you inherit all the coordination cost with none of the independence.",
          "We kept everything in one monorepo. That sounds like it defeats the purpose — isn't the dream separate repos? In practice the monorepo is what made independence safe. Every portal builds against the same commit of the shared packages, so 'works on my branch' and 'works in production' are the same statement. Independent deployment, shared history.",
        ],
      },
      {
        heading: "Three packages carry all the coherence",
        body: [
          "Coherence across the portals came from exactly three shared packages, each owning one kind of drift:",
          "The UI package owns visual drift. Buttons, tables, form fields, layout primitives — every portal renders from the same components, so the platform reads as one product even though it deploys as several. The rule that made it work: portals never style shared components, they compose them. The moment a portal forks a button 'just this once', you have two design systems with extra steps.",
          "The API-contract package owns data drift. Every request and response type that crosses a portal boundary lives here, generated into TypeScript that all apps import. When the backend renamed a field on the visa-stage payload, the compiler broke every consumer at build time — in the monorepo, before any deploy. That single property — cross-portal breakage is a compile error, not a production incident — paid for the whole architecture.",
          "The auth package owns session drift. Login, token refresh, role checks: one implementation, because the fastest way to create a security bug is to have three teams each interpret 'role-based access' slightly differently.",
        ],
        code: {
          label: "The dependency rule, in one direction",
          snippet:
            "apps/crm        ──┐\napps/visa-ops   ──┼──▶  packages/ui\napps/workforce  ──┘     packages/api-contracts\n                        packages/auth\n\n// packages never import from apps.\n// apps never import from each other.",
        },
      },
      {
        heading: "Versioning inside a monorepo still matters",
        body: [
          "The subtle failure mode of shared packages is the forced march: a breaking change to the UI package that makes every portal upgrade today, whether their release schedule likes it or not. We versioned shared packages inside the monorepo and let portals adopt majors on their own cadence — a portal shipping a client demo this week could pin the previous major while the others moved.",
          "That flexibility has a cost: someone has to burn down the version spread, or you're maintaining three majors forever. We capped it — no portal more than one major behind — and made the upgrade part of normal sprint work, not a special project. Boring, explicit, effective.",
        ],
      },
      {
        heading: "The architecture is a social agreement",
        body: [
          "Here's the part no framework gives you: every rule above is trivially breakable by one developer having a bad Friday. Nothing technically stops a portal importing from another portal, or copy-pasting a shared component to 'move fast'. The architecture holds because the team agrees it holds — the tooling just makes the agreement visible. Lint rules blocked cross-app imports, CI failed on contract mismatches, and code review treated a fork of a shared component as a design discussion, not a diff.",
          "I sat in weekly SRS meetings with the client, and half the value of the shared-contract setup showed up there: when a requirement touched two portals, the contract package told us exactly what would break and where. Scoping stopped being guesswork. That's the honest sales pitch for this architecture — not that it makes frontends independent, but that it makes their dependencies impossible to ignore.",
        ],
      },
    ],
    takeaways: [
      "Split micro-frontends along business domains with genuinely different release cadences — or don't split at all.",
      "Centralize exactly the things that drift: visual language, API types, auth. Everything else stays local to the portal.",
      "Make cross-portal breakage a compile error. Typed contracts in a monorepo are the cheapest insurance you can buy.",
      "Version shared packages even in a monorepo, and cap how far portals can lag.",
      "Enforce the rules socially and mechanically — lint rules and CI make the agreement visible, code review keeps it alive.",
    ],
  },
  {
    slug: "websockets-react-query-source-of-truth",
    title: "WebSockets and React Query can disagree — pick one source of truth",
    summary:
      "Real-time events writing directly into client state is a desync factory. Funneling socket events through cache invalidation fixed an entire bug class.",
    tag: "Real-time",
    readingTime: "6 min",
    date: "2026-03-02",
    intro: [
      "The bug reports all looked different. A visa application showing stage three on one screen and stage four on another. A chat thread with a message that vanished after refresh. A pipeline board that disagreed with the detail view it linked to. Different screens, different features — same root cause. We had two systems that both believed they owned client state: React Query, hydrating from REST, and a WebSocket layer, pushing live updates straight into components.",
      "Every screen that subscribed to both was a race condition with a UI attached.",
    ],
    sections: [
      {
        heading: "How the desync actually happens",
        body: [
          "The seductive pattern is the direct write: a socket event arrives — 'application moved to stage four' — and the handler writes it into local state or patches the query cache by hand. It demos beautifully. The update is instant.",
          "Then reality arrives in three flavors. Ordering: a REST refetch that started before the socket event resolves after it, and overwrites newer data with older. Coverage: the socket event patches the detail view's cache entry but misses the three list views that also render that application. Reconnection: the socket drops for forty seconds on hotel Wi-Fi, and every update sent in that window simply never happened as far as the client knows.",
          "Each of those produced bugs we could reproduce only sometimes, on some screens — the most expensive kind to fix one at a time.",
        ],
      },
      {
        heading: "Demote the socket from writer to messenger",
        body: [
          "The fix was a demotion. The server stopped being a second writer of client state and became a notifier: socket events stopped carrying authoritative payloads and started carrying hints — 'something about application 4123 changed'. The handler does exactly one thing: invalidate the relevant queries. React Query refetches through the same REST path everything else uses, and the cache — the single source of truth — updates once, consistently, for every subscribed view.",          "Ordering bugs disappear because the refetch always returns current truth, not an event snapshot. Coverage bugs disappear because invalidation fans out to every query that touches the entity, list views included. Reconnection collapses to one rule: on reconnect, invalidate what you were watching. Missed events don't need replaying — the next fetch is the replay.",
        ],
        code: {
          label: "The whole integration, more or less",
          snippet:
            "socket.on(\"entity:changed\", ({ type, id }) => {\n  queryClient.invalidateQueries({ queryKey: [type, id] });\n  queryClient.invalidateQueries({ queryKey: [type, \"list\"] });\n});\n\nsocket.on(\"reconnect\", () => {\n  queryClient.invalidateQueries({ predicate: isLiveQuery });\n});",
        },
      },
      {
        heading: "The trade-off, priced honestly",
        body: [
          "You pay one extra round-trip per update — the notification, then the refetch. For our pipeline dashboards, an update landing 200ms later was invisible; an update that was wrong was a support ticket. We kept direct socket payloads in exactly one place: chat, where the message object is immutable, append-only, and rendered in a single component. That's the honest boundary — direct writes are fine when the data can't be stale-overwritten and has one consumer. Everywhere data is shared, mutable, and multi-view, the invalidation path won.",
          "The deeper lesson generalizes past WebSockets: every piece of client state needs exactly one writer. The moment two systems can both say what's true, the question isn't whether they'll disagree — it's which screen your users will notice it on first.",
        ],
      },
    ],
    takeaways: [
      "Socket events are notifications, not state. Let them trigger invalidation; let one fetch path own truth.",
      "Direct cache writes from sockets create ordering, coverage, and reconnection bugs that appear intermittently across unrelated screens.",
      "Reconnection logic collapses to 'invalidate watched queries' — no event replay needed.",
      "Reserve direct payload writes for immutable, single-consumer data like chat messages.",
      "One writer per piece of state — that rule outlives any particular library.",
    ],
  },
  {
    slug: "redirect-hot-path-caching",
    title: "The redirect hot path: caching lessons from building a URL shortener",
    summary:
      "Every millisecond of a redirect sits inside someone's navigation. Cache-aside with Redis, fire-and-forget analytics, and measuring what users actually feel.",
    tag: "Performance",
    readingTime: "5 min",
    date: "2026-01-20",
    intro: [
      "A URL shortener is a deceptively good performance teacher because it has exactly one hot path, and that path sits inside the worst possible place: a human's navigation. When someone clicks a short link, your latency is added to a page load they're already waiting on. Nobody sees your UI. The redirect is the product.",
      "Building EasyURL taught me more about caching discipline than platforms a hundred times its size, precisely because there was nowhere to hide.",
    ],
    sections: [
      {
        heading: "Cache-aside, because misses must be survivable",
        body: [
          "The redirect lookup is a single key-to-URL mapping — the textbook case for Redis in front of the database. We used cache-aside rather than anything fancier: check Redis, miss, read the database, write Redis with a TTL, redirect. The reason isn't elegance, it's failure behavior. With cache-aside, Redis going down degrades you to database latency — slower, alive. Patterns where the cache is the only reader of truth turn a cache outage into a product outage.",
          "Two details did the real work. Short links follow a power law — a tiny fraction of links take almost all the traffic — so even a modest cache holds nearly every hot key, and TTL expiry barely matters for hit rate. And negative caching mattered more than I expected: bots and typos hammer nonexistent slugs, and without caching the 'not found' answer, your misses go straight to the database in exactly the pattern an attacker would choose.",
        ],
      },
      {
        heading: "Analytics must never block the redirect",
        body: [
          "Every redirect logs a click — timestamp, referrer, rough geolocation. The naive version awaits the analytics write before redirecting, which means a slow analytics insert makes someone's page load slower. That's backwards: the user gets nothing from that write. Analytics became fire-and-forget — respond with the 301 immediately, record the click after the response is already gone.",
          "Fire-and-forget forces an honest question: what happens when the write fails? For click analytics the answer is 'we lose one click', which is fine — and saying so out loud is the difference between a design decision and an accident. If the data were billing, the answer changes and so does the architecture. Deciding what you're allowed to lose is the actual engineering.",
        ],
        code: {
          label: "The hot path, shaped by priority",
          snippet:
            "const cached = await redis.get(slug);\nif (cached === NOT_FOUND) return res.status(404).render(notFound);\nif (cached) {\n  res.redirect(301, cached);       // user's wait ends here\n  recordClick(slug, req).catch(log); // everything after is ours\n  return;\n}",
        },
      },
      {
        heading: "Measure the click, not the server",
        body: [
          "My first benchmark was server processing time, and it said we were fast. It was also the wrong number. The user experiences DNS, TLS, the request, my lookup, and then the full load of the destination page. Measuring from the click taught me where the real budget went — and that a 301 with proper cache headers lets browsers and CDNs skip my server entirely on repeat clicks, which is the cheapest millisecond there is: the request that never arrives.",
          "The habit that stuck: state the latency budget for the whole journey, then spend it where the user feels it. Optimizing the part you happen to control is comfortable. Optimizing the part the user experiences is the job.",
        ],
      },
    ],
    takeaways: [
      "Choose cache patterns by their failure mode first — cache-aside degrades, cache-as-truth dies.",
      "Cache negative results. Bots and typos will find your misses in exactly the worst pattern.",
      "Nothing the user doesn't benefit from belongs before the response. Analytics is fire-and-forget, with data loss priced explicitly.",
      "Measure latency from the user's click, not your server's clock.",
      "The cheapest request is the one proper HTTP caching prevents from ever reaching you.",
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
