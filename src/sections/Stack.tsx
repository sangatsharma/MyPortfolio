import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { skillGroups, type SkillGroup } from "@/data/skills";

/** Tailwind needs literal class names — no template spans. */
const SPAN_CLASS: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

/**
 * Groups flow into bento rows of two, then three. Within a row each
 * card's width is proportional to how many skills it holds, so the
 * grid itself reads as a weighting: more surface = more tools there.
 */
function bentoRows(groups: SkillGroup[]): { group: SkillGroup; span: number }[] {
  const rows: SkillGroup[][] = [];
  for (let i = 0, take = 2; i < groups.length; i += take, take = take === 2 ? 3 : 2) {
    rows.push(groups.slice(i, i + take));
  }
  return rows.flatMap((row) => {
    const total = row.reduce((sum, g) => sum + g.items.length, 0);
    let used = 0;
    return row.map((group, i) => {
      // Last card absorbs rounding so every row closes at 12 columns
      const span =
        i === row.length - 1 ? 12 - used : Math.round((group.items.length / total) * 12);
      used += span;
      return { group, span };
    });
  });
}

export default function Stack() {
  const cells = bentoRows(skillGroups);

  return (
    <section id="stack" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stack · everything here has shipped"
          title="Tools chosen per problem, not by habit."
          description="Every item here has shipped to production. Grouped by the role it plays — the wider the card, the more of the day it covers."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {cells.map(({ group, span }, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.06}
              className={SPAN_CLASS[span] ?? "lg:col-span-4"}
            >
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium text-ink">{group.label}</h3>
                    <span className="font-mono text-[11px] text-ink-faint">
                      {group.items.length}
                    </span>
                  </div>
                  <p className="mb-5 mt-1 text-base text-ink-faint">{group.note}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-line bg-base px-3.5 py-2 text-base text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
