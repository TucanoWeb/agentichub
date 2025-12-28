export default function DocumentationHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-white shadow-lg">
        <span className="text-2xl">📚</span>
        <h2 className="text-xl font-bold">Documentação para Desenvolvedores</h2>
      </div>
      <p className="mt-4 text-slate-600 text-lg">
        Como usar repositórios do AgenticHub como base para suas funcionalidades com Agentes AI
      </p>
    </div>
  );
}