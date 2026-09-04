export interface Role {
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface Company {
  name: string;
  location: string;
  roles: Role[];
}

/**
 * Roles are ordered newest-first; the UI renders them as a single
 * timeline to show progression (intern → junior → mid in ~18 months).
 */
export const experience: Company[] = [
  {
    name: "BlackTech",
    location: "Pokhara, Nepal",
    roles: [
      {
        title: "Frontend Developer · Mid-Level",
        period: "Apr 2026 to Present",
        summary:
          "Leading frontend delivery across multiple production modules while mentoring the team that ships them.",
        highlights: [
          "Own day-to-day technical execution for products used by thousands of users across complex operational workflows.",
          "Mentor juniors and interns through structured task breakdowns, code reviews and pairing, raising delivery consistency across the team.",
          "Manage branching strategy, release readiness and repository health for predictable production cycles.",
          "Named Best Performer of the Year (Rapid Riser) within two years of joining.",
        ],
        tags: ["Technical leadership", "Code review", "Release management", "Mentorship"],
      },
      {
        title: "Frontend Developer · Junior",
        period: "Mar 2025 to Mar 2026",
        summary:
          "Led frontend development of a consultancy CRM, from solution design through continuous delivery across releases.",
        highlights: [
          "Architected a micro-frontend, monorepo-based system of interconnected apps covering visa processing, CRM and workforce operations across separately deployed portals.",
          "Sat with clients weekly for requirements and SRS discussions, turning business needs into iterative delivery.",
          "Streamlined multi-role visa pipelines with strict compliance, audit trails and activity tracking for full operational traceability.",
          "Built a lead-ingestion pipeline from the public website into the CRM, with cross-repo data flow and lead-to-candidate conversion.",
          "Integrated WebSocket-driven real-time updates and chat for synchronized, system-wide interactions.",
        ],
        tags: ["Micro-frontends", "Monorepo", "WebSockets", "Client-facing"],
      },
      {
        title: "Frontend Developer · Intern",
        period: "Nov 2024 to Mar 2025",
        summary:
          "Contributed to a construction-sector ERP with multi-portal, role-based workflows.",
        highlights: [
          "Improved role-based multi-workspace access across admin, business and customer portals.",
          "Shipped real-time activity and support-ticket updates over WebSocket events.",
          "Fixed export and PDF generation for payroll and timesheet reporting; hardened Xero-integrated invoicing flows.",
          "Optimized Redux Toolkit / RTK Query usage for better caching, data consistency and UI responsiveness.",
        ],
        tags: ["ERP", "RTK Query", "Xero", "Real-time"],
      },
    ],
  },
];

export const education = {
  degree: "B.E. Software Engineering",
  school: "Pokhara University",
  period: "2021 to 2025",
  detail: "CGPA 3.71 / 4 · Dean's List Award",
};

export const certifications = [
  { name: "Registered General Engineer", org: "Nepal Engineering Council", year: "2026" },
  { name: "Frontend Development Libraries", org: "freeCodeCamp", year: "2024" },
];
