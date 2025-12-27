import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGitHubRepoInfo, type GitHubRepo } from '../api/repos';
import { AIPromptModal } from './AIPromptModal';

export interface GitHubRepoCardProps {
  repo: GitHubRepo;
  isFavorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
}

export function GitHubRepoCard({ repo, isFavorited, onFavorite, onUnfavorite }: GitHubRepoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const githubInfoQuery = useQuery({
    queryKey: ['github-repo', repo.github_url],
    queryFn: () => getGitHubRepoInfo(repo.github_url),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (replaces cacheTime)
  });

  const githubInfo = githubInfoQuery.data;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-lg transition-all hover:shadow-xl backdrop-blur-sm">
      {/* Header with repo info */}
      <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          {githubInfo && (
            <>
              <img
                className="h-8 w-8 rounded-full"
                src={githubInfo.owner.avatar_url}
                alt={githubInfo.owner.login}
              />
              <div className="flex-1 min-w-0">
                <div className="truncate font-bold text-white">{githubInfo.name}</div>
                <div className="text-xs text-indigo-100">@{githubInfo.owner.login}</div>
              </div>
              <div className="text-xs font-semibold">
                ⭐ {githubInfo.stargazers_count.toLocaleString()}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body with description and actions */}
      <div className="p-4 space-y-3">
        <div className="text-sm text-slate-700 leading-relaxed">
          {githubInfoQuery.isLoading && (
            <div className="flex items-center gap-2 text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#36E2B2] border-t-transparent"></div>
              Carregando informações...
            </div>
          )}
          {githubInfoQuery.error && (
            <div className="text-red-500">❌ Erro ao carregar dados do GitHub</div>
          )}
          {githubInfo && (
            githubInfo.description || 'Sem descrição disponível.'
          )}
        </div>

        {/* Tags */}
        {repo.tags && (
          <div className="flex flex-wrap gap-1">
            {repo.tags.split(',').map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-[#A5F3FC] px-2 py-0.5 text-xs font-medium text-[#2F58CD]"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <button
            className="text-[#36E2B2] hover:text-[#2F58CD] text-sm font-medium underline"
            onClick={() => window.open(repo.github_url, '_blank')}
          >
            🔗 Ver no GitHub
          </button>
          
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white hover:from-[#36E2B2] hover:to-[#2F58CD] transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              🤖 IA
            </button>
            
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isFavorited
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-[#A5F3FC] text-[#2F58CD] hover:bg-[#36E2B2] hover:text-white'
              }`}
              onClick={isFavorited ? onUnfavorite : onFavorite}
            >
              {isFavorited ? '💔 Desfavoritar' : '⭐ Favoritar'}
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <AIPromptModal
          repo={repo}
          githubInfo={githubInfo}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}