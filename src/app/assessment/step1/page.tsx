
'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle, CardDescription as ShadcnCardDescription} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {AssessmentTest} from '../_components/assessment-test'; // Shared component for tests
import {ChevronRight, ClipboardList, BookUser } from 'lucide-react';

const branches = [
  'Computer Science & Engineering (CSE)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Artificial Intelligence & Machine Learning (AIML)',
  'Artificial Intelligence & Data Science (AIDS)',
  'Other',
] as const;
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated'] as const;

const formSchema = z.object({
  branch: z.enum(branches, {required_error: 'Please select your branch.'}),
  year: z.enum(years, {required_error: 'Please select your year of study.'}),
});

const assessment1Questions = [
  {
    id: 'q1_comfort_programming',
    text: 'How comfortable are you with fundamental programming concepts (e.g., variables, loops, functions, basic data structures)?',
    options: ['Very Comfortable - I can build small projects', 'Comfortable - I understand the basics well', 'Neutral - I know some concepts but need practice', 'Uncomfortable - I find it challenging', 'Not Applicable - I haven\'t started programming yet'],
  },
  {
    id: 'q2_interest_hardware',
    text: 'Are you fascinated by how physical devices work or enjoy hands-on activities like building circuits or mechanical systems?',
    options: ['Very Fascinated - I love tinkering with hardware!', 'Fascinated - It interests me quite a bit', 'Neutral - I\'m open to it but not my primary interest', 'Not Really - I prefer software or theoretical work', 'Unsure'],
  },
  {
    id: 'q3_problem_solving_approach',
    text: 'When faced with a complex problem, what is your typical approach?',
    options: ['Dive deep into research and theoretical understanding', 'Break it down and try practical solutions immediately', 'Collaborate with others to brainstorm ideas', 'A mix of theoretical analysis and practical experimentation', 'I tend to get overwhelmed initially'],
  },
  {
    id: 'q4_math_logic_enjoyment',
    text: 'How much do you enjoy activities that involve logical reasoning, mathematical puzzles, or algorithmic thinking?',
    options: ['Love it - These are my favorite types of challenges!', 'Enjoy it - I find them stimulating', 'Neutral - I can do them if required', 'Not much - I prefer less abstract tasks', 'Strongly Dislike It'],
  },
  {
    id: 'q5_learning_preference',
    text: 'How do you prefer to learn new technical skills or concepts?',
    options: ['Through structured courses and textbooks', 'By working on hands-on projects and examples', 'By watching video tutorials and practical demonstrations', 'Through collaborative study groups and discussions', 'A combination of all the above'],
  },
  {
    id: 'q6_work_environment_preference',
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

export default function AssessmentStep1Page() {
  const router = useRouter();
  const {toast} = useToast();
  const [showTest, setShowTest] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: undefined,
      year: undefined,
    },
  });

  function onDetailsSubmit(values: z.infer<typeof formSchema>) {
    console.log('Branch/Year details submitted:', values);
    setFormData(values);
    setShowTest(true);
    toast({title: 'Details Saved', description: 'Now, please complete the initial assessment test.'});
  }

  async function onTestSubmit(answers: Record<string, string>) {
    // Simulate API call to save details and test answers
    console.log('Assessment Test 1 submitted with:', answers);
    console.log('Along with details:', formData);
    // Store data in localStorage (example, replace with actual API call)
    try {
        localStorage.setItem('assessmentStep1Data', JSON.stringify({details: formData, testAnswers: answers}));
    } catch (error) {
        console.error("Failed to save to localStorage", error);
    }
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Assessment 1 Complete!',
      description: 'Your responses have been saved. Proceeding to the next step.',
      variant: 'default', 
    });
    router.push('/assessment/step2');
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden border-primary/20">
      <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-t-2xl">
        <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
          {!showTest ? <BookUser className="h-8 w-8" /> : <ClipboardList className="h-8 w-8" />}
          Step 1: {!showTest ? "Your Academic Background" : "Initial Aptitude Assessment"}
        </CardTitle>
        {!showTest && (
            <ShadcnCardDescription className="pt-2 text-base text-primary-foreground/90">
                Tell us about your current academic standing. This helps us personalize your career plan.
            </ShadcnCardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6 sm:p-8 bg-card">
        {!showTest ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onDetailsSubmit)}
              className="space-y-8" 
            >
              <FormField
                control={form.control}
                name="branch"
                render={({field}) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-lg font-medium text-foreground">Your Engineering Branch</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 text-base border-input focus:border-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <SelectValue placeholder="Select your branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch} className="text-base py-2.5">
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-sm text-muted-foreground">
                      Choose the branch you are currently enrolled in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({field}) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-lg font-medium text-foreground">Your Year of Study</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 text-base border-input focus:border-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <SelectValue placeholder="Select your current year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year} className="text-base py-2.5">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-sm text-muted-foreground">
                      Select your current academic year.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-lg py-7 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-300"
                disabled={form.formState.isSubmitting}
                size="lg"
              >
                {form.formState.isSubmitting ? 'Saving Details...' : 'Proceed to Assessment Test'}
                {!form.formState.isSubmitting && <ChevronRight className="ml-2 h-6 w-6" />}
              </Button>
            </form>
          </Form>
        ) : (
          <AssessmentTest
            title="Initial Aptitude Assessment"
            questions={assessment1Questions}
            onSubmit={onTestSubmit}
            submitButtonText="Submit & Continue to Next Step"
          />
        )}
      </CardContent>
    </Card>
  );
}
