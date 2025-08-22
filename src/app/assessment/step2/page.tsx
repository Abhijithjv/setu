'use client';

import { Button } from '@/components/ui/button';
import { AssessmentTest } from '../_components/assessment-test';
import { useAssessment } from '../_components/assessment-context';

const step2Questions = [
  {
    id: 'q1',
    text: 'How comfortable are you with fundamental programming concepts (e.g., variables, loops, functions, basic data structures)?',
    options: [
      'Very Comfortable - I can build small projects',
      'Comfortable - I understand the basics well',
      'Neutral - I know some concepts but need practice',
      'Uncomfortable - I find it challenging',
      'Not Applicable - I haven\'t started programming yet',
    ],
  },
  {
    id: 'q2',
    text: 'Are you fascinated by how physical devices work or enjoy hands-on activities like building circuits or mechanical systems?',
    options: [
      'Very Fascinated - I love tinkering with hardware!',
      'Fascinated - It interests me quite a bit',
      'Neutral - I\'m open to it but not my primary interest',
      'Not Really - I prefer software or theoretical work',
      'Unsure',
    ],
  },
  {
    id: 'q3',
    text: 'When faced with a complex problem, what is your typical approach?',
    options: [
      'Dive deep into research and theoretical understanding',
      'Break it down and try practical solutions immediately',
      'Collaborate with others to brainstorm ideas',
      'A mix of theoretical analysis and practical experimentation',
      'I tend to get overwhelmed initially',
    ],
  },
  {
    id: 'q4',
    text: 'How much do you enjoy activities that involve logical reasoning, mathematical puzzles, or algorithmic thinking?',
    options: [
      'Love it - These are my favorite types of challenges!',
      'Enjoy it - I find them stimulating',
      'Neutral - I can do them if required',
      'Not much - I prefer less abstract tasks',
      'Strongly Dislike It',
    ],
  },
  {
    id: 'q5',
    text: 'How do you prefer to learn new technical skills or concepts?',
    options: [
      'Through structured courses and textbooks',
      'By working on hands-on projects and examples',
      'By watching video tutorials and practical demonstrations',
      'Through collaborative study groups and discussions',
      'A combination of all the above',
    ],
  },
  {
    id: 'q6',
    text: 'What kind of work environment do you envision for yourself in the future?',
    options: [
      'A fast-paced startup environment with innovative projects',
      'A large, established company with structured career growth',
      'A research-oriented role in academia or an R&D lab',
      'A role that allows for significant fieldwork or on-site work',
      'I\'m still exploring and open to different environments',
    ],
  },
];


export default function Step2() {
  const { prevStep, nextStep, saveAnswer } = useAssessment();

  return (
    <div className="space-y-6">
      {step2Questions.map((q) => (
        <AssessmentTest key={q.id} question={q} onValueChange={(value) => saveAnswer(q.id, value)} />
      ))}
      <div className="flex justify-between">
        <Button onClick={prevStep} size="lg" variant="outline">Previous Step</Button>
        <Button onClick={nextStep} size="lg">Next Step</Button>
      </div>
    </div>
  );
}