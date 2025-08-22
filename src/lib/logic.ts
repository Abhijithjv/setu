// src/lib/logic.ts

// This function determines the career path
export function analyzeAnswers(answers: { [key: string]: string }): string {
  const careerPath = answers.careerPath;
  if (careerPath === 'ai-ml') {
    return 'Data Science, AI & Machine Learning';
  }
  return 'Software Development';
}

// This function calculates an initial "completed tasks" score
export function calculateInitialProgress(answers: { [key:string]: string }): string[] {
  const completedTaskIds: string[] = [];
  
  // Get the answer for the programming comfort question from Step 2
  const programmingComfort = answers['q1']; 

  // Rule 1: If user is comfortable or very comfortable, pre-complete the first 2 tasks
  if (
    programmingComfort === 'Very Comfortable - I can build small projects' || 
    programmingComfort === 'Comfortable - I understand the basics well'
  ) {
    completedTaskIds.push('task-0-0'); // Master Python
    completedTaskIds.push('task-0-1'); // Learn Data Structures
  }

  // Rule 2: If user is neutral, pre-complete the first task
  if (programmingComfort === 'Neutral - I know some concepts but need practice') {
    completedTaskIds.push('task-0-0'); // Master Python
  }

  return completedTaskIds;
}