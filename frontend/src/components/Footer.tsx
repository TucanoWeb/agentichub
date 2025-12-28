export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600">
              🚀 <span className="font-semibold">AgenticHub</span> - Indexador de Repositórios para
              Agentes AI
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Facilitando a descoberta e integração de código para inteligência artificial
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="text-xs">🤝 Projeto Open Source</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/TucanoWeb/agentichub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24292e] text-white hover:bg-[#0d1117] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Contribuir</span>
              </a>

              <a
                href="https://github.com/TucanoWeb/agentichub/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span className="text-sm">🐛</span>
                <span className="font-medium">Issues</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200/60 text-center">
          <p className="text-xs text-slate-500">
            © 2025 AgenticHub. Feito com ❤️ para comunidade de desenvolvedores e entusiastas de AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
