import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../api/auth';
import { TextField } from '../Form';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setMessage('Cadastro realizado com sucesso! Agora você pode fazer login.');
      onSuccess();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      setMessage(e?.response?.data?.error ?? 'Falha no cadastro.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setMessage('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setMessage('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    registerMutation.mutate({ email, password });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
        <div className="text-lg font-bold text-white">📝 Cadastro</div>
        <div className="text-sm text-[#A5F3FC]">Crie sua conta</div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <TextField 
          label="Email" 
          value={email} 
          onChange={setEmail}
          type="email"
          placeholder="seu@email.com"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Mínimo 8 caracteres"
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Digite a senha novamente"
        />

        {message && (
          <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.includes('sucesso') 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] disabled:opacity-60"
        >
          {registerMutation.isPending ? '⏳ Cadastrando...' : '📝 Criar Conta'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-[#36E2B2] hover:text-[#2F58CD] underline"
          >
            Já tem conta? Faça login
          </button>
        </div>
      </form>
    </div>
  );
}