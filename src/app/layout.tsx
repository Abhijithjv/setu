import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed from GeistSans to Inter for a more standard, highly readable font
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {ReactQueryProvider} from '@/components/react-query-provider'; 

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Setu Career Planner',
  description: 'Your personalized career roadmap, bridging aspirations with achievements.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-sans antialiased bg-gradient-to-br from-background via-background to-secondary/5 min-h-screen flex flex-col"> {/* Subtle gradient */}
        <ReactQueryProvider>
          <div className="flex-grow flex flex-col"> {/* Ensure children can grow */}
            {children}
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}