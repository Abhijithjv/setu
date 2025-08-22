'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAssessment } from './assessment-context'; // 👈 Import the context
import { cn } from "@/lib/utils"; // 👈 Import cn for conditional classes

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface AssessmentTestProps {
  question: Question;
  onValueChange: (value: string) => void;
}

export function AssessmentTest({ question, onValueChange }: AssessmentTestProps) {
  const { isSelected } = useAssessment(); // 👈 Get the isSelected function

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={onValueChange}>
          {question.options.map((option) => (
            // 👇 This div will now have conditional styling
            <div 
              key={option} 
              className={cn(
                "flex items-center space-x-2 p-3 rounded-md transition-colors",
                isSelected(question.id, option) 
                  ? "bg-primary/20 border border-yellow-500" // Style for selected
                  : "border border-yellow-500" // Style for not selected
              )}
            >
              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
              <Label htmlFor={`${question.id}-${option}`} className="w-full cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}