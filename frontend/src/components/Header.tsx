interface HeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ isMobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  return (
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
          onClick={onToggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
  );
}