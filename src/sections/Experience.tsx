"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience, education, certifications } from "@/data/experience";

/**
 * Vertical timeline. The intern → mid-level arc in ~18 months is the
 * story here, so the timeline draws itself as the reader scrolls it —
 * the growing line is the progression, scrubbed in both directions.
 */
export default function Experience() {
  return (
    <section id="experience" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience · Nov 2024 to present"
          title="Intern to technical lead in eighteen months."
          description="Every promotion earned on shipped software: production platforms, client-facing delivery and a team that got faster because I was on it."
        />

        {experience.map((company) => (
          <div key={company.name}>
            <Reveal className="mb-10 flex items-baseline gap-3">
              <h3 className="text-lg font-semibold text-ink">{company.name}</h3>
              <span className="text-sm text-ink-faint">{company.location}</span>
            </Reveal>

            <RoleTimeline>
              {company.roles.map((role, i) => (
                <Reveal as="li" key={role.title} delay={i * 0.08} className="relative">
                  {/* Timeline node — accent for the current role */}
                  <span
                    aria-hidden
                    className={
                      "absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 md:-left-[53px] " +
                      (i === 0 ? "border-accent bg-accent/30" : "border-line-strong bg-base")
                    }
                  />
                  <p className="mb-1 font-mono text-[13px] text-ink-faint">{role.period}</p>
                  <h4 className="text-xl font-medium text-ink">{role.title}</h4>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">
                    {role.summary}
                  </p>
                  <ul className="mt-4 max-w-2xl space-y-2.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-base leading-relaxed text-ink-muted">
                        <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </RoleTimeline>
          </div>
        ))}

        <Reveal className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-2" delay={0.1}>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              Education
            </p>
            <p className="text-lg font-medium text-ink">{education.degree}</p>
            <p className="mt-1 text-base text-ink-muted">
              {education.school} · {education.period}
            </p>
            <p className="mt-1 text-base text-ink-faint">{education.detail}</p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              Certifications
            </p>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c.name} className="text-base">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-ink-faint">
                    {" "}
                    · {c.org}, {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Role list with a progression line drawn by scroll: the tip tracks a
 * point ~2/3 down the viewport, staying just below the entry being read.
 * Static full line under reduced motion.
 */
function RoleTimeline({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.7"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-1 space-y-14 pl-8 md:pl-12">
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
      <motion.span
        aria-hidden
        style={reduce ? undefined : { scaleY: drawn }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-strong to-accent"
      />
      {children}
    </ol>
  );
}
