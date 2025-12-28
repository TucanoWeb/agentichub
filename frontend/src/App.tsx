import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPopularRepos, getRecentRepos, searchRepos } from "./api/repos";
import { addToFavorites, getFavorites, removeFromFavorites } from "./api/favorites";
import type { RootState } from "./store/store";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { HomeTab } from "./components/HomeTab";
import { FavoritesTab } from "./components/FavoritesTab";
import { RepoSubmissionForm } from "./components/RepoSubmissionForm";
import { DocumentationTab } from "./components/DocumentationTab";
import { AccountTab } from "./components/AccountTab";
import { Footer } from "./components/Footer";

export default function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <Navigation
          tab={tab}
          token={token}
          isMobileMenuOpen={isMobileMenuOpen}
          onTabChange={setTab}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Content */}
        {tab === "home" && (
          <HomeTab
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            recentReposQuery={recentReposQuery}
            popularReposQuery={popularReposQuery}
            searchReposQuery={searchReposQuery}
            favoriteIds={favoriteIds}
            onFavorite={(id) => favoriteMutation.mutate(id)}
            onUnfavorite={(id) => unfavoriteMutation.mutate(id)}
          />
        )}

        {/* Favorites Tab */}
        {tab === "favorites" && token && (
          <FavoritesTab
            favoritesQuery={favoritesQuery}
            onUnfavorite={(id) => unfavoriteMutation.mutate(id)}
          />
        )}

        {/* Add Repository Tab */}
        {tab === "add" && <RepoSubmissionForm onSuccess={() => setTab("home")} />}

        {/* Documentation Tab */}
        {tab === "docs" && <DocumentationTab />}

        {/* Account Tab */}
        {tab === "account" && <AccountTab token={token} onLoginSuccess={() => setTab("home")} />}
      </div>

      <Footer />
    </div>
  );
}
