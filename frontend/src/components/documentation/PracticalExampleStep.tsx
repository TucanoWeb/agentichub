import TutorialStep from './TutorialStep';

interface PracticalExampleStepProps {
  apiUrl: string;
}

export default function PracticalExampleStep({ apiUrl }: PracticalExampleStepProps) {
  return (
    <TutorialStep
      stepNumber={5}
      title="Exemplo Prático"
      gradientDirection="normal"
    >
      <div className="bg-slate-900 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">💡</span>
          <span className="text-yellow-400 font-bold">Cenário Real:</span>
        </div>
        <div className="text-green-400 text-sm space-y-2">
          <p>
            <strong>Objetivo:</strong> Implementar autenticação JWT em uma API Node.js
          </p>
          <p>
            <strong>1.</strong> Busquei por "jwt authentication node" no AgenticHub
          </p>
          <p>
            <strong>2.</strong> Encontrei um repo com Hapi.js + JWT + Bcrypt
          </p>
          <p>
            <strong>3.</strong> Usei o endpoint {apiUrl}/fetch-blueprint para obter detalhes
          </p>
          <p>
            <strong>4.</strong> No Cursor, executei:
          </p>
        </div>
        <div className="mt-4 bg-slate-800 rounded p-3 text-xs">
          <code className="text-blue-300">
            {`@web Analise este repo do AgenticHub: [URL]
Preciso adaptar para Express.js mantendo a mesma estrutura de segurança.
Gere middlewares de auth, rotas de login/register e validação de tokens.`}
          </code>
        </div>
        <div className="mt-3 text-green-400 text-sm">
          <p>
            <strong>Resultado:</strong> Código completo adaptado em 2 minutos! 🚀
          </p>
        </div>
      </div>
    </TutorialStep>
  );
};
