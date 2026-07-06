import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { principles } from "@/data/skills";

export default function About() {
  return (
    <section id="about" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="About · Pokhara, Nepal"
          title="Engineering is a craft. I treat it like one."
        />

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              I&apos;m a software engineer from Pokhara, Nepal, and for the last two years my code has
              been running in places where failure is expensive: visa pipelines with legal
              compliance requirements, restaurant platforms processing live orders, calendar systems
              that thousands of people check before starting their day.
            </p>
            <p>
              That environment shapes how I work. I design frontend architecture the way backend
              engineers design systems — thinking about state ownership, data flow, failure modes
              and what happens when requirements change six months from now. Micro-frontends,
              monorepos and multi-tenant systems aren&apos;t buzzwords to me; they&apos;re decisions
              I&apos;ve made, defended and lived with in production.
            </p>
            <p>
              I also believe the best engineers multiply their teams. I mentor juniors and interns,
              run code reviews that teach rather than gatekeep, and sit directly with clients to
              turn ambiguous requirements into shippable scope. The award on my desk says
              &ldquo;Rapid Riser&rdquo; — I got there by making the people around me faster too.
            </p>
          </Reveal>

          <div className="grid content-start gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <SpotlightCard>
                  <div className="p-6">
                    <h3 className="mb-1.5 text-lg font-medium text-ink">{p.title}</h3>
                    <p className="text-base leading-relaxed text-ink-muted">{p.detail}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
