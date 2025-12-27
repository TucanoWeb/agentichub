import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { createRepo, getPopularRepos, getRecentRepos, searchRepos } from "./api/repos";
import { addToFavorites, getFavorites, removeFromFavorites } from "./api/favorites";
import { setToken } from "./store/authSlice";
import type { RootState } from "./store/store";
import { TextField } from "./components/Form";
import { GitHubRepoCard } from "./components/GitHubRepoCard";
import { AuthContainer } from "./components/auth";
import { DocumentationTab } from "./components/DocumentationTab";
import { Footer } from "./components/Footer";

export default function App() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((s: RootState) => s.auth.token);

  type Tab = "home" | "account" | "favorites" | "add" | "docs";
  const [tab, setTab] = useState<Tab>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const recentReposQuery = useQuery({
    queryKey: ["repos", "recent"],
    queryFn: getRecentRepos,
    staleTime: 60 * 1000, // 1 minute
  });

  const popularReposQuery = useQuery({
    queryKey: ["repos", "popular"],
    queryFn: getPopularRepos,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const searchReposQuery = useQuery({
    queryKey: ["repos", "search", searchQuery],
    queryFn: () => searchRepos(searchQuery),
    enabled: searchQuery.length > 0,
    staleTime: 30 * 1000, // 30 seconds
  });

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!token,
    staleTime: 60 * 1000,
  });

  const createRepoMutation = useMutation({
    mutationFn: createRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repos"] });
      setTab("home");
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["repos"] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["repos"] });
    },
  });

  const favoriteIds = useMemo(() => {
    return new Set(favoritesQuery.data?.map((f) => f.id) ?? []);
  }, [favoritesQuery.data]);

  function RepoSubmissionForm() {
    const [githubUrl, setGithubUrl] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    async function handleSubmit() {
      setError(null);
      if (!githubUrl.trim()) {
        setError("URL do GitHub é obrigatório.");
        return;
      }

      // Validar se é uma URL válida do GitHub
      try {
        const url = new URL(githubUrl.trim());
        if (!url.hostname.includes("github.com")) {
          setError("Deve ser uma URL válida do GitHub.");
          return;
        }
      } catch {
        setError("URL inválida.");
        return;
      }

      setSaving(true);
      try {
        await createRepoMutation.mutateAsync({
          github_url: githubUrl.trim(),
          tags: tags.trim(),
        });
        setGithubUrl("");
        setTags("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.response?.data?.error ?? "Falha ao adicionar repositório.");
      } finally {
        setSaving(false);
      }
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xl backdrop-blur-sm">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
          <div className="text-lg font-bold text-white">🚀 Adicionar Repositório</div>
          <div className="text-sm text-[#A5F3FC]">
            Adicione um repositório do GitHub para indexação
          </div>
        </div>
        <div className="space-y-5 p-6">
          <TextField
            label="URL do Repositório GitHub"
            value={githubUrl}
            onChange={setGithubUrl}
            placeholder="https://github.com/usuario/repositorio"
          />
          <TextField
            label="Tags (separadas por vírgula)"
            value={tags}
            onChange={setTags}
            placeholder="react, typescript, api, frontend"
          />

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button
            className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] hover:shadow-xl disabled:opacity-60"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "⏳ Adicionando…" : "🚀 Adicionar Repositório"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/logotipo_agentichub-removebg-preview.png"
                alt="AgenticHub Logo"
                className="h-12 md:h-16 w-auto"
              />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-slate-200/60 text-slate-600 hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="text-center">
            <p className="text-slate-600 text-sm md:text-lg">
              Indexador de Repositórios GitHub para Agentes de IA
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="flex rounded-2xl bg-white/70 backdrop-blur-sm p-2 shadow-lg border border-slate-200/60">
              <button
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === "home"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => setTab("home")}
              >
                🏠 Explorar
              </button>
              {token && (
                <button
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tab === "favorites"
                      ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setTab("favorites")}
                >
                  ⭐ Favoritos
                </button>
              )}
              <button
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === "add"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => setTab("add")}
              >
                ➕ Adicionar
              </button>
              <button
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === "docs"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => setTab("docs")}
              >
                📚 Docs
              </button>
              <button
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === "account"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => setTab("account")}
              >
                👤 Conta
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {/* Overlay */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="fixed top-20 left-4 right-4 z-50 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl border border-slate-200/60 p-4">
                <div className="space-y-2">
                  <button
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      tab === "home"
                        ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      setTab("home");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    🏠 <span>Explorar</span>
                  </button>
                  {token && (
                    <button
                      className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                        tab === "favorites"
                          ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                      onClick={() => {
                        setTab("favorites");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      ⭐ <span>Favoritos</span>
                    </button>
                  )}
                  <button
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      tab === "add"
                        ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      setTab("add");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    ➕ <span>Adicionar</span>
                  </button>
                  <button
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      tab === "docs"
                        ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      setTab("docs");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    📚 <span>Docs</span>
                  </button>
                  <button
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      tab === "account"
                        ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      setTab("account");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    👤 <span>Conta</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar (only on home tab) */}
        {tab === "home" && (
          <div className="mb-6 md:mb-8 flex justify-center px-2">
            <div className="w-full max-w-2xl">
              <TextField
                label=""
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="🔍 Buscar repositórios por tags ou URL..."
              />
            </div>
          </div>
        )}

        {/* Content */}
        {tab === "home" && (
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
                        onFavorite={() => favoriteMutation.mutate(repo.id)}
                        onUnfavorite={() => unfavoriteMutation.mutate(repo.id)}
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
                <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">
                  🆕 Recém Adicionados
                </h2>
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
                        onFavorite={() => favoriteMutation.mutate(repo.id)}
                        onUnfavorite={() => unfavoriteMutation.mutate(repo.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Popular Repos */}
            {!searchQuery && (
              <div>
                <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-800">
                  🔥 Mais Favoritados
                </h2>
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
                        onFavorite={() => favoriteMutation.mutate(repo.id)}
                        onUnfavorite={() => unfavoriteMutation.mutate(repo.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {tab === "favorites" && token && (
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
                    onFavorite={() => {}}
                    onUnfavorite={() => unfavoriteMutation.mutate(repo.id)}
                  />
                ))}
              </div>
            )}
            {favoritesQuery.data?.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                ⭐ Você ainda não favoritou nenhum repositório
              </div>
            )}
          </div>
        )}

        {/* Add Repository Tab */}
        {tab === "add" && <RepoSubmissionForm />}

        {/* Documentation Tab */}
        {tab === "docs" && <DocumentationTab />}

        {/* Account Tab */}
        {tab === "account" &&
          (!token ? (
            <AuthContainer onLoginSuccess={() => setTab("home")} />
          ) : (
            <div className="max-w-md mx-auto">
              <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
                <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
                  <div className="text-lg font-bold text-white">✅ Conectado</div>
                  <div className="text-sm text-[#A5F3FC]">Você está autenticado</div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-slate-600 mb-4">Você está autenticado com sucesso!</p>
                  <button
                    className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
                    onClick={() => {
                      dispatch(setToken(null));
                      queryClient.clear();
                      setTab("home");
                    }}
                  >
                    🚪 Sair
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
