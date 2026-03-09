import type { GithubRepo, GithubUser } from "@/types/portfolio";

const OPENAI_API = "https://api.openai.com/v1/responses";

function buildGeneratedBioFallback(user: GithubUser, repos: GithubRepo[], topLanguage: string): string {
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

export async function generatePortfolioBio(
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

