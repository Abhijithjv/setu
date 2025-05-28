
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import {AssessmentTest} from '../_components/assessment-test';
import {ChevronRight, Compass, ClipboardCheck } from 'lucide-react';

const careerPaths = [
  'Software Development (Web, Mobile, Enterprise)',
  'Data Science, AI & Machine Learning',
  'Cybersecurity & Network Engineering',
  'Cloud Computing & DevOps',
  'VLSI & Semiconductor Design',
  'Embedded Systems & IoT',
  'Power Systems & Renewable Energy',
  'Robotics & Automation',
  'Structural & Civil Engineering Design',
  'Thermal & Mechanical Systems Design',
  'Research & Academia',
  'Technical Management & Consulting',
  'Entrepreneurship (Tech Startup)',
  'Other (Please specify if possible in later steps)',
] as const;

const formSchema = z.object({
  careerPath: z.enum(careerPaths, {
    required_error: 'Please select your primary career interest.',
  }),
});

const assessment2Questions = [
  {
    id: 'q1_tech_domain_passion',
    text: 'Which of these technological domains genuinely excites you the most to work on daily?',
    options: ['Creating user-facing applications and interfaces', 'Extracting insights from large datasets and building predictive models', 'Designing and securing complex systems and networks', 'Building and optimizing scalable cloud infrastructure', 'Designing and testing intricate hardware components (chips, circuits, etc.)', 'Working on the interface between hardware and software (e.g., firmware, IoT devices)'],
  },
  {
    id: 'q2_continuous_learning_drive',
    text: 'The tech field is constantly evolving. How do you feel about the need for continuous learning and upskilling throughout your career?',
    options: ['I thrive on it - I\'m always eager to learn the next new thing!', 'I\'m willing and understand it\'s necessary for growth.', 'Neutral - I\'ll learn as needed for my job.', 'I prefer roles with more stable, less frequently changing skill sets.', 'It feels a bit daunting, to be honest.'],
  },
  {
    id: 'q3_collaboration_style',
    text: 'In a team project, what role do you naturally gravitate towards?',
    options: ['Leading and coordinating the team\'s efforts', 'Focusing on my specific technical tasks independently', 'Collaborating closely with others on shared components', 'Mentoring or helping junior team members', 'A bit of everything, depending on the project needs'],
  },
  {
    id: 'q4_impact_motivation',
    text: 'What primarily motivates you when thinking about your future career\'s impact?',
    options: ['Solving challenging technical problems', 'Creating products or services that many people use', 'Contributing to scientific discovery or technological advancement', 'Achieving financial success and stability', 'Making a positive social or environmental impact', 'Leading and inspiring teams to achieve great things'],
  },
  {
    id: 'q5_risk_tolerance_innovation',
    text: 'How comfortable are you with taking calculated risks or working on innovative, potentially disruptive technologies that may not have a guaranteed outcome?',
    options: ['Very Comfortable - I enjoy pushing boundaries!', 'Comfortable - If the potential reward is high.', 'Neutral - I prefer a balance of stability and innovation.', 'Less Comfortable - I prefer well-established paths and technologies.', 'Not Comfortable - I value security and predictability most.'],
  },
   {
    id: 'q6_long_term_ambition',
    text: 'Looking 5-10 years into your career, what kind of achievement would make you feel most fulfilled?',
    options: ['Becoming a recognized technical expert in my field', 'Leading a large team or department', 'Successfully launching my own tech venture', 'Making a significant contribution to a major project or product', 'Having a stable, well-compensated job with good work-life balance', 'Continuously learning and mastering new skills'],
  },
];

export default function AssessmentStep2Page() {
  const router = useRouter();
  const {toast} = useToast();
  const [showTest, setShowTest] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerPath: undefined,
    },
  });

  function onDetailsSubmit(values: z.infer<typeof formSchema>) {
    console.log('Career Path details submitted:', values);
    setFormData(values);
    setShowTest(true);
    toast({title: 'Career Path Selected', description: 'Now, please complete the final assessment questions.'});
  }

  async function onTestSubmit(answers: Record<string, string>) {
    console.log('Assessment Test 2 submitted with:', answers);
    console.log('Along with career path:', formData);
    
     try {
        const step1DataString = localStorage.getItem('assessmentStep1Data');
        const step1Data = step1DataString ? JSON.parse(step1DataString) : {};
        
        const combinedData = {
            basicDetails: step1Data.details,
            assessment1Answers: step1Data.testAnswers,
            careerPathSelection: formData,
            assessment2Answers: answers
        };
        localStorage.setItem('fullAssessmentData', JSON.stringify(combinedData));
        localStorage.removeItem('assessmentStep1Data'); // Clean up step 1 data
    } catch (error) {
        console.error("Failed to save to localStorage", error);
        toast({
            title: "Error Saving Data",
            description: "There was an issue saving your assessment. Please try again.",
            variant: "destructive",
        });
        return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Slightly longer for "generation" feel

    toast({
      title: 'Assessment Complete!',
      description: 'We are now generating your personalized career roadmap. This might take a moment...',
      duration: 3000,
    });
    router.push('/roadmap'); 
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden border-accent/20">
      <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-t-2xl">
        <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
           {!showTest ? <Compass className="h-8 w-8" /> : <ClipboardCheck className="h-8 w-8" />}
           Step 2: {!showTest ? "Career Aspirations" : "Deep Dive Assessment"}
        </CardTitle>
         {!showTest && (
            <ShadcnCardDescription className="pt-2 text-base text-accent-foreground/90">
                Select your primary career interest. This will help us tailor the final set of questions and your roadmap.
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
                name="careerPath"
                render={({field}) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-lg font-medium text-foreground">Your Desired Career Path</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 text-base border-input focus:border-accent ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <SelectValue placeholder="Select your primary career interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {careerPaths.map((path) => (
                          <SelectItem key={path} value={path} className="text-base py-2.5">
                            {path}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     <FormDescription className="text-sm text-muted-foreground">
                      Choose the area you are most passionate about pursuing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-lg py-7 bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-shadow duration-300"
                disabled={form.formState.isSubmitting}
                size="lg"
              >
                 {form.formState.isSubmitting ? 'Saving Preference...' : 'Proceed to Final Assessment'}
                 {!form.formState.isSubmitting && <ChevronRight className="ml-2 h-6 w-6" />}
              </Button>
            </form>
          </Form>
        ) : (
           <AssessmentTest
            title="Deep Dive Assessment"
            questions={assessment2Questions} 
            onSubmit={onTestSubmit}
            submitButtonText="Submit & Generate My Roadmap"
          />
        )}
      </CardContent>
    </Card>
  );
}
