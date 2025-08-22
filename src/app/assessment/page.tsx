'use client';

// This file acts as the main entry point for the assessment.
// It sets up the context provider and renders the main components.

import { AssessmentProvider } from './_components/assessment-context';
import { AssessmentStepper } from './_components/assessment-stepper';
import { StepContent } from './_components/step-content';

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <main className="container mx-auto my-12 flex flex-col items-center gap-8 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Career Path Assessment
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Answer the following questions to help us tailor a personalized roadmap
          for your engineering career.
        </p>
        <div className="w-full max-w-4xl">
          <AssessmentStepper />
          <div className="mt-8">
            <StepContent />
          </div>
        </div>
      </main>
    </AssessmentProvider>
  );
}