'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {LoginForm} from './_components/login-form';
import {SignUpForm} from './_components/signup-form';
import { Briefcase } from 'lucide-react'; // Example icon

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-tr from-primary/10 via-background to-accent/10">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl bg-card/95 backdrop-blur-lg border-border/30 overflow-hidden">
        <CardHeader className="text-center p-6 sm:p-8 bg-gradient-to-b from-muted/30 to-transparent">
           <div className="flex justify-center items-center mb-5">
             <div className="p-3 rounded-full bg-primary/80 shadow-lg">
                <Briefcase className="h-10 w-10 text-primary-foreground" />
             </div>
          </div>
          <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent tracking-tight">
            Setu
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-2 text-base sm:text-lg">
            Your bridge to a personalized career roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-muted/70 rounded-lg shadow-inner">
              <TabsTrigger value="login" className="text-base sm:text-lg data-[state=active]:bg-background data-[state=active]:shadow-xl data-[state=active]:text-primary font-medium h-full rounded-md">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-base sm:text-lg data-[state=active]:bg-background data-[state=active]:shadow-xl data-[state=active]:text-primary font-medium h-full rounded-md">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}