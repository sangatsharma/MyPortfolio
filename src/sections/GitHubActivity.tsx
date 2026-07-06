import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getGitHubData } from "@/lib/github";
import { site } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

const LEVELS = [
  "bg-white/[0.05]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

/**
 * Server component: contribution data is fetched at revalidation time and
 * the graph ships as static HTML — zero client JS, no layout shift, no
 * third-party widget. Renders nothing if the API is unreachable.
 */
export default async function GitHubActivity() {
  const data = await getGitHubData();
  if (!data) return null;

  // Column-per-week layout, oldest week first
  const weeks: (typeof data.days)[] = [];
  for (let i = 0; i < data.days.length; i += 7) {
    weeks.push(data.days.slice(i, i + 7));
  }

  return (
    <section id="github" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Open source · @${site.githubUser}`}
          title="Code in public, consistently."
        />

        <Reveal>
          <div className="rounded-2xl border border-line bg-base-soft p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-x-10 gap-y-3">
              <div>
                <p className="text-3xl font-semibold text-ink tabular-nums">
                  {data.totalContributions.toLocaleString()}
                </p>
                <p className="text-base text-ink-faint">contributions in the last year</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink tabular-nums">{data.publicRepos}</p>
                <p className="text-base text-ink-faint">public repositories</p>
              </div>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent-strong"
              >
                @{site.githubUser} <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="overflow-x-auto pb-1">
              <div className="flex w-max gap-[3px]" role="img" aria-label="GitHub contribution graph, last six months">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.count} contributions on ${day.date}`}
                        className={`h-3 w-3 rounded-[3px] ${LEVELS[Math.min(day.level, 4)]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] text-ink-faint">last 6 months · updated twice daily</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
