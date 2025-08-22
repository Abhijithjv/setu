'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAssessment } from '../_components/assessment-context';
import { ChevronRight } from 'lucide-react';

export default function Step1() {
  const { nextStep, saveAnswer } = useAssessment();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Step 1: Your Academic Background</CardTitle>
        <CardDescription>
          Tell us about your current academic standing. This helps us personalize your career plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-semibold">Your Engineering Branch</Label>
          <Select onValueChange={(value) => saveAnswer('branch', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cse">Computer Science & Engineering</SelectItem>
              <SelectItem value="ise">Information Science & Engineering</SelectItem>
              <SelectItem value="ece">Electronics & Communication Engineering</SelectItem>
              <SelectItem value="mech">Mechanical Engineering</SelectItem>
              <SelectItem value="civil">Civil Engineering</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Choose the branch you are currently enrolled in.</p>
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-semibold">Your Year of Study</Label>
          <Select onValueChange={(value) => saveAnswer('year', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your current year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Select your current academic year.</p>
        </div>

        <Button onClick={nextStep} size="lg" className="w-full mt-4">
          Proceed to Assessment Test
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}