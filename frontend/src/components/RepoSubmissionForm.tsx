import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRepo } from '../api/repos';
import { TextField } from './Form';

interface RepoSubmissionFormProps {
  onSuccess: () => void;
}

export function RepoSubmissionForm({ onSuccess }: RepoSubmissionFormProps) {
  const queryClient = useQueryClient();
  const [githubUrl, setGithubUrl] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const createRepoMutation = useMutation({
    mutationFn: createRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repos"] });
      onSuccess();
    },
  });

  async function handleSubmit() {
    setError(null);
    if (!githubUrl.trim()) {
      setError("URL do GitHub é obrigatório.");
      return;
    }

    // Validar se é uma URL válida do GitHub
    try {
      const url = new URL(githubUrl.trim());
      if (!url.hostname.includes("github.com")) {
        setError("Deve ser uma URL válida do GitHub.");
        return;
      }
    } catch {
      setError("URL inválida.");
      return;
    }

    setSaving(true);
    try {
      await createRepoMutation.mutateAsync({
        github_url: githubUrl.trim(),
        tags: tags.trim(),
      });
      setGithubUrl("");
      setTags("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.response?.data?.error ?? "Falha ao adicionar repositório.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xl backdrop-blur-sm">
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
        <div className="text-lg font-bold text-white">🚀 Adicionar Repositório</div>
        <div className="text-sm text-[#A5F3FC]">
          Adicione um repositório do GitHub para indexação
        </div>
      </div>
      <div className="space-y-5 p-6">
        <TextField
          label="URL do Repositório GitHub"
          value={githubUrl}
          onChange={setGithubUrl}
          placeholder="https://github.com/usuario/repositorio"
        />
        <TextField
          label="Tags (separadas por vírgula)"
          value={tags}
          onChange={setTags}
          placeholder="react, typescript, api, frontend"
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            ⚠️ {error}
          </div>
        )}

        <button
          className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] hover:shadow-xl disabled:opacity-60"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "⏳ Adicionando…" : "🚀 Adicionar Repositório"}
        </button>
      </div>
    </div>
  );
}