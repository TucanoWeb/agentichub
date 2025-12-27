# AgenticHub Ecosystem

AgenticHub é uma plataforma desenhada para desenvolvedores que utilizam IAs em suas IDEs. Em vez de re-explicar padrões de código a cada novo projeto, o AgenticHub permite indexar repositórios do GitHub como "Blueprints" prontos. Através de uma API otimizada, agentes de IA podem consumir implementações validadas instantaneamente, reduzindo drasticamente o consumo de tokens e eliminando alucinações arquiteturais.

Monorepo com:
- `backend/`: API Node.js (Hapi.js) + Joi, Sequelize (Postgres), JWT auth, e endpoint especial `/fetch-blueprint`.
- `frontend/`: React + Redux Toolkit + TanStack Query + Tailwind.

## Requisitos
- Node.js LTS
- Postgres acessível pelas variáveis do `.env`

## Setup rápido
1) Crie seu `.env` a partir do `.env.example`.
2) Instale dependências:

```bash
npm install
```

## Rodar em dev
```bash
npm run dev
```

- API: http://localhost:4000
- Frontend: http://localhost:5173

## Endpoint diferencial (agentes)
- `GET /fetch-blueprint?id=<HASH>` retorna `{ blueprint, files[] }` com conteúdo completo para replicação por outras IAs.

## Como contribuir com o projeto

Contribuições são muito bem-vindas! Este é um projeto open-source focado em melhorar a experiência de desenvolvedores com agentes de IA.

### 📋 Como começar

1. **Fork o repositório** no GitHub
2. **Clone seu fork** localmente:
   ```bash
   git clone https://github.com/seu-usuario/agentichub.git
   cd agentichub
   ```
3. **Configure o ambiente** seguindo as instruções do setup acima
4. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/nome-da-sua-feature
   ```

### 🛠️ Tipos de contribuição

- **🐛 Bug fixes**: Correção de problemas identificados
- **✨ Novas features**: Funcionalidades que melhorem a plataforma
- **📚 Documentação**: Melhorias na documentação e tutoriais
- **🎨 UI/UX**: Melhorias na interface e experiência do usuário
- **🔧 Infraestrutura**: Otimizações de performance e arquitetura
- **🧪 Testes**: Adição de testes automatizados

### 📝 Processo de desenvolvimento

1. **Sempre trabalhe em branches separadas** - nunca diretamente na `main`
2. **Siga as convenções de commit**:
   ```
   feat: adiciona nova funcionalidade X
   fix: corrige bug Y
   docs: atualiza documentação Z
   style: ajustes de formatação
   refactor: refatoração do código
   test: adiciona ou corrige testes
   ```
3. **Teste suas alterações** antes de criar o PR
4. **Mantenha o código limpo** seguindo os padrões do projeto

### 🔍 Pull Request Guidelines

- **Descreva claramente** o que sua PR resolve ou adiciona
- **Referencie issues** relacionadas (ex: `Closes #123`)
- **Adicione screenshots** se houver mudanças visuais
- **Mantenha PRs pequenas** e focadas em uma funcionalidade
- **Aguarde o review** antes do merge

### 🚀 Roadmap e prioridades

Consulte as [Issues do GitHub](https://github.com/TucanoWeb/agentichub/issues) para ver:
- Bugs conhecidos
- Features planejadas  
- Discussões de arquitetura
- Tarefas marcadas como "good first issue" para iniciantes

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE) - veja o arquivo LICENSE para detalhes.

### Resumo da Licença MIT:
- ✅ **Uso comercial** permitido
- ✅ **Modificação** permitida
- ✅ **Distribuição** permitida
- ✅ **Uso privado** permitido
- ❗ **Sem garantia** - use por sua conta e risco
- 📝 **Atribuição obrigatória** - mantenha o copyright

## 🤝 Código de Conduta

Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/). Ao participar, você concorda em manter um ambiente respeitoso e inclusivo para todos.

## 🐛 Reportando Bugs

Encontrou um bug? Ajude-nos a melhorar:

1. **Verifique** se já não existe uma issue similar
2. **Use o template** de bug report no GitHub
3. **Inclua detalhes** como:
   - Versão do Node.js
   - Sistema operacional
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots/logs se aplicável

## 💡 Sugestões de Features

Tem uma ideia para melhorar a plataforma?

1. **Abra uma issue** com o label `enhancement`
2. **Descreva o problema** que a feature resolveria
3. **Proponha uma solução** (se tiver ideias)
4. **Discuta com a comunidade** antes de implementar

## 📞 Contato e Suporte

- **GitHub Issues**: Para bugs e features
- **Discussions**: Para perguntas e discussões gerais
- **LinkedIn**: [@eric-ricielle](https://www.linkedin.com/in/eric-ricielle-2aa1ba237/)
- **GitHub**: [@TucanoWeb](https://github.com/TucanoWeb)

## 🏗️ Arquitetura do Projeto

```
agentichub/
├── backend/               # API Node.js + Hapi.js
│   ├── src/
│   │   ├── modules/       # Módulos organizados por feature
│   │   │   ├── auth/      # Autenticação JWT
│   │   │   ├── repos/     # Gerenciamento de repositórios
│   │   │   └── favorites/ # Sistema de favoritos
│   │   └── database/      # Configuração Sequelize
│   └── package.json
├── frontend/              # React + Redux + TailwindCSS
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── api/          # Camada de API
│   │   ├── store/        # Redux store
│   │   └── App.tsx       # Componente principal
│   └── package.json
└── README.md
```

## 🌟 Reconhecimentos

Agradecemos a todos que contribuíram para este projeto! Suas contribuições tornam o AgenticHub melhor a cada dia.

Construído com ❤️ para a comunidade de desenvolvedores que utilizam IA em seus fluxos de trabalho.