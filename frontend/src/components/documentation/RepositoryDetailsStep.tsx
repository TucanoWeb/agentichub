import TutorialStep from './TutorialStep';

interface RepositoryDetailsStepProps {
  apiUrl: string;
}

export default function RepositoryDetailsStep({ apiUrl }: RepositoryDetailsStepProps) {
  return (
    <TutorialStep
      stepNumber={2}
      title="Obtenha Detalhes do Repositório"
      gradientDirection="reverse"
    >
      <p className="text-slate-700 leading-relaxed">
        Clique em "🔗 Ver no GitHub" para explorar o código, ou use nossa API para agentes:
      </p>
      <div className="bg-slate-900 rounded-lg p-4">
        <pre className="text-green-400 text-sm overflow-x-auto">
          <code>{`# Endpoint para Agentes AI (API Backend)
GET ${apiUrl}/fetch-blueprint?id={repo-id}

# Exemplo real:
GET ${apiUrl}/fetch-blueprint?id=b93fdc96-e6ff-4f26-9164-970a85ce5dc9

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
        <p className="font-semibold text-amber-800 mb-2">
          ⚡ Para Agentes AI - Estrutura Aprimorada:
        </p>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>
            • <strong>README Inteligente:</strong> Busca múltiplas variações (README.md,
            readme.md, etc.)
          </li>
          <li>
            • <strong>Metadados GitHub:</strong> Linguagem, tópicos, descrição, estrelas
          </li>
          <li>
            • <strong>Tech Stack:</strong> Análise automática de package.json e dependências
          </li>
          <li>
            • <strong>Estrutura de Arquivos:</strong> Lista de arquivos e pastas principais
          </li>
          <li>
            • <strong>Contexto AI:</strong> Resumo otimizado para compreensão de agentes
          </li>
        </ul>
      </div>
    </TutorialStep>
  );
};
