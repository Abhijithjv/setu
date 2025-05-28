
'use client';

import {useState, useEffect} from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Milestone, BookOpen, Clock, Target, ArrowRight, FileText, Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; 

// --- Mock Data ---
// This will be replaced by AI-generated content or more specific defaults based on selection
const defaultRoadmapData: Roadmap = { // Added type annotation
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
      ],
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
      ],
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
      ],
    },
  ],
};
// --- End Mock Data ---

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Resource {
  name: string;
  url: string;
}

interface MilestoneData {
  id: string;
  title: string;
  timeline: string;
  description: string;
  tasks: Task[];
  resources: Resource[];
}

interface Roadmap {
    careerPath: string;
    summary: string;
    milestones: MilestoneData[];
}

function RoadmapSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl mb-8 border-primary/20 overflow-hidden">
        <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-t-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/6" />
            </div>
            <Skeleton className="w-full h-3.5 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
           <Skeleton className="h-6 w-1/3 mb-4" />
           <Skeleton className="h-4 w-full mb-2" />
           <Skeleton className="h-4 w-3/4 mb-6" />
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline p-4 sm:p-6 rounded-t-xl data-[state=open]:bg-muted/40 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <Skeleton className="h-6 w-3/5 mb-2 sm:mb-0" />
                <div className="flex items-center gap-3 mt-3 sm:mt-0 text-sm">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="w-24 h-3 ml-2 hidden sm:block" />
                  <Skeleton className="h-5 w-10 ml-1 hidden sm:block" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6 px-4 sm:px-6 border-t border-border/50">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-6" />
              <div className="space-y-3 mb-6">
                <Skeleton className="h-5 w-1/4 mb-3" />
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center space-x-3 p-3 rounded-md">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 mb-3" />
                {[1, 2].map((k) => (
                  <Skeleton key={k} className="h-5 w-2/3 py-1" />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
       <div className="text-center mt-12 mb-8">
         <Skeleton className="h-14 w-56 rounded-lg mx-auto" />
       </div>
    </div>
  );
}


export default function RoadmapPage() {
  const [roadmapData, setRoadmapData] = useState<Roadmap | null>(null); 
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>("item-0");


  useEffect(() => {
    const loadRoadmap = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            const storedDataString = localStorage.getItem('fullAssessmentData');
            let generatedRoadmap: Roadmap;
            let parsedData: any = null; // To store parsed localStorage data

            if (storedDataString) {
                parsedData = JSON.parse(storedDataString);

                // Priority 1: Use roadmap from localStorage if it exists and seems valid
                if (parsedData.roadmap && parsedData.roadmap.milestones && parsedData.roadmap.milestones.length > 0) {
                    generatedRoadmap = parsedData.roadmap;
                    // Ensure careerPath and summary are consistent if top-level info exists
                    if (parsedData.careerPathSelection?.careerPath && generatedRoadmap.careerPath !== parsedData.careerPathSelection.careerPath) {
                        generatedRoadmap.careerPath = parsedData.careerPathSelection.careerPath;
                    }
                    // Update summary if it's the default one and a specific career path is known
                    if (generatedRoadmap.summary === defaultRoadmapData.summary && parsedData.careerPathSelection?.careerPath) {
                         generatedRoadmap.summary = `This personalized roadmap outlines key milestones for a career in ${parsedData.careerPathSelection.careerPath}. It emphasizes practical skills, continuous learning, and project-based experience.`;
                    }
                } else {
                    // Priority 2: Build from defaultRoadmapData and customize
                    generatedRoadmap = JSON.parse(JSON.stringify(defaultRoadmapData)); // Deep copy

                    if (parsedData.careerPathSelection?.careerPath) {
                        generatedRoadmap.careerPath = parsedData.careerPathSelection.careerPath;
                        generatedRoadmap.summary = `This personalized roadmap outlines key milestones for a career in ${parsedData.careerPathSelection.careerPath}. It emphasizes practical skills, continuous learning, and project-based experience.`;

                        // Add specific milestones only if not already present
                        if (parsedData.careerPathSelection.careerPath.includes('Data Science')) {
                            if (!generatedRoadmap.milestones.find(m => m.id === 'm4_ds')) {
                                generatedRoadmap.milestones.push({
                                    id: 'm4_ds',
                                    title: 'Data Analysis & Visualization (Year 2/3)',
                                    timeline: '5 Months',
                                    description: 'Learn to analyze data, find patterns, and communicate insights effectively.',
                                    tasks: [
                                        {id: 't15_ds', text: 'Master Pandas and NumPy for data manipulation.', completed: false},
                                        {id: 't16_ds', text: 'Learn Matplotlib and Seaborn for data visualization.', completed: false},
                                        {id: 't17_ds', text: 'Complete 2-3 data analysis projects.', completed: false},
                                    ],
                                    resources: [{name: 'Kaggle Courses', url: 'https://www.kaggle.com/learn'}],
                                });
                            }
                        } else if (parsedData.careerPathSelection.careerPath.includes('Cybersecurity')) {
                            if (!generatedRoadmap.milestones.find(m => m.id === 'm4_cyber')) {
                                generatedRoadmap.milestones.push({
                                    id: 'm4_cyber',
                                    title: 'Networking & Security Fundamentals (Year 2/3)',
                                    timeline: '6 Months',
                                    description: 'Understand network protocols, security principles, and common vulnerabilities.',
                                    tasks: [
                                        {id: 't15_cyber', text: 'Study for CompTIA Network+ or CCNA basics.', completed: false},
                                        {id: 't16_cyber', text: 'Learn about common cyber threats (malware, phishing, etc.).', completed: false},
                                        {id: 't17_cyber', text: 'Practice on platforms like TryHackMe or HackTheBox.', completed: false},
                                    ],
                                    resources: [{name: 'Cybrary', url: 'https://www.cybrary.it/'}],
                                });
                            }
                        }
                        // Store the newly generated/customized roadmap back to localStorage
                        const updatedFullAssessmentData = {
                            ...parsedData,
                            roadmap: generatedRoadmap
                        };
                        localStorage.setItem('fullAssessmentData', JSON.stringify(updatedFullAssessmentData));
                    } else {
                        // No career path selected in parsedData, use default as is
                        generatedRoadmap = defaultRoadmapData;
                    }
                }
            } else {
                // No stored data at all, use default
                generatedRoadmap = defaultRoadmapData;
            }

            setRoadmapData(generatedRoadmap);

            // Initialize taskStatus from roadmapData.milestones
            const initialStatus: Record<string, boolean> = {};
            const storedTaskStatus = localStorage.getItem('taskStatus');
            if (storedTaskStatus) {
                 Object.assign(initialStatus, JSON.parse(storedTaskStatus));
            }
            // Ensure all tasks from the final roadmapData have a status
            generatedRoadmap.milestones.forEach(m => {
                m.tasks.forEach(t => {
                    if (initialStatus[t.id] === undefined) {
                         initialStatus[t.id] = t.completed || false; 
                    }
                });
            });
            setTaskStatus(initialStatus);

        } catch (error) {
            console.error("Failed to load or generate roadmap data", error);
            setRoadmapData(defaultRoadmapData); // Fallback to default on error
             const initialStatus: Record<string, boolean> = {};
             defaultRoadmapData.milestones.forEach(m => m.tasks.forEach(t => initialStatus[t.id] = t.completed));
             setTaskStatus(initialStatus);
        } finally {
            setIsLoading(false);
             // Automatically open the first milestone if roadmapData is available
            if (roadmapData && roadmapData.milestones.length > 0 && !activeAccordionItem) {
              setActiveAccordionItem(`item-0`);
            }
        }
    };
    loadRoadmap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const totalTasks = roadmapData?.milestones.reduce((acc, m) => acc + m.tasks.length, 0) ?? 0;
  const completedTasksCount = Object.values(taskStatus).filter(status => status).length;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;


  const handleTaskToggle = (taskId: string) => {
    setTaskStatus(prevStatus => {
      const newStatus = {
        ...prevStatus,
        [taskId]: !prevStatus[taskId],
      };
      try {
        localStorage.setItem('taskStatus', JSON.stringify(newStatus));
      } catch (error) {
        console.error("Failed to save task status to localStorage", error);
      }
      return newStatus;
    });
  };


  const calculateMilestoneProgress = (milestone: MilestoneData) => {
    const totalMilestoneTasks = milestone.tasks.length;
    if (totalMilestoneTasks === 0) return 0;
    const completedMilestoneTasks = milestone.tasks.filter(task => taskStatus[task.id]).length;
    return Math.round((completedMilestoneTasks / totalMilestoneTasks) * 100);
  };

  useEffect(() => {
    // Effect to set activeAccordionItem once roadmapData is loaded
    if (roadmapData && roadmapData.milestones.length > 0 && !activeAccordionItem) {
      setActiveAccordionItem(`item-0`);
    }
  }, [roadmapData, activeAccordionItem]);


  if (isLoading || !roadmapData) {
    return <RoadmapSkeleton />;
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl mb-8 border-primary/20 overflow-hidden">
          <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-t-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                       <Milestone className="h-8 w-8" /> Your Personalized Roadmap
                    </CardTitle>
                    <CardDescription className="text-base text-primary-foreground/90 pt-1">
                        Target Career: <span className="font-semibold">{roadmapData.careerPath}</span>
                    </CardDescription>
                </div>
                <Link href="/dashboard" passHref>
                    <Button variant="outline" size="lg" className="text-base py-3 px-6 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 shadow-md hover:shadow-lg transition-all duration-300">
                         <Target className="mr-2 h-5 w-5"/> Progress Dashboard
                    </Button>
                </Link>
             </div>
              <div className="mt-6">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium ">Overall Progress</p>
                    <p className="text-sm font-semibold ">{completedTasksCount} / {totalTasks} Tasks</p>
                  </div>
                  <Progress value={overallProgress} className="w-full h-3.5 rounded-full bg-primary-foreground/30 [&>div]:bg-accent" aria-label={`Overall progress ${overallProgress}%`} />
                   <p className="text-xs text-primary-foreground/80 mt-1 text-right">{overallProgress}% Complete</p>
             </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
             <h3 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                <FileText className="h-6 w-6" /> Roadmap Summary
             </h3>
             <p className="text-base text-muted-foreground leading-relaxed">
                {roadmapData.summary}
             </p>
          </CardContent>
      </Card>


      <Accordion type="single" collapsible value={activeAccordionItem} onValueChange={setActiveAccordionItem} className="w-full max-w-4xl mx-auto space-y-6">
        {roadmapData.milestones.map((milestone, index) => {
          const milestoneProgress = calculateMilestoneProgress(milestone);
          return (
             <AccordionItem key={milestone.id} value={`item-${index}`} className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
               <AccordionTrigger className="text-lg font-semibold hover:no-underline p-4 sm:p-6 rounded-t-xl data-[state=open]:bg-muted/40 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                     <span className="text-left text-xl text-primary flex items-center">
                        <span className="mr-3 text-accent font-bold text-2xl">{index + 1}</span> {milestone.title}
                     </span>
                     <div className="flex items-center gap-3 mt-3 sm:mt-0 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{milestone.timeline}</span>
                        <Progress value={milestoneProgress} className="w-24 h-2.5 ml-2 hidden sm:block rounded-full bg-muted [&>div]:bg-accent" aria-label={`Milestone progress ${milestoneProgress}%`}/>
                        <span className="font-semibold ml-1 hidden sm:block text-accent">{milestoneProgress}%</span>
                     </div>
                  </div>
                  {/* Replace ChevronDown with custom handling or remove if AccordionTrigger handles its own icon */}
               </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 px-4 sm:px-6 border-t border-border/50">
                    <p className="text-base text-muted-foreground mb-4 italic">{milestone.description}</p>
                   <div className="flex sm:hidden items-center mb-4"> {/* Progress for mobile */}
                         <Progress value={milestoneProgress} className="w-full h-2.5 mr-2 rounded-full bg-muted [&>div]:bg-accent" aria-label={`Milestone progress ${milestoneProgress}%`}/>
                        <span className="text-sm font-semibold text-accent">{milestoneProgress}%</span>
                    </div>
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-foreground">Key Tasks:</h4>
                    {milestone.tasks.map((task) => (
                       <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer border border-transparent hover:border-accent/50" onClick={() => handleTaskToggle(task.id)}>
                         <Checkbox
                            id={`${milestone.id}-${task.id}`} 
                            checked={taskStatus[task.id]}
                            onCheckedChange={() => handleTaskToggle(task.id)} 
                            aria-label={`Mark task "${task.text}" as complete`}
                            className="h-5 w-5 border-primary data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-foreground"
                         />
                         <label
                            htmlFor={`${milestone.id}-${task.id}`}
                            className={`text-base ${
                               taskStatus[task.id] ? 'line-through text-muted-foreground/70' : 'text-foreground'
                            } cursor-pointer flex-1`}
                         >
                            {task.text}
                         </label>
                      </div>
                    ))}
                  </div>
                  {milestone.resources.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary"/> Learning Resources:
                        </h4>
                        <ul className="list-none space-y-1.5 pl-1">
                        {milestone.resources.map((resource, rIndex) => (
                            <li key={rIndex} className="flex items-center py-1">
                                <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base text-accent hover:underline hover:text-accent/80 transition-colors flex items-center gap-1.5 group"
                                >
                                {resource.name}
                                <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                  )}
                </AccordionContent>
             </AccordionItem>
          );
          })}
      </Accordion>
        <div className="text-center mt-12 mb-8">
            <Link href="/dashboard" passHref>
                 <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-accent focus:ring-offset-2">
                     <Sparkles className="mr-2 h-5 w-5"/> View My Progress Dashboard <ArrowRight className="ml-2 h-5 w-5"/>
                </Button>
            </Link>
       </div>
    </div>
  );
}
