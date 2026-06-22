// Single source of truth — all section content is derived from the résumé here.

export const profile = {
  name: "Sangat Sharma",
  firstName: "Sangat",
  lastName: "Sharma",
  role: "Frontend Developer",
  title: "Software Engineer",
  location: "Pokhara, Nepal",
  email: "sangatsharma2@gmail.com",
  github: "https://github.com/sangatsharma",
  linkedin: "https://www.linkedin.com/in/sangatsharma",
  resume: "/Sangat_Resume.pdf",
  years: "2+",
  // Hero statement, split for masked, line-by-line reveals.
  statement: ["I build", "scalable web", "experiences."],
  tagline:
    "Software Engineer with 2+ years building scalable web applications — focused on logic, performance, and solving complex UI and system-level problems through clean architecture.",
  summary:
    "Frontend engineer who turns messy operational workflows into clean, fast interfaces. I care about logic building, performance optimization, and the architecture that keeps products maintainable as they grow.",
};

export type Experience = {
  company: string;
  role: string;
  level: string;
  period: string;
  location: string;
  metaphor: string; // short visual metaphor for the work
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "BlackTech",
    role: "Frontend Developer",
    level: "Mid-Level",
    period: "Apr 2026 — Present",
    location: "Pokhara, Nepal",
    metaphor: "Ownership",
    points: [
      "Built and maintained production-grade products used by thousands of users across complex operational workflows.",
      "Led frontend delivery across multiple modules while owning day-to-day technical execution and project operations.",
      "Mentored juniors and interns through structured task breakdowns, code reviews, and hands-on guidance.",
      "Managed repositories, branching strategies, and release readiness for reliable, predictable production cycles.",
    ],
  },
  {
    company: "BlackTech",
    role: "Frontend Developer",
    level: "Junior",
    period: "Mar 2025 — Mar 2026",
    location: "Pokhara, Nepal",
    metaphor: "Systems",
    points: [
      "Led overall frontend for a consultancy CRM — solution design, implementation, and continuous delivery across releases.",
      "Built a micro-frontend, monorepo-based system with multiple interconnected apps for visa, CRM, and workforce portals.",
      "Partnered with clients in weekly requirements/SRS discussions, translating business needs into iterative Agile delivery.",
      "Streamlined complex visa pipelines with strict compliance, traceability, and high operational throughput.",
      "Integrated WebSocket-based real-time updates and a chat system for synchronized system-wide interactions.",
    ],
  },
  {
    company: "BlackTech",
    role: "Frontend Developer",
    level: "Intern",
    period: "Nov 2024 — Mar 2025",
    location: "Pokhara, Nepal",
    metaphor: "Foundations",
    points: [
      "Contributed to a construction-sector ERP with multi-portal workflows (admin, business, customer) and role-based access.",
      "Implemented real-time activity and support-ticket updates using WebSocket events.",
      "Improved reporting reliability by fixing export and PDF generation for payroll and timesheet workflows.",
      "Strengthened Xero-integrated invoicing and optimized Redux Toolkit / RTK Query caching for UI responsiveness.",
    ],
  },
];

export type Project = {
  name: string;
  kind: string;
  metaphor: string;
  blurb: string;
  stack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    name: "RestroX",
    kind: "Restaurant Management System",
    metaphor: "Multi-tenant",
    blurb:
      "Multi-tenant restaurant platform spanning Product Owner, Client Admin, and Customer apps inside a single monorepo.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Zustand", "React Query"],
    highlights: [
      "Scalable, responsive UIs on a shared design system for consistent cross-module UX.",
      "Efficient state/data with Zustand, Context API, and React Query for optimized caching.",
      "Payment gateway workflows and WebSocket real-time features for live transactions and notifications.",
    ],
  },
  {
    name: "Simple Patro",
    kind: "Nepali Calendar",
    metaphor: "Cultural data",
    blurb:
      "Admin platform for a widely-used Nepali calendar — holidays, events, horoscope, and auspicious-time workflows.",
    stack: ["React", "TypeScript", "Tailwind", "State management"],
    highlights: [
      "Admin UI workflows for time-sensitive cultural content with daily publishing accuracy.",
      "Reusable, structured components improving maintainability and scalability of the admin system.",
      "Collaborated to improve data integrity and streamline operational workflows.",
    ],
  },
  {
    name: "Tic-Tac-Toe",
    kind: "Online Multiplayer Game",
    metaphor: "Algorithms",
    blurb:
      "Responsive multiplayer game with an unbeatable AI, real-time play, and offline support.",
    stack: ["JavaScript", "WebSocket", "PWA", "Minimax"],
    highlights: [
      "Unbeatable AI using Minimax with Alpha-Beta pruning.",
      "Real-time multiplayer over WebSocket with smooth UI and sound effects.",
      "PWA support for offline play across devices.",
    ],
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "TanStack",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "Vercel", "Render", "Postman", "Redis Insight", "Android Studio", "Agile"],
  },
  {
    title: "Architecture",
    items: [
      "Component-based",
      "Micro-frontends",
      "Monorepo",
      "Multi-tenant systems",
    ],
  },
  {
    title: "Leadership",
    items: ["Mentorship", "Ownership", "Problem Solving", "Collaboration", "Communication"],
  },
];

// Most prominent skills — rendered larger / glowing in the constellation.
export const coreSkills = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "TanStack",
  "Micro-frontends",
  "Monorepo",
];

export type Achievement = {
  label: string;
  detail: string;
  meta: string;
  date: string;
};

export const achievements: Achievement[] = [
  {
    label: "Best Performer of the Year",
    detail: "Rapid Riser",
    meta: "BlackTech",
    date: "Mar 2026",
  },
  {
    label: "Dean's List Award",
    detail: "Bachelor Degree",
    meta: "Pokhara University",
    date: "Feb 2026",
  },
  {
    label: "Registered General Engineer",
    detail: "Nepal Engineering Council (NEC)",
    meta: "Certification",
    date: "Jan 2026",
  },
  {
    label: "Frontend Development Libraries",
    detail: "FreeCodeCamp",
    meta: "Certification",
    date: "Aug 2024",
  },
];

// Headline stats for the impact band.
export const stats = [
  { value: "2+", label: "Years building production web apps" },
  { value: "3.71", label: "CGPA / 4.0 — Software Engineering" },
  { value: "1000s", label: "Users across shipped products" },
  { value: "3", label: "BlackTech levels: Intern → Mid" },
];

export const education = {
  degree: "Bachelor of Software Engineering",
  school: "Pokhara University",
  period: "Jul 2021 — Jul 2025",
  cgpa: "3.71 / 4.0",
  location: "Pokhara, Kaski, Nepal",
};

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];
