import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ScrubText from "@/components/ui/ScrubText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { principles } from "@/data/skills";

/**
 * The manifesto leads, revealed word by word at reading pace as the
 * scroll advances; the supporting detail and principles follow quietly.
 */
export default function About() {
  return (
    <section id="about" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="About · Pokhara, Nepal"
          title="Engineering is a craft. I treat it like one."
        />

        <ScrubText
          className="mb-16 max-w-4xl text-2xl font-medium leading-snug tracking-tight text-ink md:text-[2rem]"
          text="For the last two years my code has been running in places where failure is expensive: visa pipelines with legal compliance requirements, restaurant platforms processing live orders, calendar systems that thousands of people check before starting their day."
        />

        {/* Paragraphs share a row, principles share a row — nothing overflows
            its neighbor the way the old text/cards side-by-side split did */}
        <Reveal className="grid gap-8 text-lg leading-relaxed text-ink-muted lg:grid-cols-2 lg:gap-16">
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <div className="p-6">
                  <h3 className="mb-1.5 text-lg font-medium text-ink">{p.title}</h3>
                  <p className="text-base leading-relaxed text-ink-muted">{p.detail}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
