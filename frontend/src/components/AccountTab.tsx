import { useQueryClient } from '@tanstack/react-query';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';
import { AuthContainer } from './auth';

interface AccountTabProps {
  token: string | null;
  onLoginSuccess: () => void;
}

export function AccountTab({ token, onLoginSuccess }: AccountTabProps) {
  const dispatch = useReduxDispatch();
  const queryClient = useQueryClient();

  if (!token) {
    return <AuthContainer onLoginSuccess={onLoginSuccess} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] px-6 py-4">
          <div className="text-lg font-bold text-white">✅ Conectado</div>
          <div className="text-sm text-[#A5F3FC]">Você está autenticado</div>
        </div>
        <div className="p-6 text-center">
          <p className="text-slate-600 mb-4">Você está autenticado com sucesso!</p>
          <button
            className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
            onClick={() => {
              dispatch(setToken(null));
              queryClient.clear();
              onLoginSuccess(); // This will redirect to home
            }}
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </div>
  );
}