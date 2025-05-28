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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import {UserPlus, User, Mail, Phone, School, Library, Briefcase, KeyRound, UserCircle } from 'lucide-react'; // Added more icons

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
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  email: z.string().email({message: 'Please enter a valid email address.'}),
  phone: z
    .string()
    .min(10, {message: 'Phone number must be at least 10 digits.'})
    .regex(/^\d+$/, {message: 'Phone number must contain only digits.'}),
  collegeName: z.string().min(3, {message: 'College name must be at least 3 characters.'}),
  branch: z.enum(branches, {
    errorMap: () => ({message: 'Please select your engineering branch.'}),
  }),
  year: z.enum(years, {
    errorMap: () => ({message: 'Please select your current year of study.'}),
  }),
  username: z.string().min(3, {message: 'Username must be at least 3 characters.'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters.'}), // Increased min length
});

export function SignUpForm() {
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      collegeName: '',
      branch: undefined,
      year: undefined,
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Sign up attempt:', values);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Account Created Successfully!',
      description: 'Welcome aboard! You can now start your assessment.',
      variant: 'default', 
    });
    router.push('/assessment/step1');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="relative">
                <FormLabel className="text-base">Full Name</FormLabel>
                 <User className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input placeholder="e.g., Ada Lovelace" {...field} className="h-12 pl-10 text-base peer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="relative">
                <FormLabel className="text-base">Email ID</FormLabel>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g., ada.lovelace@example.com"
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
            name="phone"
            render={({field}) => (
              <FormItem className="relative">
                <FormLabel className="text-base">Phone Number</FormLabel>
                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="e.g., 9876543210"
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
            name="collegeName"
            render={({field}) => (
              <FormItem className="relative">
                <FormLabel className="text-base">College Name</FormLabel>
                <School className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input placeholder="e.g., Babbage Institute of Technology" {...field} className="h-12 pl-10 text-base peer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Library className="mr-2 h-5 w-5 text-muted-foreground" />Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select your engineering branch" />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />Year of Study</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 text-base">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem className="relative">
                <FormLabel className="text-base">Choose Username</FormLabel>
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input placeholder="e.g., ada_the_first" {...field} className="h-12 pl-10 text-base peer"/>
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
                <FormLabel className="text-base">Create Password</FormLabel>
                 <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/3 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Min. 8 characters"
                    {...field}
                    className="h-12 pl-10 text-base peer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-lg py-7 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-accent focus:ring-offset-2"
          disabled={form.formState.isSubmitting}
          size="lg"
        >
          {form.formState.isSubmitting ? (
            'Creating Your Account...'
          ) : (
            <>
              <UserPlus className="mr-2.5 h-5 w-5" /> Create Account & Start Journey
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}