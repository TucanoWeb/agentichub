import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { GitHubRepo } from '../api/repos';

interface AIPromptModalProps {
  repo: GitHubRepo;
  githubInfo?: {
    name: string;
    description: string | null;
    owner: { login: string };
    language?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function AIPromptModal({ repo, githubInfo, isOpen, onClose }: AIPromptModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  if (!isOpen) return null;

  const repoName = githubInfo?.name || 'repositório';
  const repoDescription = githubInfo?.description || 'Sem descrição disponível';
  const ownerName = githubInfo?.owner.login || 'desenvolvedor';
  const primaryLanguage = githubInfo?.language || 'linguagem não identificada';
  const tags = repo.tags ? repo.tags.split(',').map(tag => tag.trim()).join(', ') : '';

  const templates = [
    {
      id: 'analysis',
      title: '📋 Análise de Repositório',
      description: 'Análise completa do projeto e padrões arquiteturais',
      prompt: `Analise este repositório do GitHub: ${repo.github_url}

Detalhes do projeto:
- Nome: ${repoName}
- Desenvolvedor: ${ownerName}
- Linguagem principal: ${primaryLanguage}
- Descrição: ${repoDescription}
- Tags: ${tags}

Por favor:
1. Identifique os padrões arquiteturais usados
2. Liste as dependências e tecnologias principais
3. Explique a estrutura do projeto
4. Destaque pontos interessantes da implementação
5. Sugira possíveis melhorias ou adaptações

Contexto: Preciso entender este projeto para aplicar conceitos similares em meu desenvolvimento.`
    },
    {
      id: 'implementation',
      title: '🔧 Implementação Prática',
      description: 'Gere código baseado neste repositório',
      prompt: `Baseado no repositório ${repoName} (${repo.github_url}), crie uma implementação similar para meu projeto.

Informações do repositório base:
- Tecnologia: ${primaryLanguage}
- Descrição: ${repoDescription}
- Tags: ${tags}
- Autor: ${ownerName}

Requisitos para minha implementação:
- [SUBSTITUA: Descreva suas tecnologias específicas]
- [SUBSTITUA: Defina sua arquitetura desejada]
- [SUBSTITUA: Liste funcionalidades extras necessárias]

Por favor gere:
1. Estrutura de arquivos e pastas
2. Dependências necessárias (package.json, requirements.txt, etc.)
3. Código principal da implementação
4. Configurações importantes
5. Instruções de setup e execução

Mantenha as melhores práticas identificadas no repositório original.`
    },
    {
      id: 'migration',
      title: '🚀 Migração/Adaptação',
      description: 'Adapte este projeto para seu stack tecnológico',
      prompt: `Quero adaptar a implementação do projeto ${repoName} para meu stack atual.

Repositório original:
- URL: ${repo.github_url}
- Linguagem: ${primaryLanguage}
- Descrição: ${repoDescription}
- Conceitos: ${tags}

Meu ambiente atual:
- [SUBSTITUA: Framework/linguagem desejado]
- [SUBSTITUA: Banco de dados usado]
- [SUBSTITUA: Arquitetura de deployment]
- [SUBSTITUA: Outras especificações]

Preciso de ajuda para:
1. Identificar equivalentes das dependências
2. Adaptar a arquitetura para meu contexto
3. Converter padrões de código
4. Manter as funcionalidades principais
5. Otimizar para meu caso de uso específico

Foque em manter a essência e qualidade da solução original.`
    },
    {
      id: 'learning',
      title: '🎓 Aprendizado Guiado',
      description: 'Aprenda conceitos através deste projeto',
      prompt: `Use o repositório ${repoName} como base para me ensinar conceitos avançados.

Projeto de estudo:
- Repositório: ${repo.github_url}
- Tecnologia: ${primaryLanguage}
- Área: ${tags}
- Descrição: ${repoDescription}

Por favor, me explique:
1. **Conceitos Fundamentais**: Quais princípios de programação são aplicados?
2. **Padrões de Design**: Que patterns arquiteturais posso identificar?
3. **Boas Práticas**: O que este código faz bem que posso aplicar?
4. **Tecnologias**: Como as ferramentas são integradas efetivamente?
5. **Próximos Passos**: Como posso expandir meu conhecimento baseado neste exemplo?

Quero entender não só o "como", mas principalmente o "por quê" das decisões técnicas.`
    },
    {
      id: 'debugging',
      title: '🐛 Análise e Debug',
      description: 'Identifique possíveis problemas e melhorias',
      prompt: `Analise o repositório ${repoName} focando em qualidade de código e possíveis problemas.

Repositório para análise:
- URL: ${repo.github_url}
- Stack: ${primaryLanguage}
- Contexto: ${repoDescription}
- Tags: ${tags}

Por favor, avalie:
1. **Problemas de Segurança**: Vulnerabilidades ou práticas inseguras
2. **Performance**: Gargalos ou otimizações possíveis
3. **Manutenibilidade**: Código limpo, organização, documentação
4. **Escalabilidade**: Como o projeto se comporta com crescimento
5. **Testes**: Cobertura e qualidade dos testes
6. **Dependências**: Bibliotecas desatualizadas ou desnecessárias

Forneça sugestões práticas de melhorias com exemplos de código quando necessário.`
    }
  ];

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(templateId);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
            <button
              onClick={onClose}
              className="text-white hover:text-[#A5F3FC] transition-colors"
            >
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
                          ? 'bg-green-100 text-green-700'
                          : 'bg-[#A5F3FC] text-[#2F58CD] hover:bg-[#36E2B2] hover:text-white'
                      }`}
                    >
                      {copiedTemplate === template.id ? '✅ Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <button
                    onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                    className="w-full text-left text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    {selectedTemplate === template.id ? '🔽 Ocultar preview' : '👁️ Ver preview do prompt'}
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
              <li>4. Substitua os campos marcados com [SUBSTITUA: ...] pelas suas especificações</li>
              <li>5. Execute e refine conforme necessário!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}