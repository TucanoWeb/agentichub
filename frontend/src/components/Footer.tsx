export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600">
              🚀 <span className="font-semibold">AgenticHub</span> - Indexador de Repositórios para Agentes AI
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Facilitando a descoberta e integração de código para inteligência artificial
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="text-xs">Desenvolvido por</span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/eric-ricielle-2aa1ba237/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A5F3FC] text-[#2F58CD] hover:bg-[#36E2B2] hover:text-white transition-colors"
              >
                <span className="text-sm">💼</span>
                <span className="font-medium">Eric Ricielle</span>
              </a>
              
              <a
                href="https://github.com/TucanoWeb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span className="text-sm">💻</span>
                <span className="font-medium">TucanoWeb</span>
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