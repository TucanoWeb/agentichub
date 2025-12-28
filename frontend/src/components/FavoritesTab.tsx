import { GitHubRepoCard } from './GitHubRepoCard';
import type { GitHubRepo } from '../api/repos';
import type { UseQueryResult } from '@tanstack/react-query';

interface FavoritesTabProps {
  favoritesQuery: UseQueryResult<GitHubRepo[], Error>;
  onUnfavorite: (id: string) => void;
}

export function FavoritesTab({ favoritesQuery, onUnfavorite }: FavoritesTabProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">⭐ Meus Favoritos</h2>
      {favoritesQuery.isLoading ? (
        <div className="text-center py-8 text-slate-500">🔄 Carregando favoritos...</div>
      ) : favoritesQuery.error ? (
        <div className="text-center py-8 text-red-500">❌ Erro ao carregar favoritos</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {(favoritesQuery.data ?? []).map((repo) => (
            <GitHubRepoCard
              key={repo.id}
              repo={repo}
              isFavorited={true}
              onFavorite={() => {}} // não usado
              onUnfavorite={() => onUnfavorite(repo.id)}
            />
          ))}
        </div>
      )}
      {favoritesQuery.data?.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          ⭐ Nenhum favorito ainda. Explore repositórios e adicione seus favoritos!
        </div>
      )}
    </div>
  );
}