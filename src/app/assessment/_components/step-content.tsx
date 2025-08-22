'use client';
import { useAssessment } from './assessment-context';
import Step1 from '../step1/page';
import Step2 from '../step2/page';
import Step3 from '../step3/page'; 
import Step4 from '../step4/page';

export function StepContent() {
  const { currentStep } = useAssessment();
  if (currentStep === 1) return <Step1 />;
  if (currentStep === 2) return <Step2 />;
  if (currentStep === 3) return <Step3 />; // 👈 Add this
  if (currentStep === 4) return <Step4 />; // 👈 Add this
  return <div>Unknown step</div>;
}