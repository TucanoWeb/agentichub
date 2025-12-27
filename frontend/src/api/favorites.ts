import { api } from './client';
import type { GitHubRepo } from './repos';

export async function getFavorites(): Promise<GitHubRepo[]> {
  const response = await api.get('/favorites');
  return response.data.favorites;
}

export async function addToFavorites(repoId: string): Promise<void> {
  await api.post(`/favorites/${repoId}`);
}

export async function removeFromFavorites(repoId: string): Promise<void> {
  await api.delete(`/favorites/${repoId}`);
}

export async function checkIsFavorite(repoId: string): Promise<boolean> {
  const response = await api.get(`/favorites/check/${repoId}`);
  return response.data.is_favorite;
}