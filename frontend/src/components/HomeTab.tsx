import { GitHubRepoCard } from './GitHubRepoCard';
import { TextField } from './Form';
import type { GitHubRepo } from '../api/repos';
import type { UseQueryResult } from '@tanstack/react-query';

interface HomeTabProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  recentReposQuery: UseQueryResult<GitHubRepo[], Error>;
  popularReposQuery: UseQueryResult<GitHubRepo[], Error>;
  searchReposQuery: UseQueryResult<GitHubRepo[], Error>;
  favoriteIds: Set<string>;
  onFavorite: (id: string) => void;
  onUnfavorite: (id: string) => void;
  isLoggedIn: boolean;
}

export function HomeTab({ 
  searchQuery, 
  onSearchQueryChange, 
  recentReposQuery, 
  popularReposQuery, 
  searchReposQuery, 
  favoriteIds, 
  onFavorite, 
  onUnfavorite,
  isLoggedIn 
}: HomeTabProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 md:mb-8 flex justify-center px-2">
        <div className="w-full max-w-2xl">
          <TextField
            label=""
            value={searchQuery}
            onChange={onSearchQueryChange}
            placeholder="🔍 Buscar repositórios por nome, tecnologia ou funcionalidade..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8 md:space-y-12">
        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">
              📋 Resultados da busca para "{searchQuery}"
            </h2>
            {searchReposQuery.isLoading ? (
              <div className="text-center py-8 text-slate-500">🔄 Buscando...</div>
            ) : searchReposQuery.error ? (
              <div className="text-center py-8 text-red-500">
                ❌ Erro ao buscar repositórios
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(searchReposQuery.data ?? []).map((repo) => (
                  <GitHubRepoCard
                    key={repo.id}
                    repo={repo}
                    isFavorited={favoriteIds.has(repo.id)}
                    onFavorite={() => onFavorite(repo.id)}
                    onUnfavorite={() => onUnfavorite(repo.id)}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            )}
            {searchReposQuery.data?.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                🔍 Nenhum repositório encontrado
              </div>
            )}
          </div>
        )}

        {/* Recent Repos */}
        {!searchQuery && (
          <div>
            <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">🆕 Recém Adicionados</h2>
            {recentReposQuery.isLoading ? (
              <div className="text-center py-8 text-slate-500">🔄 Carregando...</div>
            ) : recentReposQuery.error ? (
              <div className="text-center py-8 text-red-500">
                ❌ Erro ao carregar repositórios
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(recentReposQuery.data ?? []).map((repo) => (
                  <GitHubRepoCard
                    key={repo.id}
                    repo={repo}
                    isFavorited={favoriteIds.has(repo.id)}
                    onFavorite={() => onFavorite(repo.id)}
                    onUnfavorite={() => onUnfavorite(repo.id)}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Popular Repos */}
        {!searchQuery && (
          <div>
            <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">🔥 Mais Favoritados</h2>
            {popularReposQuery.isLoading ? (
              <div className="text-center py-8 text-slate-500">🔄 Carregando...</div>
            ) : popularReposQuery.error ? (
              <div className="text-center py-8 text-red-500">
                ❌ Erro ao carregar repositórios
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(popularReposQuery.data ?? []).map((repo) => (
                  <GitHubRepoCard
                    key={repo.id}
                    repo={repo}
                    isFavorited={favoriteIds.has(repo.id)}
                    onFavorite={() => onFavorite(repo.id)}
                    onUnfavorite={() => onUnfavorite(repo.id)}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}