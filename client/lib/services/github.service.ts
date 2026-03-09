import type { GithubRepo, GithubUser } from "@/types/portfolio";

const GITHUB_API = "https://api.github.com";

type GithubApiErrorPayload = { message?: string };

export class GithubApiError extends Error {
  status: number;
  remaining: string | null;
  details: string;

  constructor(status: number, details: string, remaining: string | null) {
    super(`GitHub API request failed: ${status}`);
    this.status = status;
    this.remaining = remaining;
    this.details = details;
  }
}

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
    const remaining = response.headers.get("x-ratelimit-remaining");
    let details = "";

    try {
      const payload = (await response.json()) as GithubApiErrorPayload;
      details = typeof payload.message === "string" ? payload.message : "";
    } catch {
      details = "";
    }

    throw new GithubApiError(response.status, details, remaining);
  }

  return (await response.json()) as T;
}

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  return fetchGithub<GithubUser>(`/users/${username}`);
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  return fetchGithub<GithubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
}

export function getGithubErrorMessage(error: unknown): string {
  if (error instanceof GithubApiError) {
    const details = error.details.toLowerCase();
    const isRateLimited = error.remaining === "0" || details.includes("rate limit");

    if (isRateLimited) {
      return "GitHub API rate limit reached. Add a valid `GITHUB_TOKEN` in .env.local and try again.";
    }
    if (error.status === 404) {
      return "GitHub user not found. Check the username and try again.";
    }
    if (error.status === 401) {
      return "GitHub authentication failed. Verify your `GITHUB_TOKEN` value and retry.";
    }
    if (error.status === 403) {
      return "GitHub denied the request. Check your token permissions or try again later.";
    }

    return `GitHub request failed (status ${error.status}). Please try again.`;
  }

  if (error instanceof Error && error.message === "Invalid GitHub username") {
    return "Invalid GitHub username format.";
  }

  if (error instanceof TypeError && error.message.toLowerCase().includes("fetch failed")) {
    return "Network request to GitHub failed. Check your internet connection and try again.";
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return `Unexpected error: ${error.message}`;
  }

  return "Could not generate portfolio for this GitHub account.";
}

