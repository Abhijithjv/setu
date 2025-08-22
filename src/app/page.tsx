'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, BookOpen, ChevronDown, Brain, Code, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthButton from '@/components/AuthButton';
import { useSession } from 'next-auth/react'; // 👈 Import useSession

// ... (Your WavyLine and PencilBookIcon components are here, no changes needed)
const WavyLine = ({ className }: { className?: string }) => ( <svg viewBox="0 0 100 20" className={cn("absolute opacity-10 pointer-events-none", className)} preserveAspectRatio="none"> <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" fill="transparent" strokeWidth="2" /> </svg> );
const PencilBookIcon = ({ className }: { className?: string }) => ( <svg viewBox="0 0 60 60" className={cn("absolute opacity-10 pointer-events-none", className)} fill="currentColor"> <path d="M15 50 L15 10 L35 10 L35 30 L50 30 L50 50 Z M10 55 L55 55 L55 5 L5 5 Z" /> <path d="M40 5 L45 0 L50 5 L40 15 Z M38 17 L52 3 L57 8 L43 22 Z" /> </svg> );

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Assessment', href: '/assessment' },
];

export default function HomePage() {
  const { data: session } = useSession(); // 👈 Get the user's session status

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 bg-primary shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <BookOpen className="h-8 w-8 text-accent group-hover:text-accent/80 transition-colors" />
            <h1 className="text-3xl font-extrabold text-primary-foreground group-hover:text-primary-foreground/90 transition-colors">Setu</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-primary-foreground hover:text-accent transition-colors flex items-center group">
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow relative overflow-hidden">
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32 md:py-40 bg-primary relative">
          <WavyLine className="top-1/4 left-1/4 w-1/4 h-1/4 text-secondary/30 transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
          <PencilBookIcon className="bottom-1/4 right-1/4 w-16 h-16 text-secondary/30 transform translate-x-1/2 translate-y-1/2 -rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background/10 opacity-30"></div>
          <div className="max-w-4xl mx-auto z-10 relative">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-foreground leading-tight">
              Unlock Your <span className="text-accent drop-shadow-md">Engineering Potential</span> with Setu!
            </h2>
            <div className="mt-12">
              {/* 👇 THIS IS THE UPDATED BUTTON LOGIC 👇 */}
              <Link href={session ? "/assessment" : "/login"} passHref>
                <Button size="lg" className="text-lg py-7 px-10 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-accent/50 rounded-xl font-semibold">
                  Start Your Assessment
                  <Rocket className="ml-2.5 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* ... Features and Footer sections remain the same ... */}
      </main>
      {/* ... */}
    </div>
  );
}