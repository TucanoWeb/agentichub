import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { setToken } from '../../store/authSlice';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type AuthStep = 'login' | 'register' | 'forgot-password';

interface AuthContainerProps {
  onLoginSuccess?: () => void;
}

export function AuthContainer({ onLoginSuccess }: AuthContainerProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLoginSuccess = (token: string) => {
    dispatch(setToken(token));
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    onLoginSuccess?.();
  };

  const handleRegisterSuccess = () => {
    setCurrentStep('login');
  };

  const switchToLogin = () => setCurrentStep('login');
  const switchToRegister = () => setCurrentStep('register');
  const switchToForgotPassword = () => setCurrentStep('forgot-password');

  return (
    <div className="max-w-md mx-auto">
      {currentStep === 'login' && (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={switchToRegister}
          onSwitchToForgotPassword={switchToForgotPassword}
        />
      )}
      
      {currentStep === 'register' && (
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={switchToLogin}
        />
      )}
      
      {currentStep === 'forgot-password' && (
        <ForgotPasswordForm
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  );
}