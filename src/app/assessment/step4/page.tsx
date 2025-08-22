'use client';

import { Button } from '@/components/ui/button';
import { AssessmentTest } from '../_components/assessment-test';
import { useAssessment } from '../_components/assessment-context';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

const step4Questions = [
    { id: 'q7', text: 'Which of these technological domains genuinely excites you the most to work on daily?', options: [ 'Creating user-facing applications and interfaces', 'Extracting insights from large datasets and building predictive models', 'Designing and securing complex systems and networks', 'Building and optimizing scalable cloud infrastructure', 'Designing and testing intricate hardware components (chips, circuits, etc.)', 'Working on the interface between hardware and software (e.g., firmware, IoT devices)', ], },
    { id: 'q8', text: 'The tech field is constantly evolving. How do you feel about the need for continuous learning and upskilling throughout your career?', options: [ 'I thrive on it - I\'m always eager to learn the next new thing!', 'I\'m willing and understand it\'s necessary for growth.', 'Neutral - I\'ll learn as needed for my job.', 'I prefer roles with more stable, less frequently changing skill sets.', 'It feels a bit daunting, to be honest.', ], },
    { id: 'q9', text: 'In a team project, what role do you naturally gravitate towards?', options: [ 'Leading and coordinating the team\'s efforts', 'Focusing on my specific technical tasks independently', 'Collaborating closely with others on shared components', 'Mentoring or helping junior team members', 'A bit of everything, depending on the project needs', ], },
    { id: 'q10', text: 'What primarily motivates you when thinking about your future career\'s impact?', options: [ 'Solving challenging technical problems', 'Creating products or services that many people use', 'Contributing to scientific discovery or technological advancement', 'Achieving financial success and stability', 'Making a positive social or environmental impact', 'Leading and inspiring teams to achieve great things', ], },
    { id: 'q11', text: 'How comfortable are you with taking calculated risks or working on innovative, potentially disruptive technologies that may not have a guaranteed outcome?', options: [ 'Very Comfortable - I enjoy pushing boundaries!', 'Comfortable - If the potential reward is high.', 'Neutral - I prefer a balance of stability and innovation.', 'Less Comfortable - I prefer well-established paths and technologies.', 'Not Comfortable - I value security and predictability most.', ], },
    { id: 'q12', text: 'Looking 5-10 years into your career, what kind of achievement would make you feel most fulfilled?', options: [ 'Becoming a recognized technical expert in my field', 'Leading a large team or department', 'Successfully launching my own tech venture', 'Making a significant contribution to a major project or product', 'Having a stable, well-compensated job with good work-life balance', 'Continuously learning and mastering new skills', ], },
];

export default function Step4() {
  const { prevStep, saveAnswer, answers } = useAssessment();
  const router = useRouter();

  const handleSubmit = () => {
    // We store the final answers in localStorage so the roadmap page can access them
    localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
    router.push('/roadmap');
  };

  return (
    <div className="space-y-6">
      {step4Questions.map((q) => (
        <AssessmentTest key={q.id} question={q} onValueChange={(value) => saveAnswer(q.id, value)} />
      ))}
      <div className="flex justify-between items-center mt-8">
        <Button onClick={prevStep} size="lg" variant="outline">Previous Step</Button>
        <Button onClick={handleSubmit} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Zap className="mr-2 h-5 w-5" />
          Submit & Generate My Roadmap
        </Button>
      </div>
    </div>
  );
}