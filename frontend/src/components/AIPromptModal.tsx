import { useState } from "react";
import { createPortal } from "react-dom";
import type { GitHubRepo } from "../api/repos";

interface AIPromptModalProps {
  repo: GitHubRepo;
  githubInfo?: {
    name: string;
    description: string | null;
    owner: { login: string };
    language: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function AIPromptModal({ repo, githubInfo, isOpen, onClose }: AIPromptModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  if (!isOpen) return null;

  const repoName = githubInfo?.name || "repositório";
  const repoDescription = githubInfo?.description || "Sem descrição disponível";
  const ownerName = githubInfo?.owner.login || "desenvolvedor";
  const primaryLanguage = githubInfo?.language || "linguagem não identificada";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const agentEndpoint = `${apiUrl}/fetch-blueprint?id=${repo.id}`;
  const tags = repo.tags
    ? repo.tags
        .split(",")
        .map((tag) => tag.trim())
        .join(", ")
    : "";

  const templates = [
    {
      id: "analysis",
      title: "📋 Análise de Repositório",
      description: "Análise completa do projeto e padrões arquiteturais",
      prompt: `Use o endpoint especializado do AgenticHub para analisar este repositório:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint retorna dados estruturados especificamente para IA, incluindo:
- README completo
- Estrutura de arquivos
- Dependências (package.json)
- Metadados do GitHub
- URLs raw para arquivos principais
- Contexto otimizado para agentes

Detalhes do projeto:
- Nome: ${repoName}
- Desenvolvedor: ${ownerName}  
- Linguagem principal: ${primaryLanguage}
- Descrição: ${repoDescription}
- Tags: ${tags}
- GitHub: ${repo.github_url}

Com base nos dados do endpoint, por favor:
1. Identifique os padrões arquiteturais usados
2. Liste as dependências e tecnologias principais
3. Explique a estrutura do projeto
4. Destaque pontos interessantes da implementação
5. Sugira possíveis melhorias ou adaptações

Contexto: Preciso entender este projeto para aplicar conceitos similares em meu desenvolvimento.`,
    },
    {
      id: "implementation",
      title: "🔧 Implementação Prática",
      description: "Gere código baseado neste repositório",
      prompt: `Use o endpoint especializado do AgenticHub para implementar uma solução similar:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint fornece dados estruturados incluindo código, dependências e contexto completo.

Informações do repositório base:
- Nome: ${repoName}
- Tecnologia: ${primaryLanguage}
- Descrição: ${repoDescription}
- Tags: ${tags}
- Autor: ${ownerName}
- GitHub: ${repo.github_url}

Requisitos para minha implementação:
- [SUBSTITUA: Descreva suas tecnologias específicas]
- [SUBSTITUA: Defina sua arquitetura desejada]
- [SUBSTITUA: Liste funcionalidades extras necessárias]

Com base nos dados estruturados do endpoint, por favor gere:
1. Estrutura de arquivos e pastas
2. Dependências necessárias (package.json, requirements.txt, etc.)
3. Código principal da implementação
4. Configurações importantes
5. Instruções de setup e execução

Mantenha as melhores práticas identificadas no repositório original.`,
    },
    {
      id: "migration",
      title: "🚀 Migração/Adaptação",
      description: "Adapte este projeto para seu stack tecnológico",
      prompt: `Use o endpoint do AgenticHub para adaptar este projeto ao meu stack:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint retorna estrutura completa, dependências e código otimizado para análise por IA.

Repositório original:
- Nome: ${repoName}
- Linguagem: ${primaryLanguage}
- Descrição: ${repoDescription}
- Conceitos: ${tags}
- GitHub: ${repo.github_url}

Meu ambiente atual:
- [SUBSTITUA: Framework/linguagem desejado]
- [SUBSTITUA: Banco de dados usado]
- [SUBSTITUA: Arquitetura de deployment]
- [SUBSTITUA: Outras especificações]

Com base nos dados estruturados do endpoint, preciso de ajuda para:
1. Identificar equivalentes das dependências
2. Adaptar a arquitetura para meu contexto
3. Converter padrões de código
4. Manter as funcionalidades principais
5. Otimizar para meu caso de uso específico

Foque em manter a essência e qualidade da solução original.`,
    },
    {
      id: "learning",
      title: "🎓 Aprendizado Guiado",
      description: "Aprenda conceitos através deste projeto",
      prompt: `Use o endpoint AgenticHub para me ensinar conceitos avançados através deste projeto:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint fornece README completo, estrutura de arquivos, dependências e contexto otimizado.

Projeto de estudo:
- Nome: ${repoName}
- Repositório: ${repo.github_url}
- Tecnologia: ${primaryLanguage}
- Área: ${tags}
- Descrição: ${repoDescription}

Com base nos dados estruturados do endpoint, por favor me explique:
1. **Conceitos Fundamentais**: Quais princípios de programação são aplicados?
2. **Padrões de Design**: Que patterns arquiteturais posso identificar?
3. **Boas Práticas**: O que este código faz bem que posso aplicar?
4. **Tecnologias**: Como as ferramentas são integradas efetivamente?
5. **Próximos Passos**: Como posso expandir meu conhecimento baseado neste exemplo?

Quero entender não só o "como", mas principalmente o "por quê" das decisões técnicas.`,
    },
    {
      id: "debugging",
      title: "🐛 Análise e Debug",
      description: "Identifique possíveis problemas e melhorias",
      prompt: `Use o endpoint AgenticHub para uma análise profunda de qualidade e debugging:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint oferece acesso estruturado ao código, README, dependências e arquivos principais.

Repositório para análise:
- Nome: ${repoName}
- URL: ${repo.github_url}
- Stack: ${primaryLanguage}
- Contexto: ${repoDescription}
- Tags: ${tags}

Com base nos dados completos do endpoint, por favor avalie:
1. **Problemas de Segurança**: Vulnerabilidades ou práticas inseguras
2. **Performance**: Gargalos ou otimizações possíveis
3. **Manutenibilidade**: Código limpo, organização, documentação
4. **Escalabilidade**: Como o projeto se comporta com crescimento
5. **Testes**: Cobertura e qualidade dos testes
6. **Dependências**: Bibliotecas desatualizadas ou desnecessárias

Forneça sugestões práticas de melhorias com exemplos de código quando necessário.`,
    },
    {
      id: "specific-feature",
      title: "⚡ Funcionalidade Específica",
      description: "Extraia e implemente apenas uma funcionalidade específica",
      prompt: `Use o endpoint AgenticHub para implementar uma funcionalidade específica deste repositório:

🔗 **Endpoint para Agentes:** ${agentEndpoint}

Este endpoint fornece acesso estruturado ao código, dependências e arquivos do projeto.

Repositório de referência:
- Nome: ${repoName}
- Tecnologia: ${primaryLanguage}
- Descrição: ${repoDescription}
- Tags: ${tags}
- GitHub: ${repo.github_url}

🎯 **Funcionalidade desejada:**
[SUBSTITUA: Descreva especificamente qual módulo/funcionalidade você quer extrair]

Exemplos de funcionalidades específicas:
• Sistema de autenticação (login, registro, JWT)
• Módulo de envio de emails (templates, SMTP, notificações)
• Sistema de upload de arquivos (storage, validação, processamento)
• Componente de busca/filtros (queries, pagination, sorting)
• Sistema de cache/redis (configuração, helpers, invalidação)
• Módulo de pagamentos (integração, webhooks, validação)
• Sistema de logs/monitoramento (tracking, métricas, alertas)

**Meu stack atual:**
- Framework: [SUBSTITUA: ex: React, Vue, Angular, Express, NestJS]
- Database: [SUBSTITUA: ex: PostgreSQL, MongoDB, MySQL]
- Ambiente: [SUBSTITUA: ex: Node.js, Python, Java, .NET]

Com base nos dados do endpoint, por favor:
1. **Identifique** onde está implementada a funcionalidade no repositório original
2. **Extraia** apenas os arquivos/código relacionados à funcionalidade específica
3. **Adapte** o código para meu stack atual
4. **Liste** as dependências necessárias apenas para esta funcionalidade
5. **Forneça** instruções de integração no meu projeto existente
6. **Sugira** testes unitários para a funcionalidade implementada

Foco: Implementar APENAS a funcionalidade solicitada, não o projeto completo.`,
    },
  ];

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(templateId);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">🤖 Templates para Agentes IA</h2>
              <p className="text-[#A5F3FC] text-sm mt-1">
                {repoName} • {primaryLanguage}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:text-[#A5F3FC] transition-colors">
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4">
            {templates.map((template) => (
              <div key={template.id} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{template.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{template.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(template.prompt, template.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        copiedTemplate === template.id
                          ? "bg-green-100 text-green-700"
                          : "bg-[#A5F3FC] text-[#2F58CD] hover:bg-[#36E2B2] hover:text-white"
                      }`}
                    >
                      {copiedTemplate === template.id ? "✅ Copiado!" : "📋 Copiar"}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <button
                    onClick={() =>
                      setSelectedTemplate(selectedTemplate === template.id ? null : template.id)
                    }
                    className="w-full text-left text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    {selectedTemplate === template.id
                      ? "🔽 Ocultar preview"
                      : "👁️ Ver preview do prompt"}
                  </button>

                  {selectedTemplate === template.id && (
                    <div className="mt-3 bg-slate-900 rounded-lg p-4">
                      <pre className="text-green-400 text-xs whitespace-pre-wrap overflow-x-auto">
                        {template.prompt}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 p-4 bg-[#A5F3FC]/30 rounded-lg border border-[#36E2B2]">
            <h4 className="font-bold text-[#2F58CD] mb-2">💡 Como usar:</h4>
            <ol className="text-sm text-[#2F58CD] space-y-1">
              <li>1. Escolha o template que melhor se adapta ao seu objetivo</li>
              <li>2. Clique em "📋 Copiar" para copiar o prompt</li>
              <li>3. Cole no chat do seu agente IA (Cursor, GitHub Copilot, ChatGPT, etc.)</li>
              <li>
                4. Substitua os campos marcados com [SUBSTITUA: ...] pelas suas especificações
              </li>
              <li>5. O agente usará o endpoint AgenticHub para dados estruturados!</li>
            </ol>
            <div className="mt-3 p-3 bg-white rounded-lg border border-[#36E2B2]/50">
              <h5 className="font-semibold text-[#2F58CD] text-xs mb-1">
                🚀 Diferencial AgenticHub:
              </h5>
              <p className="text-xs text-[#2F58CD]">
                Nossos prompts usam <strong>endpoints especializados</strong> que entregam código
                "mastigado" para IA, com README, dependências, estrutura de arquivos e contexto
                otimizado - muito além de um simples link do GitHub!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
