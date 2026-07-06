import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience, education, certifications } from "@/data/experience";

/**
 * Vertical timeline. The intern → mid-level arc in ~18 months is the
 * story here, so roles are rendered as one continuous progression.
 */
export default function Experience() {
  return (
    <section id="experience" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience · Nov 2024 — present"
          title="Intern to technical lead in eighteen months."
          description="Every promotion earned on shipped software — production platforms, client-facing delivery and a team that got faster because I was on it."
        />

        {experience.map((company) => (
          <div key={company.name}>
            <Reveal className="mb-10 flex items-baseline gap-3">
              <h3 className="text-lg font-semibold text-ink">{company.name}</h3>
              <span className="text-sm text-ink-faint">{company.location}</span>
            </Reveal>

            <ol className="relative ml-1 space-y-14 border-l border-line pl-8 md:pl-12">
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
            </ol>
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
                    — {c.org}, {c.year}
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
