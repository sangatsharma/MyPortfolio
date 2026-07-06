import { site } from "@/data/site";

export interface ContributionDay {
  date: string;
  count: number;
  /** 0–4, GitHub's own intensity bucket. */
  level: number;
}

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  /** GitHub's own language color when the source provides it. */
  languageColor: string | null;
  stars: number;
  url: string;
}

export interface GitHubData {
  totalContributions: number;
  /** Last 52 weeks of days, oldest first. */
  days: ContributionDay[];
  publicRepos: number;
  followers: number;
  /** Longest run of consecutive contribution days in the last year. */
  longestStreak: number;
  /** Highest single-day contribution count in the last year. */
  busiestDay: number;
  /** Share of the last year's days with at least one contribution, 0–100. */
  activeDayShare: number;
  /** Profile-pinned repos when available, else top-starred originals. */
  topRepos: Repo[];
  /** True when topRepos are the profile's actual pins. */
  reposArePinned: boolean;
}

const REVALIDATE = { next: { revalidate: 60 * 60 * 12 } } as const;

/**
 * Fetched at build/revalidate time on the server — the contribution graph
 * ships as pure HTML with zero client JS. Returns null on any failure so
 * the section degrades by disappearing instead of erroring.
 */
/**
 * The REST API doesn't expose profile pins, so they come from the
 * pinned.berrysauce.dev community mirror — same trust level as the
 * jogruber contributions API this section already depends on.
 */
async function getPinnedRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(`https://pinned.berrysauce.dev/get/${site.githubUser}`, REVALIDATE);
    if (!res.ok) return [];
    const pins = (await res.json()) as {
      author: string;
      name: string;
      description: string;
      language: string;
      languageColor: string;
      stars: number;
    }[];
    return pins.map((p) => ({
      name: p.name,
      description: p.description.trim() || null,
      language: p.language || null,
      languageColor: p.languageColor || null,
      stars: p.stars,
      url: `https://github.com/${p.author}/${p.name}`,
    }));
  } catch {
    return [];
  }
}

export async function getGitHubData(): Promise<GitHubData | null> {
  try {
    const [contribRes, userRes, reposRes, pinnedRepos] = await Promise.all([
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
        REVALIDATE,
      ),
      fetch(`https://api.github.com/users/${site.githubUser}`, REVALIDATE),
      fetch(
        `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed`,
        REVALIDATE,
      ),
      getPinnedRepos(),
    ]);
    if (!contribRes.ok) return null;

    const contrib = (await contribRes.json()) as {
      total: Record<string, number>;
      contributions: ContributionDay[];
    };
    const user = userRes.ok
      ? ((await userRes.json()) as { public_repos: number; followers: number })
      : { public_repos: 0, followers: 0 };

    // 52 whole weeks so the column chunking stays even
    const days = contrib.contributions.slice(-364);
    const totalContributions = Object.values(contrib.total).reduce((a, b) => a + b, 0);

    // Rhythm stats over the full year of days, not just the rendered window
    const year = contrib.contributions;
    let longestStreak = 0;
    let streak = 0;
    let busiestDay = 0;
    let activeDays = 0;
    for (const day of year) {
      if (day.count > 0) {
        streak += 1;
        activeDays += 1;
        if (streak > longestStreak) longestStreak = streak;
        if (day.count > busiestDay) busiestDay = day.count;
      } else {
        streak = 0;
      }
    }

    // Profile pins are the user's own curation; the starred heuristic is
    // only the fallback for when the pins mirror is unreachable
    let topRepos = pinnedRepos;
    const reposArePinned = pinnedRepos.length > 0;
    if (!reposArePinned && reposRes.ok) {
      const repos = (await reposRes.json()) as {
        name: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        html_url: string;
        fork: boolean;
      }[];
      // Only originals that bothered to describe themselves — filters out
      // scratch repos ("practise") that stars alone would surface
      topRepos = repos
        .filter((r) => !r.fork && (r.description?.trim().length ?? 0) >= 10)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          languageColor: null,
          stars: r.stargazers_count,
          url: r.html_url,
        }));
    }

    return {
      totalContributions,
      days,
      publicRepos: user.public_repos,
      followers: user.followers,
      longestStreak,
      busiestDay,
      activeDayShare: Math.round((activeDays / year.length) * 100),
      topRepos,
      reposArePinned,
    };
  } catch {
    return null;
  }
}
