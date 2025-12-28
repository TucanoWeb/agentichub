export default function AboutDeveloperSection() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👨‍💻</span>
          <h3 className="text-lg font-bold text-white">Sobre o Desenvolvedor</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="font-bold text-indigo-800 mb-2">Eric Ricielle</h4>
            <p className="text-sm text-indigo-700 leading-relaxed mb-4">
              Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Especialista em
              criar soluções que conectam desenvolvedores com ferramentas de IA, facilitando o
              desenvolvimento de software moderno e eficiente.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/eric-ricielle-2aa1ba237/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://github.com/TucanoWeb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition-colors"
              >
                💻 GitHub
              </a>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-4 border border-indigo-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h5 className="font-bold text-indigo-800 text-sm mb-1">AgenticHub</h5>
              <p className="text-xs text-indigo-600">
                Conectando desenvolvedores
                <br />
                com o futuro da programação
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
