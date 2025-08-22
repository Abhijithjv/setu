'use client';
import { useAssessment } from './assessment-context';
import { cn } from '@/lib/utils';

export function AssessmentStepper() {
  const { currentStep, totalSteps } = useAssessment();
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div className={cn('h-8 w-8 rounded-full flex items-center justify-center font-bold', step === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
            {step}
          </div>
          <span className={cn('font-semibold', step === currentStep ? 'text-primary' : 'text-muted-foreground')}>
            Step {step}
          </span>
          {step < totalSteps && <div className="h-0.5 w-16 bg-muted"></div>}
        </div>
      ))}
    </div>
  );
}