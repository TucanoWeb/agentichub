import { api } from "./client";

export interface GitHubRepo {
  id: string;
  github_url: string;
  tags: string;
  created_at: string;
  favorite_count?: number;
}

export interface FileStructureItem {
  name: string;
  type: 'file' | 'dir';
  path: string;
  size: number;
  download_url: string;
  children?: FileStructureItem[];
}

export interface AIContext {
  primary_language: string;
  description: string;
  topics: string[];
  has_package_json: boolean;
  main_files: string[];
  estimated_stack: string[];
  folder_structure_summary: string[];
  architecture_insights: {
    has_src_folder: boolean;
    has_components: boolean;
    has_api_routes: boolean;
    has_tests: boolean;
    monorepo_structure: boolean;
    explored_directories: Array<{
      name: string;
      file_count: number;
      main_files: string[];
    }>;
  };
}

export interface GitHubRepoDetail extends GitHubRepo {
  readme?: string;
  readme_file?: string | null;
  raw_base_url?: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  package_json?: any;
  file_structure?: FileStructureItem[];
  ai_context?: AIContext;
}

export interface GitHubApiRepo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubRepoLanguages {
  [language: string]: number;
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

export async function getGitHubRepoLanguages(githubUrl: string): Promise<GitHubRepoLanguages> {
  // eslint-disable-next-line no-useless-escape
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "");

  const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/languages`);
  if (!response.ok) return {};

  return response.json();
}

export function extractOwnerRepo(githubUrl: string): { owner: string; repo: string } {
  // eslint-disable-next-line no-useless-escape
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  return { owner, repo: repo.replace(/\.git$/, "") };
}
