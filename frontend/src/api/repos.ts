import { api } from "./client";

export interface GitHubRepo {
  id: string;
  github_url: string;
  tags: string;
  created_at: string;
  favorite_count?: number;
}

export interface GitHubRepoDetail extends GitHubRepo {
  readme?: string;
  raw_base_url?: string;
}

export interface GitHubApiRepo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export async function getRecentRepos(): Promise<GitHubRepo[]> {
  const response = await api.get("/repos/recent");
  return response.data.repos;
}

export async function getPopularRepos(): Promise<GitHubRepo[]> {
  const response = await api.get("/repos/popular");
  return response.data.repos;
}

export async function searchRepos(query: string, limit = 50): Promise<GitHubRepo[]> {
  const response = await api.get("/repos/search", {
    params: { q: query, limit },
  });
  return response.data.repos;
}

export async function createRepo(input: { github_url: string; tags: string }): Promise<GitHubRepo> {
  const response = await api.post("/repos", input);
  return response.data.repo;
}

export async function fetchRepoForAgent(id: string): Promise<GitHubRepoDetail> {
  const response = await api.get("/fetch-blueprint", {
    params: { id },
  });
  return response.data;
}

// GitHub API integration (direct calls from frontend)
export async function getGitHubRepoInfo(githubUrl: string): Promise<GitHubApiRepo> {
  // eslint-disable-next-line no-useless-escape
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "");

  const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`);
  if (!response.ok) throw new Error("Repository not found");

  return response.json();
}

export function extractOwnerRepo(githubUrl: string): { owner: string; repo: string } {
  // eslint-disable-next-line no-useless-escape
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  return { owner, repo: repo.replace(/\.git$/, "") };
}
