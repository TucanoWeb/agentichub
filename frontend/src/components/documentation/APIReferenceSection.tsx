interface APIReferenceProps {
  apiUrl: string;
}

export default function APIReferenceSection({ apiUrl }: APIReferenceProps) {
  return (
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
            <div>
              <strong>Frontend:</strong>{" "}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                http://localhost:5173
              </code>
            </div>
            <div>
              <strong>API Backend:</strong>{" "}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                {apiUrl}
              </code>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 Os endpoints da API devem ser acessados pela porta 4000
          </p>
        </div>
        <div className="grid gap-4">             
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">
              GET {apiUrl}/fetch-blueprint?id=REPO_ID
            </h4>
            <p className="text-sm text-blue-600 mb-2">
              <strong>Endpoint especial para agentes AI</strong> - Retorna README e URLs raw do
              GitHub
            </p>
            <code className="text-xs bg-blue-200 px-2 py-1 rounded">
              Público • Para Agentes • Incrementa usage_count
            </code>
            <div className="mt-2 text-xs text-blue-700">
              <strong>Exemplo:</strong> <br />
              <code className="bg-blue-100 px-1 rounded">
                {apiUrl}/fetch-blueprint?id=b93fdc96-e6ff-4f26-9164-970a85ce5dc9
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
