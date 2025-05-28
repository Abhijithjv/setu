'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {LogIn, Mail, KeyRound } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, {message: 'Username or Email is required.'}), // Changed to Username or Email
  password: z
    .string()
    .min(6, {message: 'Password must be at least 6 characters.'}),
});

export function LoginForm() {
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Login attempt:', values);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Login Successful!',
      description: `Welcome back, ${values.username}! Redirecting...`,
      variant: 'default', // Ensure this variant exists or use a success-like one
    });
    router.push('/assessment/step1'); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem className="relative">
              <FormLabel className="text-base">Username or Email</FormLabel>
               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
              <FormControl>
                <Input 
                  placeholder="e.g., yourusername or user@example.com" 
                  {...field} 
                  className="h-12 pl-10 text-base peer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem className="relative">
              <FormLabel className="text-base">Password</FormLabel>
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your secure password"
                  {...field}
                  className="h-12 pl-10 text-base peer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-lg py-7 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={form.formState.isSubmitting}
          size="lg"
        >
          {form.formState.isSubmitting ? (
            'Authenticating...'
          ) : (
            <>
              <LogIn className="mr-2.5 h-5 w-5" /> Login to Your Account
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}