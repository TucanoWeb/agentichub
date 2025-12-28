import TutorialStep from './TutorialStep';

export default function ConfigureAIAgentStep() {
  return (
    <TutorialStep
      stepNumber={3}
      title="Configure seu Agente AI"
      gradientDirection="normal"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cursor AI */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚡</span>
            <h4 className="font-bold text-slate-800">Cursor IDE</h4>
          </div>
          <div className="text-sm text-slate-600 space-y-2">
            <p>
              <strong>Ctrl+K:</strong> Abrir chat do agente
            </p>
            <p>
              <strong>@web:</strong> Buscar repositórios online
            </p>
            <p>
              <strong>@codebase:</strong> Referenciar código local
            </p>
          </div>
        </div>

        {/* VSCode */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔷</span>
            <h4 className="font-bold text-slate-800">VSCode + GitHub Copilot</h4>
          </div>
          <div className="text-sm text-slate-600 space-y-2">
            <p>
              <strong>Ctrl+I:</strong> Inline chat
            </p>
            <p>
              <strong>Ctrl+Shift+I:</strong> Chat sidebar
            </p>
            <p>
              <strong>#file:</strong> Referenciar arquivos
            </p>
          </div>
        </div>
      </div>
    </TutorialStep>
  );
};
