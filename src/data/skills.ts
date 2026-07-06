export interface SkillGroup {
  label: string;
  /** One line on why this group matters — shown under the label. */
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Core",
    note: "The tools I ship production software with daily.",
    items: ["TypeScript", "React", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend & Data",
    note: "Enough backend to own features end to end.",
    items: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs", "WebSockets"],
  },
  {
    label: "State & Data Fetching",
    note: "Chosen per problem, not by habit.",
    items: ["TanStack Query", "Redux Toolkit / RTK Query", "Zustand", "React Context"],
  },
  {
    label: "Architecture",
    note: "Patterns I've applied on real production systems.",
    items: ["Micro-frontends", "Monorepos", "Multi-tenant systems", "Component-driven design", "Design systems"],
  },
  {
    label: "Practices",
    note: "How the work actually gets shipped.",
    items: ["Code review", "Agile delivery", "Mentorship", "Performance profiling", "Accessibility", "Git & release management"],
  },
];

export const principles = [
  {
    title: "Performance is a feature",
    detail: "Bundle discipline, caching strategy and hot-path thinking from the first commit — not as a launch-week panic.",
  },
  {
    title: "Architecture people can inherit",
    detail: "Code is read and extended far more than it's written. I optimize for the next engineer, including future me.",
  },
  {
    title: "The details users feel",
    detail: "Motion with purpose, states that never dead-end, interfaces that respond instantly. Quality is perceptible.",
  },
  {
    title: "Own the outcome",
    detail: "From client conversations to production releases — I take responsibility for shipping, not just for code.",
  },
];
