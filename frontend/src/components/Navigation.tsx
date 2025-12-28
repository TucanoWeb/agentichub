type Tab = "home" | "account" | "favorites" | "add" | "docs";

interface NavigationProps {
  tab: Tab;
  token: string | null;
  isMobileMenuOpen: boolean;
  onTabChange: (tab: Tab) => void;
  onCloseMobileMenu: () => void;
}

export function Navigation({ tab, token, isMobileMenuOpen, onTabChange, onCloseMobileMenu }: NavigationProps) {
  const handleTabChange = (newTab: Tab) => {
    onTabChange(newTab);
    onCloseMobileMenu();
  };

  return (
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
            onClick={() => onTabChange("home")}
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
              onClick={() => onTabChange("favorites")}
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
            onClick={() => onTabChange("add")}
          >
            ➕ Adicionar
          </button>
          <button
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "docs"
                ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => onTabChange("docs")}
          >
            📚 Docs
          </button>
          <button
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "account"
                ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => onTabChange("account")}
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
            onClick={onCloseMobileMenu}
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
                onClick={() => handleTabChange("home")}
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
                  onClick={() => handleTabChange("favorites")}
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
                onClick={() => handleTabChange("add")}
              >
                ➕ <span>Adicionar</span>
              </button>
              <button
                className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  tab === "docs"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => handleTabChange("docs")}
              >
                📚 <span>Docs</span>
              </button>
              <button
                className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  tab === "account"
                    ? "bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => handleTabChange("account")}
              >
                👤 <span>Conta</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}