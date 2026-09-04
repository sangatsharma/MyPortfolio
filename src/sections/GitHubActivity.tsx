import CountUp from "@/components/ui/CountUp";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getGitHubData } from "@/lib/github";
import { site } from "@/data/site";
import { ArrowUpRight, Star } from "lucide-react";

const LEVELS = [
  "bg-white/[0.05]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

/** GitHub's language colors for the repo list dots; accent for the long tail. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
};

/**
 * Server component: contribution data, rhythm stats and top repositories
 * are fetched at revalidation time and ship as static HTML — zero client
 * JS, no layout shift, no third-party widget. Renders nothing if the
 * contributions API is unreachable; the repo grid hides itself alone.
 */
export default async function GitHubActivity() {
  const data = await getGitHubData();
  if (!data) return null;

  // Column-per-week layout, oldest week first
  const weeks: (typeof data.days)[] = [];
  for (let i = 0; i < data.days.length; i += 7) {
    weeks.push(data.days.slice(i, i + 7));
  }

  const stats = [
    { value: data.totalContributions, format: true, label: "contributions in the last year" },
    { value: data.longestStreak, suffix: " days", label: "longest daily streak" },
    { value: data.busiestDay, label: "contributions on the busiest day" },
    { value: data.activeDayShare, suffix: "%", label: "of days active this year" },
  ];

  return (
    <section id="github" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Open source · @${site.githubUser}`}
          title="Code in public, consistently."
          description="The rhythm behind the case studies: daily commits, personal builds and experiments, all visible."
        />

        <Reveal>
          <div className="rounded-2xl border border-line bg-base-soft p-6 md:p-8">
            <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-semibold text-ink tabular-nums">
                    <CountUp to={s.value} suffix={s.suffix ?? ""} format={s.format ?? false} />
                  </p>
                  <p className="mt-1 text-base text-ink-faint">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto pb-1">
              <div className="flex w-max gap-[3px]" role="img" aria-label="GitHub contribution graph, last twelve months">
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
            <p className="mt-4 font-mono text-[11px] text-ink-faint">last 12 months · updated twice daily</p>

            {data.topRepos.length > 0 && (
              <div className="mt-8 border-t border-line pt-7">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                    {data.reposArePinned ? "Pinned repositories" : "Selected repositories"}
                  </p>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent-strong"
                  >
                    all {data.publicRepos} repos <ArrowUpRight size={14} />
                  </a>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {data.topRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-xl border border-line p-5 transition-colors hover:border-accent/40"
                      >
                        <p className="flex items-center gap-2 font-mono text-sm text-ink transition-colors group-hover:text-accent-strong">
                          {repo.name}
                          <ArrowUpRight
                            size={13}
                            className="text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                          />
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                          {repo.description ?? "No description yet. The code speaks for itself."}
                        </p>
                        <p className="mt-auto flex items-center gap-4 pt-4 text-xs text-ink-faint">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                aria-hidden
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    repo.languageColor ??
                                    LANGUAGE_COLORS[repo.language] ??
                                    "#5b5bd6",
                                }}
                              />
                              {repo.language}
                            </span>
                          )}
                          {repo.stars > 0 && (
                            <span className="flex items-center gap-1">
                              <Star size={12} aria-hidden />
                              {repo.stars}
                            </span>
                          )}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
