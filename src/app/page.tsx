
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, BookOpen, ChevronDown, Brain, Code, Briefcase } from 'lucide-react'; 
import { cn } from '@/lib/utils';

// Simple SVG decorative elements (can be expanded or replaced with more complex ones)
const WavyLine = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={cn("absolute opacity-10 pointer-events-none", className)} preserveAspectRatio="none">
    <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" fill="transparent" strokeWidth="2" />
  </svg>
);

const PencilBookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={cn("absolute opacity-10 pointer-events-none", className)} fill="currentColor">
    <path d="M15 50 L15 10 L35 10 L35 30 L50 30 L50 50 Z M10 55 L55 55 L55 5 L5 5 Z" /> {/* Book-like shape */}
    <path d="M40 5 L45 0 L50 5 L40 15 Z M38 17 L52 3 L57 8 L43 22 Z" /> {/* Pencil-like shape */}
  </svg>
);


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header Section - Studyhub Style */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 bg-primary shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <BookOpen className="h-8 w-8 text-accent group-hover:text-accent/80 transition-colors" />
            <h1 className="text-3xl font-extrabold text-primary-foreground group-hover:text-primary-foreground/90 transition-colors">
              Setu
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {['Demos', 'Courses', 'Dashboard'].map((item) => (
              <Link key={item} href="#" className="text-primary-foreground hover:text-accent transition-colors flex items-center group">
                {item}
                <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
          <Link href="/auth" passHref>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Studyhub Style */}
      <main className="flex-grow relative overflow-hidden"> {/* Added relative and overflow-hidden for decorative elements */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32 md:py-40 bg-primary relative">
          {/* Decorative elements */}
          <WavyLine className="top-1/4 left-1/4 w-1/4 h-1/4 text-secondary/30 transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
          <PencilBookIcon className="bottom-1/4 right-1/4 w-16 h-16 text-secondary/30 transform translate-x-1/2 translate-y-1/2 -rotate-12" />
           <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background/10 opacity-30"></div>


          <div className="max-w-4xl mx-auto z-10 relative">
            <p className="mb-4 text-lg sm:text-xl font-medium text-accent tracking-wide">
              Personalized Career Guidance System
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-foreground leading-tight">
              Unlock Your <span className="text-accent drop-shadow-md">Engineering Potential</span> with Setu!
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Discover tailored roadmaps, essential skills, and expert guidance to navigate your engineering career path successfully.
            </p>
            <div className="mt-12">
              <Link href="/auth" passHref>
                <Button size="lg" className="text-lg py-7 px-10 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-accent/50 rounded-xl font-semibold">
                  Start Your Assessment
                  <Rocket className="ml-2.5 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section - Adjusted for new theme */}
        <section className="py-16 sm:py-24 bg-background border-y border-border/30"> {/* Changed background to bg-background */}
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-16">Why Choose Setu?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: Brain, title: "Personalized Roadmaps", description: "Tailored guidance based on your unique profile, academic background, and career aspirations.", dataAiHint: "map journey" },
                { icon: Code, title: "Actionable Skill Steps", description: "Clear, manageable tasks with curated resources to help you progress effectively towards your goals.", dataAiHint: "code checklist" },
                { icon: Briefcase, title: "Career-Focused Insights", description: "Identify and acquire the critical technical and soft skills that top employers are looking for.", dataAiHint: "briefcase goal" }
              ].map((feature, index) => (
                 <div key={index} className="p-8 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50" data-ai-hint={feature.dataAiHint}>
                    <div className="flex justify-center items-center mb-6">
                        <div className="p-4 rounded-full bg-primary/10 text-accent">
                            <feature.icon className="h-12 w-12" />
                        </div>
                    </div>
                    <h4 className="text-2xl font-semibold text-card-foreground mb-3">{feature.title}</h4>
                    <p className="text-card-foreground/80 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section - Adjusted for new theme */}
      <footer className="text-center p-8 text-base text-primary-foreground/80 border-t border-border/50 bg-primary"> {/* Changed background to bg-primary and text to text-primary-foreground/80 */}
        © {new Date().getFullYear()} Setu Career Guidance. Your Bridge to a Brighter Future.
      </footer>
    </div>
  );
}

