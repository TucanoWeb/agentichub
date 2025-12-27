export function DocumentationTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-white shadow-lg">
          <span className="text-2xl">📚</span>
          <h2 className="text-xl font-bold">Documentação para Desenvolvedores</h2>
        </div>
        <p className="mt-4 text-slate-600 text-lg">
          Como usar repositórios do AgenticHub como base para suas funcionalidades com Agentes AI
        </p>
      </div>

      {/* Tutorial Cards */}
      <div className="grid gap-6">
        {/* Passo 1 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2F58CD]">1</span>
              <h3 className="text-lg font-bold text-white">Explore e Encontre Repositórios</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Use a funcionalidade de busca para encontrar repositórios relevantes para sua necessidade:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-slate-800 mb-2">💡 Dicas de Busca:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Busque por <strong>tags tecnológicas</strong>: "react", "typescript", "api"</li>
                <li>• Use <strong>termos funcionais</strong>: "authentication", "dashboard", "crud"</li>
                <li>• Procure por <strong>patterns</strong>: "microservice", "monorepo", "mvc"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-[#36E2B2] to-[#2F58CD] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#36E2B2]">2</span>
              <h3 className="text-lg font-bold text-white">Obtenha Detalhes do Repositório</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Clique em "🔗 Ver no GitHub" para explorar o código, ou use nossa API para agentes:
            </p>
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{`# Endpoint para Agentes AI (API Backend)
GET http://localhost:4000/fetch-blueprint?id={repo-id}

# Exemplo real:
GET http://localhost:4000/fetch-blueprint?id=b93fdc96-e6ff-4f26-9164-970a85ce5dc9

# Resposta Aprimorada para IA:
{
  "id": "uuid-do-repo",
  "github_url": "https://github.com/user/repo",
  "tags": "react,typescript,crud",
  "raw_base_url": "https://raw.githubusercontent.com/...",
  
  "readme": "# Conteúdo real do README...",
  "readme_file": "README.md",
  
  "metadata": {
    "name": "repo-name",
    "description": "Descrição do projeto",
    "language": "TypeScript", 
    "topics": ["react", "api"],
    "stargazers_count": 150
  },
  
  "package_json": {
    "dependencies": { "react": "^18.0.0" },
    "scripts": { "dev": "vite" }
  },
  
  "file_structure": [
    { "name": "src", "type": "dir" },
    { "name": "package.json", "type": "file" }
  ],
  
  "ai_context": {
    "primary_language": "TypeScript",
    "estimated_stack": ["react", "vite", "tailwindcss"],
    "main_files": ["package.json", "tsconfig.json"],
    "folder_structure_summary": ["src", "public", "docs"]
  }
}`}</code>
              </pre>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-semibold text-amber-800 mb-2">⚡ Para Agentes AI - Estrutura Aprimorada:</p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• <strong>README Inteligente:</strong> Busca múltiplas variações (README.md, readme.md, etc.)</li>
                <li>• <strong>Metadados GitHub:</strong> Linguagem, tópicos, descrição, estrelas</li>
                <li>• <strong>Tech Stack:</strong> Análise automática de package.json e dependências</li>
                <li>• <strong>Estrutura de Arquivos:</strong> Lista de arquivos e pastas principais</li>
                <li>• <strong>Contexto AI:</strong> Resumo otimizado para compreensão de agentes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2F58CD]">3</span>
              <h3 className="text-lg font-bold text-white">Configure seu Agente AI</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cursor AI */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚡</span>
                  <h4 className="font-bold text-slate-800">Cursor IDE</h4>
                </div>
                <div className="text-sm text-slate-600 space-y-2">
                  <p><strong>Ctrl+K:</strong> Abrir chat do agente</p>
                  <p><strong>@web:</strong> Buscar repositórios online</p>
                  <p><strong>@codebase:</strong> Referenciar código local</p>
                </div>
              </div>

              {/* VSCode */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🔷</span>
                  <h4 className="font-bold text-slate-800">VSCode + GitHub Copilot</h4>
                </div>
                <div className="text-sm text-slate-600 space-y-2">
                  <p><strong>Ctrl+I:</strong> Inline chat</p>
                  <p><strong>Ctrl+Shift+I:</strong> Chat sidebar</p>
                  <p><strong>#file:</strong> Referenciar arquivos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passo 4 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-[#36E2B2] to-[#2F58CD] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#36E2B2]">4</span>
              <h3 className="text-lg font-bold text-white">Prompts Eficazes</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Use estes templates de prompt para obter melhores resultados:
            </p>
            
            <div className="space-y-4">
              {/* Template 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <h5 className="font-bold text-blue-800 mb-2">📋 Template: Análise de Repositório</h5>
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
                <h5 className="font-bold text-green-800 mb-2">🔧 Template: Implementação Prática</h5>
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
          </div>
        </div>

        {/* Passo 5 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2F58CD]">5</span>
              <h3 className="text-lg font-bold text-white">Exemplo Prático</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400">💡</span>
                <span className="text-yellow-400 font-bold">Cenário Real:</span>
              </div>
              <div className="text-green-400 text-sm space-y-2">
                <p><strong>Objetivo:</strong> Implementar autenticação JWT em uma API Node.js</p>
                <p><strong>1.</strong> Busquei por "jwt authentication node" no AgenticHub</p>
                <p><strong>2.</strong> Encontrei um repo com Hapi.js + JWT + Bcrypt</p>
                <p><strong>3.</strong> Usei o endpoint /fetch-blueprint para obter detalhes</p>
                <p><strong>4.</strong> No Cursor, executei:</p>
              </div>
              <div className="mt-4 bg-slate-800 rounded p-3 text-xs">
                <code className="text-blue-300">
                  {`@web Analise este repo do AgenticHub: [URL]
Preciso adaptar para Express.js mantendo a mesma estrutura de segurança.
Gere middlewares de auth, rotas de login/register e validação de tokens.`}
                </code>
              </div>
              <div className="mt-3 text-green-400 text-sm">
                <p><strong>Resultado:</strong> Código completo adaptado em 2 minutos! 🚀</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <h3 className="text-lg font-bold text-white">Melhores Práticas</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>✅</span> Faça
                </h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Favorite repositórios úteis para referência futura</li>
                  <li>• Combine múltiplos repos para soluções complexas</li>
                  <li>• Adapte sempre para seu contexto específico</li>
                  <li>• Teste o código gerado antes de usar em produção</li>
                  <li>• Use tags específicas para buscas mais precisas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span>❌</span> Evite
                </h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• Copiar código sem entender sua funcionalidade</li>
                  <li>• Usar dependências desatualizadas sem verificar</li>
                  <li>• Ignorar licenças de software dos repositórios</li>
                  <li>• Implementar sem considerar segurança</li>
                  <li>• Esquecer de adaptar para suas regras de negócio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔌</span>
              <h3 className="text-lg font-bold text-white">API Reference</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
              <h4 className="font-bold text-blue-800 mb-2">🌐 URLs Base</h4>
              <div className="text-sm space-y-1">
                <div><strong>Frontend:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-xs">http://localhost:5173</code></div>
                <div><strong>API Backend:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-xs">http://localhost:4000</code></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                💡 Os endpoints da API devem ser acessados pela porta 4000
              </p>
            </div>
            <div className="grid gap-4">
              <div className="bg-slate-50 rounded-lg p-4 border">
                <h4 className="font-bold text-slate-800 mb-2">GET http://localhost:4000/repos/recent</h4>
                <p className="text-sm text-slate-600 mb-2">Lista repositórios mais recentes</p>
                <code className="text-xs bg-slate-200 px-2 py-1 rounded">Público • Sem autenticação</code>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border">
                <h4 className="font-bold text-slate-800 mb-2">GET http://localhost:4000/repos/popular</h4>
                <p className="text-sm text-slate-600 mb-2">Lista repositórios mais favoritados</p>
                <code className="text-xs bg-slate-200 px-2 py-1 rounded">Público • Sem autenticação</code>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border">
                <h4 className="font-bold text-slate-800 mb-2">GET http://localhost:4000/repos/search?q=QUERY</h4>
                <p className="text-sm text-slate-600 mb-2">Busca repositórios por tags ou URL</p>
                <code className="text-xs bg-slate-200 px-2 py-1 rounded">Público • Parâmetro: q (string)</code>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">GET http://localhost:4000/fetch-blueprint?id=REPO_ID</h4>
                <p className="text-sm text-blue-600 mb-2">
                  <strong>Endpoint especial para agentes AI</strong> - Retorna README e URLs raw do GitHub
                </p>
                <code className="text-xs bg-blue-200 px-2 py-1 rounded">Público • Para Agentes • Incrementa usage_count</code>
                <div className="mt-2 text-xs text-blue-700">
                  <strong>Exemplo:</strong> <br/>
                  <code className="bg-blue-100 px-1 rounded">http://localhost:4000/fetch-blueprint?id=b93fdc96-e6ff-4f26-9164-970a85ce5dc9</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About the Author */}
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
                  Desenvolvedor Full Stack apaixonado por tecnologia e inovação. 
                  Especialista em criar soluções que conectam desenvolvedores com ferramentas de IA, 
                  facilitando o desenvolvimento de software moderno e eficiente.
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
                    Conectando desenvolvedores<br/>
                    com o futuro da programação
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}