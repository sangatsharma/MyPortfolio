import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

/**
 * Skills grouped by how they're actually used, each with a one-line
 * rationale — a stack section that reads like judgment, not keywords.
 */
export default function Stack() {
  return (
    <section id="stack" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stack · everything here has shipped"
          title="Tools chosen per problem, not by habit."
          description="Every item here has shipped to production. Grouped by the role it plays, with a note on why."
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <h3 className="text-lg font-medium text-ink">{group.label}</h3>
              <p className="mb-4 mt-1 text-base text-ink-faint">{group.note}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-base-soft px-3.5 py-2 text-base text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
