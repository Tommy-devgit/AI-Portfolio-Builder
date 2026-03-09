import type { GithubPortfolioData, GithubRepo } from "@/types/portfolio";
import { generatePortfolioBio } from "@/lib/services/generation.service";
import {
  fetchGithubRepos,
  fetchGithubUser,
  normalizeGithubUsername,
} from "@/lib/services/github.service";

function rankRepos(repos: GithubRepo[]): GithubRepo[] {
  return repos
    .filter((repo) => !repo.name.toLowerCase().includes(".github"))
    .sort((a, b) => {
      const scoreA = a.stargazers_count * 2 + a.forks_count;
      const scoreB = b.stargazers_count * 2 + b.forks_count;
      if (scoreA !== scoreB) return scoreB - scoreA;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
}

function extractTopLanguages(repos: GithubRepo[]): Array<{ language: string; count: number }> {
  const languageMap = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
  }

  return [...languageMap.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export async function getGithubPortfolioData(usernameInput: string): Promise<GithubPortfolioData> {
  const username = normalizeGithubUsername(usernameInput);
  if (!username) {
    throw new Error("Invalid GitHub username");
  }

  const [user, repos] = await Promise.all([fetchGithubUser(username), fetchGithubRepos(username)]);

  const filteredRepos = rankRepos(repos);
  const totalStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const topLanguages = extractTopLanguages(filteredRepos);
  const topLanguage = topLanguages[0]?.language || "JavaScript";
  const generatedBio = await generatePortfolioBio(user, filteredRepos, topLanguage);

  return {
    user,
    repos: filteredRepos,
    topLanguages,
    totalStars,
    totalForks,
    generatedBio,
  };
}

