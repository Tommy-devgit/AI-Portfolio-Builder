import type { GithubRepo, GithubUser } from "@/types/portfolio";

const GITHUB_API = process.env.GITHUB_API_BASE_URL?.trim() || "https://api.github.com";
const NETWORK_RETRY_CODES = new Set(["ENOTFOUND", "EAI_AGAIN", "ECONNRESET", "ETIMEDOUT", "ECONNREFUSED"]);

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
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
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
    } catch (error) {
      lastError = error;
      const details = getNetworkCauseDetails(error);
      const shouldRetry = details?.code ? NETWORK_RETRY_CODES.has(details.code) : false;
      if (!shouldRetry || attempt === 1) {
        throw error;
      }
    }
  }

  throw lastError ?? new Error("Unknown GitHub fetch error");
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

  const networkDetails = getNetworkCauseDetails(error);
  if (networkDetails?.code === "ENOTFOUND") {
    return `DNS lookup failed for ${networkDetails.host}. Check internet/DNS or set GITHUB_API_BASE_URL in .env.local.`;
  }
  if (networkDetails?.code === "EAI_AGAIN") {
    return `Temporary DNS issue reaching ${networkDetails.host}. Retry in a moment or switch DNS.`;
  }
  if (networkDetails?.code && NETWORK_RETRY_CODES.has(networkDetails.code)) {
    return `Network error (${networkDetails.code}) while connecting to ${networkDetails.host}. Check VPN/proxy/firewall and retry.`;
  }

  if (error instanceof TypeError && error.message.toLowerCase().includes("fetch failed")) {
    return "Network request to GitHub failed. Check internet, DNS, VPN/proxy settings, and retry.";
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return `Unexpected error: ${error.message}`;
  }

  return "Could not generate portfolio for this GitHub account.";
}

function getNetworkCauseDetails(error: unknown): { code: string | null; host: string } | null {
  if (!(error instanceof Error)) return null;
  const cause = error.cause as { code?: unknown; hostname?: unknown } | undefined;
  const code = typeof cause?.code === "string" ? cause.code : null;
  const host = typeof cause?.hostname === "string" ? cause.hostname : "api.github.com";
  return { code, host };
}
