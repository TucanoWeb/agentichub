import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth';
import { TextField } from '../Form';

interface LoginFormProps {
  onSuccess: (token: string) => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister, onSwitchToForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      onSuccess(data.token);
      setMessage('Login realizado com sucesso!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      setMessage(e?.response?.data?.error ?? 'Falha no login.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Preencha todos os campos.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
        <div className="text-lg font-bold text-white">🔑 Login</div>
        <div className="text-sm text-[#A5F3FC]">Entre em sua conta</div>
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
          placeholder="Sua senha"
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
          disabled={loginMutation.isPending}
          className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] disabled:opacity-60"
        >
          {loginMutation.isPending ? '⏳ Entrando...' : '🔑 Entrar'}
        </button>

        <div className="space-y-2 text-center">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-sm text-[#36E2B2] hover:text-[#2F58CD] underline"
          >
            Não tem conta? Cadastre-se
          </button>
          
          <br />
          
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-slate-600 hover:text-slate-800 underline"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </form>
    </div>
  );
}