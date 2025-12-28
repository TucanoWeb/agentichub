import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGitHubRepoInfo, getGitHubRepoLanguages, type GitHubRepo } from '../api/repos';
import { AIPromptModal } from './AIPromptModal';

// Language colors based on GitHub's language colors
const languageColors: { [key: string]: string } = {
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'C#': '#239120',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#fa7343',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'Shell': '#89e051',
  'HTML': '#e34c26',
  'CSS': '#1572B6',
  'SCSS': '#c6538c',
  'Vue': '#41b883',
  'React': '#61dafb',
  'Jupyter Notebook': '#DA5B0B',
  'Dockerfile': '#384d54',
  'YAML': '#cb171e',
  'JSON': '#292929',
  'XML': '#0060ac',
  'SQL': '#e38c00',
  'R': '#198CE7',
  'MATLAB': '#e16737',
  'Objective-C': '#438eff',
  'Scala': '#c22d40',
  'Lua': '#000080',
  'Perl': '#0298c3',
  'Haskell': '#5e5086',
  'Assembly': '#6E4C13',
  'Makefile': '#427819',
};

function getLanguageColor(language: string): string {
  if (languageColors[language]) {
    return languageColors[language];
  }
  
  // Generate consistent color based on language name
  let hash = 0;
  for (let i = 0; i < language.length; i++) {
    hash = language.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 50%)`;
}

export interface GitHubRepoCardProps {
  repo: GitHubRepo;
  isFavorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
  isLoggedIn: boolean;
}

export function GitHubRepoCard({ repo, isFavorited, onFavorite, onUnfavorite, isLoggedIn }: GitHubRepoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const githubInfoQuery = useQuery({
    queryKey: ['github-repo', repo.github_url],
    queryFn: () => getGitHubRepoInfo(repo.github_url),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (replaces cacheTime)
  });

  const languagesQuery = useQuery({
    queryKey: ['github-languages', repo.github_url],
    queryFn: () => getGitHubRepoLanguages(repo.github_url),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const githubInfo = githubInfoQuery.data;
  const languages = languagesQuery.data;

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

        {/* Languages/Technologies */}
        {languages && Object.keys(languages).length > 0 && (
          <div className="space-y-2 bg-slate-50 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              💻 Composição do Código
            </h4>
            <div className="space-y-2">
              {/* Total bytes for percentage calculation */}
              {(() => {
                const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);
                const allLanguages = Object.entries(languages)
                  .map(([lang, bytes]) => ({
                    language: lang,
                    bytes,
                    percentage: (bytes / totalBytes) * 100
                  }))
                  .filter(item => item.percentage >= 0.5) // Show languages with 0.5% or more
                  .sort((a, b) => b.percentage - a.percentage);

                const hasMany = allLanguages.length > 4;
                const displayLanguages = hasMany ? allLanguages.slice(0, 3) : allLanguages.slice(0, 6);

                return (
                  <div className="space-y-2">
                    {/* Main languages with bars */}
                    {displayLanguages.map(({ language, percentage }) => (
                      <div key={language} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                              style={{ 
                                backgroundColor: getLanguageColor(language)
                              }}
                            ></div>
                            <span className="text-xs text-slate-700 font-medium truncate">{language}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono tabular-nums">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: getLanguageColor(language),
                              width: `${percentage}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    {/* Compact view for remaining languages */}
                    {hasMany && allLanguages.length > 3 && (
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex flex-wrap gap-1">
                          {allLanguages.slice(3).map(({ language, percentage }) => (
                            <div
                              key={language}
                              className="inline-flex items-center gap-1 bg-white rounded-full px-2 py-1 text-xs border border-slate-200"
                            >
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: getLanguageColor(language) }}
                              ></div>
                              <span className="text-slate-600 font-medium">{language}</span>
                              <span className="text-slate-400 font-mono text-[10px]">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!hasMany && Object.keys(languages).length > 6 && (
                      <div className="text-xs text-slate-400 text-center mt-2 pt-2 border-t border-slate-200">
                        +{Object.keys(languages).length - 6} outras linguagens menores
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {languagesQuery.isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-50 rounded-lg p-3">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#36E2B2] border-t-transparent"></div>
            Analisando composição do código...
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
            
            <div className="relative group">
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  !isLoggedIn
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : isFavorited
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-[#A5F3FC] text-[#2F58CD] hover:bg-[#36E2B2] hover:text-white'
                }`}
                onClick={isLoggedIn ? (isFavorited ? onUnfavorite : onFavorite) : undefined}
                disabled={!isLoggedIn}
                title={!isLoggedIn ? 'Faça login para favoritar repositórios' : undefined}
              >
                {isFavorited ? '💔 Desfavoritar' : '⭐ Favoritar'}
              </button>
              {!isLoggedIn && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Necessário Login
                </div>
              )}
            </div>
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