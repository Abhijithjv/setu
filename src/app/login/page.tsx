'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Briefcase, Mail, Key, User, Phone, School, Library, UserCheck, Lock } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  
  // State for the sign-up form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State for the login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      // Pass all the sign-up data
      email,
      password,
      fullName,
      username,
      phone,
      college,
      branch,
      year,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/'); // Redirect to homepage on successful sign-up
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/'); // Redirect to homepage on successful login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-8">
        <Briefcase className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold text-primary mt-2">Setu</h1>
        <p className="text-muted-foreground">Your bridge to a personalized career roadmap.</p>
      </div>
      
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* LOGIN TAB */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="e.g., user@example.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="login-password" type="password" placeholder="Enter your secure password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="pl-10" />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">
                  Login to Your Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SIGN UP TAB */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* All the new fields for sign-up */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="full-name" placeholder="e.g., Ada Lovelace" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" /></div>
                  </div>
                   <div className="space-y-2 col-span-2">
                    <Label htmlFor="email-id">Email ID</Label>
                    <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="email-id" type="email" placeholder="e.g., ada.lovelace@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" /></div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="phone" placeholder="e.g., 9876543210" required value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" /></div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="college">College Name</Label>
                    <div className="relative"><School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="college" placeholder="e.g., Babbage Institute of Techn" required value={college} onChange={(e) => setCollege(e.target.value)} className="pl-10" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Select onValueChange={setBranch}><SelectTrigger><SelectValue placeholder="Select your branch" /></SelectTrigger><SelectContent><SelectItem value="cse">Computer Science</SelectItem><SelectItem value="ise">Information Science</SelectItem><SelectItem value="ece">Electronics</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Year of Study</Label>
                     <Select onValueChange={setYear}><SelectTrigger><SelectValue placeholder="Select your year" /></SelectTrigger><SelectContent><SelectItem value="1">1st Year</SelectItem><SelectItem value="2">2nd Year</SelectItem><SelectItem value="3">3rd Year</SelectItem><SelectItem value="4">4th Year</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="username">Choose Username</Label>
                    <div className="relative"><UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="username" placeholder="e.g., ada_the_first" required value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10" /></div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="password">Create Password</Label>
                    <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" /></div>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}