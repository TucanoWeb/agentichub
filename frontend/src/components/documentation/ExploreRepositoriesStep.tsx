import TutorialStep from './TutorialStep';

export default function ExploreRepositoriesStep() {
  return (
    <TutorialStep
      stepNumber={1}
      title="Explore e Encontre Repositórios"
      gradientDirection="normal"
    >
      <p className="text-slate-700 leading-relaxed">
        Use a funcionalidade de busca para encontrar repositórios relevantes para sua
        necessidade:
      </p>
      <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
        <p className="font-semibold text-slate-800 mb-2">💡 Dicas de Busca:</p>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>
            • Busque por <strong>tags tecnológicas</strong>: "react", "typescript", "api"
          </li>
          <li>
            • Use <strong>termos funcionais</strong>: "authentication", "dashboard", "crud"
          </li>
          <li>
            • Procure por <strong>patterns</strong>: "microservice", "monorepo", "mvc"
          </li>
        </ul>
      </div>
    </TutorialStep>
  );
};
