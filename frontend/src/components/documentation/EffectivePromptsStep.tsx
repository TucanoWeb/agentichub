import TutorialStep from './TutorialStep';

export default function EffectivePromptsStep() {
  return (
    <TutorialStep
      stepNumber={4}
      title="Prompts Eficazes"
      gradientDirection="reverse"
    >
      <p className="text-slate-700 leading-relaxed">
        Use estes templates de prompt para obter melhores resultados:
      </p>

      <div className="space-y-4">
        {/* Template 1 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h5 className="font-bold text-blue-800 mb-2">
            📋 Template: Análise de Repositório
          </h5>
          <div className="bg-white rounded p-3 text-sm">
            <code className="text-slate-700">
              {`Analise este repositório do AgenticHub: [URL_DO_GITHUB]

Contexto: Preciso implementar [FUNCIONALIDADE_DESEJADA] em meu projeto [STACK_TECNOLOGICA].

Por favor:
1. Identifique os padrões arquiteturais usados
2. Liste as dependências principais
3. Explique como adaptar para minha necessidade
4. Sugira modificações específicas`}
            </code>
          </div>
        </div>

        {/* Template 2 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <h5 className="font-bold text-green-800 mb-2">
            🔧 Template: Implementação Prática
          </h5>
          <div className="bg-white rounded p-3 text-sm">
            <code className="text-slate-700">
              {`Baseado no repositório [REPO_NOME] do AgenticHub, crie uma implementação de [FEATURE] que:

Requisitos:
- Use [TECNOLOGIAS_ESPECIFICAS]
- Mantenha o padrão de [ARQUITETURA_DESEJADA]
- Inclua [FUNCIONALIDADES_EXTRAS]

Gere o código com:
1. Estrutura de arquivos
2. Dependências necessárias
3. Implementação core
4. Testes básicos`}
            </code>
          </div>
        </div>

        {/* Template 3 */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
          <h5 className="font-bold text-purple-800 mb-2">🚀 Template: Migração/Adaptação</h5>
          <div className="bg-white rounded p-3 text-sm">
            <code className="text-slate-700">
              {`Quero migrar a implementação de [FUNCIONALIDADE] do repositório [REPO_URL] para meu stack atual.

Meu ambiente:
- Framework: [SEU_FRAMEWORK]
- Database: [SEU_DB]
- Deploy: [SUA_INFRA]

Ajude-me a:
1. Adaptar a arquitetura para meu contexto
2. Converter dependências equivalentes
3. Manter as melhores práticas identificadas
4. Otimizar para meu caso de uso`}
            </code>
          </div>
        </div>
      </div>
    </TutorialStep>
  );
};
