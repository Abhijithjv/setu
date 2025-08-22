'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAssessment } from '../_components/assessment-context';
import { ChevronRight } from 'lucide-react';

export default function Step3() {
  const { prevStep, nextStep, saveAnswer } = useAssessment();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-yellow-400 border-yellow-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Step 3: Career Aspirations</CardTitle>
        <CardDescription className="text-gray-700">
          Select your primary career interest. This will help us tailor the final set of questions and your roadmap.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-semibold text-gray-800">Your Desired Career Path</Label>
          <Select onValueChange={(value) => saveAnswer('careerPath', value)}>
            <SelectTrigger className="bg-gray-800 text-white">
              <SelectValue placeholder="Select your primary career interest" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="swe">Software Development (Web, Mobile, Enterprise)</SelectItem>
              <SelectItem value="ai-ml">Data Science, AI & Machine Learning</SelectItem>
              <SelectItem value="cybersec">Cybersecurity & Network Engineering</SelectItem>
              <SelectItem value="cloud">Cloud Computing & DevOps</SelectItem>
              <SelectItem value="vlsi">VLSI & Semiconductor Design</SelectItem>
              <SelectItem value="embedded">Embedded Systems & IoT</SelectItem>
              <SelectItem value="power">Power Systems & Renewable Energy</SelectItem>
              <SelectItem value="robotics">Robotics & Automation</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-700">Choose the area you are most passionate about pursuing.</p>
        </div>

        <Button onClick={nextStep} size="lg" className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
          Proceed to Final Assessment
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}