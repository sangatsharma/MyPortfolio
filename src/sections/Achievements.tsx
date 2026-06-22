import Section from "../components/Section";
import { Reveal } from "../components/Reveal";
import { achievements } from "../data/resume";

export default function Achievements() {
  return (
    <Section id="achievements" index="05" eyebrow="Achievements & Impact">
      <Reveal className="mb-12 max-w-2xl">
        <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">
          Recognised for <span className="text-gradient">shipping</span> and rising fast.
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal
            key={a.label}
            delay={i * 0.07}
            className="group relative bg-[var(--bg)] p-7 transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                {a.meta}
              </span>
              <span className="text-gradient text-sm font-semibold">{a.date}</span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{a.label}</h3>
            <p className="mt-1 text-sm text-muted">{a.detail}</p>
            <span className="mt-6 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
