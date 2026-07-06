import { site } from "@/data/site";

export interface ContributionDay {
  date: string;
  count: number;
  /** 0–4, GitHub's own intensity bucket. */
  level: number;
}

export interface GitHubData {
  totalContributions: number;
  /** Last ~26 weeks of days, oldest first. */
  days: ContributionDay[];
  publicRepos: number;
  followers: number;
}

const REVALIDATE = { next: { revalidate: 60 * 60 * 12 } } as const;

/**
 * Fetched at build/revalidate time on the server — the contribution graph
 * ships as pure HTML with zero client JS. Returns null on any failure so
 * the section degrades by disappearing instead of erroring.
 */
export async function getGitHubData(): Promise<GitHubData | null> {
  try {
    const [contribRes, userRes] = await Promise.all([
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
        REVALIDATE,
      ),
      fetch(`https://api.github.com/users/${site.githubUser}`, REVALIDATE),
    ]);
    if (!contribRes.ok) return null;

    const contrib = (await contribRes.json()) as {
      total: Record<string, number>;
      contributions: ContributionDay[];
    };
    const user = userRes.ok
      ? ((await userRes.json()) as { public_repos: number; followers: number })
      : { public_repos: 0, followers: 0 };

    const days = contrib.contributions.slice(-182);
    const totalContributions = Object.values(contrib.total).reduce((a, b) => a + b, 0);

    return {
      totalContributions,
      days,
      publicRepos: user.public_repos,
      followers: user.followers,
    };
  } catch {
    return null;
  }
}
