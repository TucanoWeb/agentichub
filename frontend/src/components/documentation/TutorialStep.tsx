import { type ReactNode } from 'react';

interface TutorialStepProps {
  stepNumber: number;
  title: string;
  gradientDirection?: 'normal' | 'reverse';
  children: ReactNode;
}

export default function TutorialStep({ 
  stepNumber, 
  title, 
  gradientDirection = 'normal',
  children 
}: TutorialStepProps) {
  const gradientClass = gradientDirection === 'reverse' 
    ? 'bg-gradient-to-r from-[#36E2B2] to-[#2F58CD]'
    : 'bg-gradient-to-r from-[#2F58CD] to-[#36E2B2]';

  const iconColor = gradientDirection === 'reverse' ? 'text-[#36E2B2]' : 'text-[#2F58CD]';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className={`${gradientClass} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold ${iconColor}`}>
            {stepNumber}
          </span>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
}