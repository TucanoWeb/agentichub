import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword, resetPassword } from '../../api/auth';
import { TextField } from '../Form';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setMessage('Se o email existir, um token foi enviado. Verifique sua caixa de entrada.');
      setStep('reset');
    },
    onError: () => {
      setMessage('Falha ao solicitar reset de senha.');
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setMessage('Senha resetada com sucesso! Você pode agora fazer login.');
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      setMessage(e?.response?.data?.error ?? 'Falha ao resetar senha.');
    },
  });

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Digite seu email.');
      return;
    }
    forgotMutation.mutate({ email });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !newPassword || !confirmPassword) {
      setMessage('Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }

    resetMutation.mutate({ token, newPassword });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
        <div className="text-lg font-bold text-white">
          {step === 'request' ? '📧 Esqueci minha senha' : '🔄 Resetar senha'}
        </div>
        <div className="text-sm text-[#A5F3FC]">
          {step === 'request' 
            ? 'Solicite um token de reset'
            : 'Digite o token e sua nova senha'
          }
        </div>
      </div>
      
      {step === 'request' ? (
        <form onSubmit={handleRequestReset} className="p-6 space-y-4">
          <TextField 
            label="Email" 
            value={email} 
            onChange={setEmail}
            type="email"
            placeholder="Digite o email da sua conta"
          />

          {message && (
            <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
              message.includes('enviado') 
                ? 'bg-[#A5F3FC]/30 text-[#2F58CD] border border-[#36E2B2]'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={forgotMutation.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] disabled:opacity-60"
          >
            {forgotMutation.isPending ? '⏳ Enviando...' : '📧 Solicitar Token'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="p-6 space-y-4">
          <TextField 
            label="Token de Reset" 
            value={token} 
            onChange={setToken}
            placeholder="Token recebido por email"
          />
          <TextField
            label="Nova Senha"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Mínimo 8 caracteres"
          />
          <TextField
            label="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Digite a nova senha novamente"
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
            disabled={resetMutation.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[#36E2B2] hover:to-[#2F58CD] disabled:opacity-60"
          >
            {resetMutation.isPending ? '⏳ Resetando...' : '🔄 Resetar Senha'}
          </button>

          <button
            type="button"
            onClick={() => setStep('request')}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 transition-all hover:bg-slate-50"
          >
            ← Voltar para solicitar token
          </button>
        </form>
      )}

      <div className="border-t border-slate-200 p-4 text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-slate-600 hover:text-slate-800 underline"
        >
          ← Voltar para o login
        </button>
      </div>
    </div>
  );
}