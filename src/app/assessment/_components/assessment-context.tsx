'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Answers = {
  [key: string]: string;
};

interface AssessmentContextType {
  currentStep: number;
  totalSteps: number;
  answers: Answers;
  saveAnswer: (questionId: string, answer: string) => void;
  isSelected: (questionId: string, option: string) => boolean; // 👈 Add this
  nextStep: () => void;
  prevStep: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});

  const saveAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // 👇 This new function checks if an option is the currently selected answer for a question
  const isSelected = (questionId: string, option: string) => {
    return answers[questionId] === option;
  };

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };

  const value = { currentStep, totalSteps, answers, saveAnswer, isSelected, nextStep, prevStep };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) throw new Error('useAssessment must be used within an AssessmentProvider');
  return context;
}