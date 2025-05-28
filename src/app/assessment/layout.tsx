import type {ReactNode} from 'react';

export default function AssessmentLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/15 to-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Placeholder for a logo if needed in future, e.g. an SVG icon */}
            {/* <div className="p-2 rounded-full bg-primary/10">
                <Briefcase className="h-7 w-7 text-primary" /> 
            </div> */}
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-tight">
              Setu
            </h1>
          </div>
          {/* Optional: User avatar or settings icon */}
          {/* <div className="h-11 w-11 bg-muted rounded-full shadow-inner border border-border/50"></div> */}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-10">
        <div className="max-w-4xl mx-auto py-4 sm:py-6"> {/* Increased max-width and padding */}
          {children}
        </div>
      </main>
      <footer className="text-center p-8 text-base text-muted-foreground border-t border-border/60 bg-background/90 backdrop-blur-md shadow-inner">
        © {new Date().getFullYear()} Setu Career Guidance. Your Bridge to a Brighter Future.
      </footer>
    </div>
  );
}