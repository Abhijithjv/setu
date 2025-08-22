'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeAnswers, calculateInitialProgress } from '@/lib/logic';
import { dataScienceRoadmap, softwareDevelopmentRoadmap } from '@/lib/roadmap-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, GanttChartSquare, BookOpen, Clock, Lightbulb } from "lucide-react";
import Link from 'next/link'; // 👈 ADD THIS IMPORT

type RoadmapSection = { title: string; duration: string; progress: number; keyTasks: string[]; learningResources: { name: string; url: string }[]; };
type Roadmap = { targetCareer: string; overallProgress: number; summary: string; sections: RoadmapSection[]; };

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  // This single, improved useEffect hook handles all initial setup.
  useEffect(() => {
    const storedAnswers = localStorage.getItem('assessmentAnswers');
    if (!storedAnswers) {
      router.push('/assessment');
      return;
    }

    const answers = JSON.parse(storedAnswers);
    const careerPath = analyzeAnswers(answers);

    let currentRoadmap;
    if (careerPath === 'Data Science, AI & Machine Learning') {
      currentRoadmap = dataScienceRoadmap;
    } else {
      currentRoadmap = softwareDevelopmentRoadmap;
    }
    setRoadmap(currentRoadmap);

    const initialTaskIds = calculateInitialProgress(answers);
    const initialCompletedState: { [key: string]: boolean } = {};
    initialTaskIds.forEach(id => {
      initialCompletedState[id] = true;
    });
    setCompletedTasks(initialCompletedState);

  }, [router]);

  const handleTaskToggle = (taskId: string) => {
    // Also save to local storage so it persists across reloads
    const newCompletedTasks = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  };

  if (!roadmap) {
    return <div className="flex items-center justify-center h-screen">Loading your personalized roadmap...</div>;
  }

  const totalTasks = roadmap.sections.flatMap(s => s.keyTasks).length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const overallProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-primary font-semibold">Your Personalized Roadmap</p>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">{roadmap.targetCareer}</h1>
            <Button variant="outline">Progress Dashboard</Button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Overall Progress</span>
              <span>{completedCount}/{totalTasks} Tasks</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
          </div>
        </div>

        {/* Accordion Section */}
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {roadmap.sections.map((section, sectionIndex) => {
            const sectionTotalTasks = section.keyTasks.length;
            const sectionCompletedCount = section.keyTasks.filter((_, taskIndex) => completedTasks[`task-${sectionIndex}-${taskIndex}`]).length;
            const sectionProgress = sectionTotalTasks > 0 ? (sectionCompletedCount / sectionTotalTasks) * 100 : 0;
            return (
              <AccordionItem value={`item-${sectionIndex + 1}`} key={sectionIndex}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-primary">{sectionIndex + 1}</span>
                    <span>{section.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{section.duration}</span>
                    <Progress value={sectionProgress} className="w-24" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Lightbulb />Key Tasks:</h3>
                      <div className="space-y-3">
                        {section.keyTasks.map((task, taskIndex) => {
                          const taskId = `task-${sectionIndex}-${taskIndex}`;
                          return (
                            <div key={taskId} className="flex items-center space-x-3">
                              <Checkbox id={taskId} checked={!!completedTasks[taskId]} onCheckedChange={() => handleTaskToggle(taskId)}/>
                              <label htmlFor={taskId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{task}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><BookOpen />Learning Resources:</h3>
                      <div className="space-y-2">
                        {section.learningResources.map((resource, resIndex) => (
                          <a href={resource.url} key={resIndex} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                            {resource.name} <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        
        {/* 👇 THIS IS THE EDITED PART 👇 */}
        <div className="text-center mt-8">
            <Link href="/dashboard">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    View My Progress Dashboard
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}