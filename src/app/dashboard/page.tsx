'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dataScienceRoadmap, softwareDevelopmentRoadmap } from '@/lib/roadmap-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

// Define the shape of a single task
type Task = {
  id: string;
  text: string;
  section: string;
};

export default function DashboardPage() {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    // We'll just use the Data Science roadmap for this example
    const roadmap = dataScienceRoadmap; 
    
    // Create a flat list of all tasks with their section name
    const tasks: Task[] = [];
    roadmap.sections.forEach((section, sectionIndex) => {
      section.keyTasks.forEach((taskText, taskIndex) => {
        tasks.push({
          id: `task-${sectionIndex}-${taskIndex}`,
          text: taskText,
          section: section.title,
        });
      });
    });
    setAllTasks(tasks);

    // Load the user's completed tasks from local storage
    const storedCompleted = localStorage.getItem('completedTasks');
    if (storedCompleted) {
      setCompletedTasks(JSON.parse(storedCompleted));
    }
  }, []);
  
  const pendingTasks = allTasks.filter(task => !completedTasks[task.id]);
  const doneTasks = allTasks.filter(task => completedTasks[task.id]);

  const overallProgress = allTasks.length > 0 ? (doneTasks.length / allTasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-primary font-semibold mb-4">&larr; Back to My Roadmap</button>
          <h1 className="text-3xl font-extrabold">Progress Dashboard</h1>
          <p className="text-muted-foreground">Your journey towards Data Science, AI & Machine Learning.</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Overall Progress</span>
              <span>{doneTasks.length}/{allTasks.length} Tasks</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
          </div>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Tasks Column */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-300">
                <Circle className="h-6 w-6" />
                Pending Tasks ({pendingTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map(task => (
                <div key={task.id} className="p-3 bg-card/50 rounded-md">
                  <p className="font-medium">{task.text}</p>
                  <p className="text-xs text-muted-foreground">{task.section}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Tasks Column */}
          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="h-6 w-6" />
                Completed Tasks ({doneTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {doneTasks.map(task => (
                <div key={task.id} className="p-3 bg-card/50 rounded-md">
                  <p className="font-medium line-through text-muted-foreground">{task.text}</p>
                  <p className="text-xs text-muted-foreground">{task.section}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}