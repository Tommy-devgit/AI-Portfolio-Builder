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

