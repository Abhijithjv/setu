
'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ListTodo, Target, ArrowLeft, BarChart3, Activity, ThumbsUp, Hourglass } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';


// Fallback/default tasks if no specific roadmap tasks are found or for initial structure
const fallbackTasks = [
    {id: 'ft1', text: 'Define career goals', completed: false, milestone: 'Planning'},
    {id: 'ft2', text: 'Research required skills', completed: false, milestone: 'Research'},
    {id: 'ft3', text: 'Start first learning module', completed: false, milestone: 'Learning'},
];

// --- Mock Data (Copied from roadmap/page.tsx for fallback) ---
interface Resource {
  name: string;
  url: string;
}

const defaultRoadmapData = {
  careerPath: 'Software Development',
  summary: "This roadmap outlines key milestones to become a proficient Software Developer. It focuses on foundational programming, web technologies, and backend systems. Consistent learning and project work are crucial.",
  milestones: [
    {
      id: 'm1',
      title: 'Foundation: Programming & CS Basics (Year 1)',
      timeline: '3-4 Months',
      description: "Establish a strong understanding of core programming principles and computer science fundamentals. This is the bedrock for all future learning.",
      tasks: [
        {id: 't1', text: 'Master Python: variables, control flow, functions, OOP basics.', completed: false},
        {id: 't2', text: 'Learn Data Structures: Arrays, Lists, Stacks, Queues, Trees, Graphs.', completed: false},
        {id: 't3', text: 'Understand Algorithms: Sorting, Searching, Big O notation.', completed: false},
        {id: 't4', text: 'Build 3 console-based projects (e.g., calculator, to-do list, simple text game).', completed: false},
      ],
      resources: [
        {name: 'Python.org Official Tutorial', url: 'https://docs.python.org/3/tutorial/'},
        {name: 'GeeksforGeeks Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/'},
        {name: 'Khan Academy Algorithms', url: 'https://www.khanacademy.org/computing/computer-science/algorithms'},
      ] as Resource[],
    },
    {
      id: 'm2',
      title: 'Frontend Web Development (Year 1/2)',
      timeline: '4-6 Months',
      description: "Learn to build interactive and visually appealing user interfaces for web applications.",
      tasks: [
        {id: 't5', text: 'Master HTML5 & CSS3: Semantic HTML, Flexbox, Grid, Responsive Design.', completed: false},
        {id: 't6', text: 'Deep dive into JavaScript: ES6+, DOM, Events, Async/Await, APIs.', completed: false},
        {id: 't7', text: 'Learn a modern frontend framework (e.g., React, Vue, or Angular).', completed: false},
        {id: 't8', text: 'Build 2-3 interactive frontend projects (e.g., portfolio, weather app, e-commerce UI).', completed: false},
        {id: 't9', text: 'Understand Git & GitHub for version control.', completed: false},
      ],
      resources: [
        {name: 'MDN Web Docs (HTML, CSS, JS)', url: 'https://developer.mozilla.org/en-US/docs/Web'},
        {name: 'React.dev (Official React Docs)', url: 'https://react.dev/'},
        {name: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/'},
      ] as Resource[],
    },
     {
      id: 'm3',
      title: 'Backend Development & Databases (Year 2/3)',
      timeline: '6-8 Months',
      description: "Understand how to build server-side logic, manage data, and create robust APIs.",
      tasks: [
        {id: 't10', text: 'Learn a backend language & framework (e.g., Node.js/Express, Python/Django, Java/Spring).', completed: false},
        {id: 't11', text: 'Understand RESTful API design principles.', completed: false},
        {id: 't12', text: 'Learn SQL & a relational database (e.g., PostgreSQL, MySQL).', completed: false},
        {id: 't13', text: 'Explore NoSQL databases (e.g., MongoDB) and their use cases.', completed: false},
        {id: 't14', text: 'Build a full-stack application with user authentication and database integration.', completed: false},
      ],
      resources: [
        {name: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs/'},
        {name: 'SQLZoo - Interactive SQL Tutorial', url: 'https://sqlzoo.net/'},
        {name: 'MongoDB University', url: 'https://learn.mongodb.com/'},
      ] as Resource[],
    },
  ],
};
// --- End Mock Data ---


interface Task {
  id: string;
  text: string;
  completed: boolean;
  milestone: string; // Or consider milestone ID/title
}

interface MilestoneData { // From roadmap structure
  id: string;
  title: string;
  tasks: Array<Omit<Task, 'milestone'> & {milestone?: string}>; // milestone might be redundant here if taken from MilestoneData title
  // The following fields are part of defaultRoadmapData but not strictly used by dashboard logic beyond parsing.
  timeline?: string;
  description?: string;
  resources?: Resource[];
}

interface DashboardData {
    careerPath: string;
    tasks: Task[];
    summary?: string; // Optional summary from roadmap
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4 sm:p-6 md:p-8 animate-pulse">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <Skeleton className="h-12 w-48 rounded-lg" />
            </div>

            <Card className="w-full shadow-2xl rounded-2xl mb-10 border-primary/20 overflow-hidden">
                <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-t-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-3/4" />
                    </div>
                    <Skeleton className="h-5 w-1/2 mb-6" />
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-1">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/6" />
                        </div>
                        <Skeleton className="w-full h-3.5 rounded-full" />
                        <Skeleton className="h-3 w-1/5 mt-1 ml-auto" />
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-xl rounded-2xl border-destructive/20 overflow-hidden">
                    <CardHeader className="p-0">
                        <div className="flex items-center gap-3 text-xl font-semibold bg-destructive text-destructive-foreground p-4 sm:p-5 rounded-t-xl">
                            <Skeleton className="h-6 w-6 rounded-md" /> <Skeleton className="h-6 w-32" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                        {[1,2,3].map(i => <Skeleton key={i} className="h-10 w-full rounded-md" />)}
                    </CardContent>
                </Card>

                <Card className="shadow-xl rounded-2xl border-accent/20 overflow-hidden">
                    <CardHeader className="p-0">
                         <div className="flex items-center gap-3 text-xl font-semibold bg-accent text-accent-foreground p-4 sm:p-5 rounded-t-xl">
                            <Skeleton className="h-6 w-6 rounded-md" /> <Skeleton className="h-6 w-32" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                         {[1,2].map(i => <Skeleton key={i} className="h-10 w-full rounded-md opacity-70" />)}
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}


export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
        const storedFullAssessmentData = localStorage.getItem('fullAssessmentData');
        const storedTaskStatus = localStorage.getItem('taskStatus');
        
        let currentCareerPath = "Your Career Path";
        let currentTasks: Task[] = fallbackTasks; // Use fallback tasks as default
        let roadmapSummary: string | undefined = "Review your roadmap for detailed steps.";

        if (storedFullAssessmentData) {
            const parsedFullAssessment = JSON.parse(storedFullAssessmentData);
            
            if (parsedFullAssessment.careerPathSelection?.careerPath) {
                currentCareerPath = parsedFullAssessment.careerPathSelection.careerPath;
            }

            // Attempt to get tasks from a stored roadmap structure (if present from roadmap page)
            // This part assumes roadmap page might save its generatedRoadmap.milestones structure
            const potentialRoadmapMilestones: MilestoneData[] | undefined = parsedFullAssessment.roadmap?.milestones || defaultRoadmapData.milestones; 
            if (potentialRoadmapMilestones && Array.isArray(potentialRoadmapMilestones)) {
                currentTasks = potentialRoadmapMilestones.flatMap((milestone: MilestoneData) => 
                    milestone.tasks.map(task => ({
                        ...task,
                        milestone: milestone.title // Use milestone title as the 'milestone' for the task
                    }))
                );
            }
            roadmapSummary = parsedFullAssessment.roadmap?.summary || defaultRoadmapData.summary;
        }
        
        const initialStatus: Record<string, boolean> = {};
        if (storedTaskStatus) {
            Object.assign(initialStatus, JSON.parse(storedTaskStatus));
        }
        // Ensure all currentTasks have an entry in initialStatus
        currentTasks.forEach(task => {
            if (initialStatus[task.id] === undefined) {
                initialStatus[task.id] = task.completed; // Default to task's own completed status
            }
        });
        setTaskStatus(initialStatus); // Set taskStatus first

        // Update tasks in dashboardData based on potentially loaded status
        const updatedTasks = currentTasks.map(task => ({
            ...task,
            completed: initialStatus[task.id] !== undefined ? initialStatus[task.id] : task.completed,
        }));

        setDashboardData({ careerPath: currentCareerPath, tasks: updatedTasks, summary: roadmapSummary });

    } catch (error) {
        console.error("Failed to load data from localStorage", error);
        // Initialize with fallback if localStorage fails
        const initialStatus: Record<string, boolean> = {};
        fallbackTasks.forEach(task => {
            initialStatus[task.id] = task.completed;
        });
        setTaskStatus(initialStatus);
        setDashboardData({ careerPath: "Your Career Path", tasks: fallbackTasks, summary: "Error loading data. Displaying default." });
    }
    setIsLoading(false);
  }, []);


  const completedTasks = dashboardData?.tasks.filter(task => taskStatus[task.id]) ?? [];
  const pendingTasks = dashboardData?.tasks.filter(task => !taskStatus[task.id]) ?? [];

  const totalTasks = dashboardData?.tasks.length ?? 0;
  const completedTasksCount = completedTasks.length;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  if (isLoading || !dashboardData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                 <Link href="/roadmap" passHref>
                     <Button variant="outline" size="lg" className="text-base py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-primary/50 hover:border-primary focus:ring-2 focus:ring-ring">
                         <ArrowLeft className="mr-2 h-5 w-5"/> Back to My Roadmap
                     </Button>
                 </Link>
            </div>

            <Card className="w-full shadow-2xl rounded-2xl mb-10 border-primary/20 overflow-hidden">
                <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-t-xl">
                    <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-1">
                        <BarChart3 className="h-8 w-8" /> Progress Dashboard
                    </CardTitle>
                    <CardDescription className="text-base text-primary-foreground/90">
                        Your journey towards <span className="font-semibold">{dashboardData.careerPath}</span>.
                    </CardDescription>
                     <CardDescription className="text-sm text-primary-foreground/80 mt-1 italic">
                        {dashboardData.summary || "Track your tasks and stay motivated!"}
                    </CardDescription>
                    <div className="mt-6">
                         <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">Overall Progress</p>
                            <p className="text-sm font-semibold">{completedTasksCount} / {totalTasks} Tasks</p>
                         </div>
                         <Progress value={overallProgress} className="w-full h-3.5 rounded-full bg-primary-foreground/30 [&>div]:bg-accent" aria-label={`Overall progress: ${overallProgress}%`} />
                         <p className="text-xs text-primary-foreground/80 mt-1 text-right">{overallProgress}% Complete</p>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-xl rounded-2xl border-destructive/20 overflow-hidden">
                    <CardHeader className="p-0">
                        <CardTitle className="flex items-center gap-3 text-xl font-semibold bg-destructive text-destructive-foreground p-4 sm:p-5 rounded-t-xl">
                             <Hourglass className="h-6 w-6"/> Pending Tasks ({pendingTasks.length})
                        </CardTitle>
                     </CardHeader>
                    <CardContent className="p-6">
                        {pendingTasks.length > 0 ? (
                            <ul className="space-y-3">
                                {pendingTasks.map(task => (
                                    <li key={task.id} className="flex justify-between items-center p-3.5 border border-border/70 rounded-lg bg-card hover:bg-muted/40 transition-colors shadow-sm hover:shadow-md">
                                        <span className="text-base text-foreground flex-1 mr-2">{task.text}</span>
                                        <Badge variant="outline" className="text-xs font-medium whitespace-nowrap border-destructive/50 text-destructive bg-destructive/10">{task.milestone}</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-10">
                                <ThumbsUp className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-80"/>
                                <p className="text-xl font-semibold text-green-600">All Tasks Cleared!</p>
                                <p className="text-base text-muted-foreground mt-1">Fantastic job staying on top of your goals.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="shadow-xl rounded-2xl border-accent/20 overflow-hidden">
                     <CardHeader className="p-0">
                         <CardTitle className="flex items-center gap-3 text-xl font-semibold bg-accent text-accent-foreground p-4 sm:p-5 rounded-t-xl">
                            <CheckCircle className="h-6 w-6"/> Completed Tasks ({completedTasks.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                         {completedTasks.length > 0 ? (
                            <ul className="space-y-3">
                                {completedTasks.map(task => (
                                     <li key={task.id} className="flex justify-between items-center p-3.5 border border-border/50 rounded-lg bg-card/80 opacity-80 shadow-sm">
                                         <span className="text-base text-muted-foreground line-through flex-1 mr-2">{task.text}</span>
                                          <Badge variant="outline" className="text-xs font-medium whitespace-nowrap border-accent/70 text-accent bg-accent/10">{task.milestone}</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-10">
                                 <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-70"/>
                                <p className="text-xl font-semibold text-foreground">Let's Get Started!</p>
                                <p className="text-base text-muted-foreground mt-1">No tasks completed yet. Time to make some progress!</p>
                            </div>
                        )}
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}

