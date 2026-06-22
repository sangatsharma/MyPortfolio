import Section from "../components/Section";
import { Reveal } from "../components/Reveal";
import ScrollHighlightText from "../components/ScrollHighlightText";
import { profile, education, stats } from "../data/resume";

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="Identity">
      <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <ScrollHighlightText
            text={profile.summary}
            className="display text-balance text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.25]"
          />

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="bg-[var(--bg)] p-5"
              >
                <div className="text-gradient text-3xl font-bold tracking-tight md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Journey rail: Intern → Junior → Mid */}
        <Reveal x={30} y={0} className="lg:pl-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted">
              The journey
            </h3>
            <ol className="relative mt-6 space-y-7 before:absolute before:left-[5px] before:top-1 before:h-[calc(100%-1.5rem)] before:w-px before:bg-line">
              {[
                { t: "Intern", d: "Nov 2024", note: "ERP, real-time, reporting" },
                { t: "Junior", d: "Mar 2025", note: "Owned a CRM monorepo" },
                { t: "Mid-Level", d: "Apr 2026", note: "Leads delivery + mentors" },
              ].map((step, i) => (
                <li key={step.t} className="relative pl-7">
                  <span
                    className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                      i === 2
                        ? "border-accent-2 bg-accent-2"
                        : "border-line bg-[var(--bg)]"
                    }`}
                  />
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold">{step.t}</span>
                    <span className="text-xs text-muted">{step.d}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{step.note}</p>
                </li>
              ))}
            </ol>

            <div className="my-6 hairline" />

            <h3 className="text-sm font-semibold tracking-wide text-muted">
              Education
            </h3>
            <p className="mt-3 font-medium">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted">
              <span>{education.period}</span>
              <span className="text-gradient font-semibold">
                CGPA {education.cgpa}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
