'use client';

import {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react'; // Changed icon

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface AssessmentTestProps {
  title: string;
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => Promise<void>;
  submitButtonText?: string;
}

const createSchema = (questions: Question[]) => {
  const shape: Record<string, z.ZodString> = {};
  questions.forEach((q) => {
    shape[q.id] = z.string({required_error: 'Please select an option to continue.'});
  });
  return z.object(shape);
};

export function AssessmentTest({
  title,
  questions,
  onSubmit,
  submitButtonText = 'Submit Assessment',
}: AssessmentTestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSchema = createSchema(questions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 text-center sm:text-left">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground pt-1 text-base">
          Your thoughtful answers will help us create the best plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0 pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8" 
          >
            {questions.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id}
                render={({field}) => (
                  <FormItem className="space-y-3 p-4 sm:p-6 border border-border/70 rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <FormLabel className="font-semibold text-lg sm:text-xl text-foreground">
                       <span className="text-primary mr-2">{index + 1}.</span>{question.text}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2.5 pt-2"
                      >
                        {question.options.map((option) => (
                          <FormItem
                            key={option}
                            className="flex items-center space-x-3.5 space-y-0 p-3.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer border border-transparent has-[:checked]:bg-accent/10 has-[:checked]:border-accent"
                            onClick={() => field.onChange(option)} 
                          >
                            <FormControl>
                              <RadioGroupItem 
                                value={option} 
                                checked={field.value === option} 
                                className="border-primary/50 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-base sm:text-lg text-foreground/90 cursor-pointer flex-1">
                              {option}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-sm pt-1" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              className="w-full text-lg py-7 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground mt-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-accent focus:ring-offset-2" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Processing Your Answers...' : (
                <>
                  <Zap className="mr-2.5 h-5 w-5 animate-pulse"/> {submitButtonText}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}