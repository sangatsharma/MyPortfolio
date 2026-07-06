export interface Note {
  title: string;
  summary: string;
  tag: string;
  readingTime: string;
  /** Notes without a URL render as "in progress" — honest, not a fake blog. */
  url?: string;
}

/**
 * Engineering notes drawn from production work. Rendered as a writing
 * section; entries gain URLs as they're published.
 */
export const notes: Note[] = [
  {
    title: "Micro-frontends without the chaos: shared contracts in a monorepo",
    summary:
      "What kept five independently deployed portals coherent for a year: versioned UI packages, typed API contracts, and treating architecture as a social agreement.",
    tag: "Architecture",
    readingTime: "8 min",
  },
  {
    title: "WebSockets and React Query can disagree — pick one source of truth",
    summary:
      "Real-time events writing directly into client state is a desync factory. Funneling socket events through cache invalidation fixed an entire bug class.",
    tag: "Real-time",
    readingTime: "6 min",
  },
  {
    title: "The redirect hot path: caching lessons from building a URL shortener",
    summary:
      "Every millisecond of a redirect sits inside someone's navigation. Cache-aside with Redis, fire-and-forget analytics, and measuring what users actually feel.",
    tag: "Performance",
    readingTime: "5 min",
  },
];
