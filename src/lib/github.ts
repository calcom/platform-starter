import "server-only";

const REPO = "calcom/platform-starter";

export async function getRepoStars(): Promise<number | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600, tags: ["github-stars"] },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export function formatStarCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10_000) {
    const formatted = (count / 1000).toFixed(1);
    return `${formatted.replace(/\.0$/, "")}k`;
  }
  return `${Math.round(count / 1000)}k`;
}
