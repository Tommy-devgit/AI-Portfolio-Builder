export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
};

export type GithubPortfolioData = {
  user: GithubUser;
  repos: GithubRepo[];
  topLanguages: Array<{ language: string; count: number }>;
  totalStars: number;
  totalForks: number;
  generatedBio: string;
};

const GITHUB_API = "https://api.github.com";
const OPENAI_API = "https://api.openai.com/v1/responses";

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export function normalizeGithubUsername(input: string): string | null {
  const value = input.trim().replace(/^@/, "");
  if (!value) return null;

  if (/^[a-zA-Z0-9-]{1,39}$/.test(value)) {
    return value;
  }

  try {
    const url = input.startsWith("http") ? new URL(input) : new URL(`https://${input}`);
    if (!url.hostname.toLowerCase().includes("github.com")) return null;

    const [username] = url.pathname.split("/").filter(Boolean);
    if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) return null;

    return username;
  } catch {
    return null;
  }
}

async function fetchGithub<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function buildGeneratedBioFallback(user: GithubUser, repos: GithubRepo[], topLanguage: string) {
  if (user.bio && user.bio.trim().length > 0) {
    return user.bio;
  }

  const repoCount = repos.length;
  const name = user.name || user.login;

  return `${name} builds and maintains ${repoCount}+ public repositories, with a strong focus on ${topLanguage}.`;
}

function topRepoSummary(repos: GithubRepo[]): string {
  return repos
    .slice(0, 5)
    .map(
      (repo, index) =>
        `${index + 1}. ${repo.name} | ${repo.language || "Unknown language"} | ${repo.stargazers_count} stars | ${repo.forks_count} forks`,
    )
    .join("\n");
}

function parseResponseOutputText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as { output_text?: unknown };
  if (typeof obj.output_text === "string" && obj.output_text.trim().length > 0) {
    return obj.output_text.trim();
  }
  return null;
}

async function buildGeneratedBio(
  user: GithubUser,
  repos: GithubRepo[],
  topLanguage: string,
): Promise<string> {
  const fallback = buildGeneratedBioFallback(user, repos, topLanguage);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallback;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const name = user.name || user.login;
  const location = user.location || "Unknown";
  const company = user.company || "Independent";
  const profileBio = user.bio || "No bio provided";

  try {
    const response = await fetch(OPENAI_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "You are a concise technical copywriter. Write exactly 2 sentences for a personal portfolio hero bio. Keep it factual and avoid hype.",
          },
          {
            role: "user",
            content: [
              `Name: ${name}`,
              `GitHub username: ${user.login}`,
              `Location: ${location}`,
              `Company: ${company}`,
              `Public repos: ${user.public_repos}`,
              `Followers: ${user.followers}`,
              `Top language: ${topLanguage}`,
              `Current profile bio: ${profileBio}`,
              "Top repositories:",
              topRepoSummary(repos),
            ].join("\n"),
          },
        ],
        temperature: 0.6,
        max_output_tokens: 140,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as unknown;
    return parseResponseOutputText(payload) || fallback;
  } catch {
    return fallback;
  }
}

export async function getGithubPortfolioData(usernameInput: string): Promise<GithubPortfolioData> {
  const username = normalizeGithubUsername(usernameInput);
  if (!username) {
    throw new Error("Invalid GitHub username");
  }

  const [user, repos] = await Promise.all([
    fetchGithub<GithubUser>(`/users/${username}`),
    fetchGithub<GithubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
  ]);

  const filteredRepos = repos
    .filter((repo) => !repo.name.toLowerCase().includes(".github"))
    .sort((a, b) => {
      const scoreA = a.stargazers_count * 2 + a.forks_count;
      const scoreB = b.stargazers_count * 2 + b.forks_count;
      if (scoreA !== scoreB) return scoreB - scoreA;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const totalStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const languageMap = new Map<string, number>();
  for (const repo of filteredRepos) {
    if (!repo.language) continue;
    languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
  }

  const topLanguages = [...languageMap.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const topLanguage = topLanguages[0]?.language || "JavaScript";

  const generatedBio = await buildGeneratedBio(user, filteredRepos, topLanguage);

  return {
    user,
    repos: filteredRepos,
    topLanguages,
    totalStars,
    totalForks,
    generatedBio,
  };
}
