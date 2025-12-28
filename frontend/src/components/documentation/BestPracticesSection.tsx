export default function BestPracticesSection() {
  return (
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
  );
};
