// src/lib/roadmap-data.ts

export const dataScienceRoadmap = {
  targetCareer: "Data Science, AI & Machine Learning",
  overallProgress: 6,
  summary: "This personalized roadmap outlines key milestones for a career in Data Science, AI & Machine Learning. It emphasizes practical skills, continuous learning, and project-based experience.",
  sections: [
    {
      title: "Foundation: Programming & CS Basics (Year 1)",
      duration: "3-4 Months",
      progress: 25,
      keyTasks: [
        "Master Python: variables, control-flow, functions, OOP basics.",
        "Learn Data Structures: Arrays, Lists, Stacks, Queues, Trees, Graphs.",
        "Understand Algorithms: Sorting, Searching, Big O notation.",
        "Build 3 console-based projects (e.g., calculator, to-do list, simple text game).",
      ],
      learningResources: [
        { name: "Python.org Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
        { name: "GeeksforGeeks Data Structures", url: "https://www.geeksforgeeks.org/data-structures/" },
        { name: "Khan Academy Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms" },
      ],
    },
    {
      title: "Frontend Web Development (Year 1/2)",
      duration: "4-6 Months",
      progress: 0,
      keyTasks: [
        "Master HTML5 & CSS3: Semantic HTML, Flexbox, Grid, Responsive Design.",
        "Deep dive into JavaScript: ES6+, DOM, Events, Async/Await, APIs.",
        "Learn a modern frontend framework (e.g., React, Vue, or Angular).",
        "Build 2-3 interactive frontend projects (e.g., portfolio, weather app, e-commerce UI).",
        "Understand Git & GitHub for version control.",
      ],
      learningResources: [
        { name: "MDN Web Docs (HTML, CSS, JS)", url: "https://developer.mozilla.org/en-US/docs/Web" },
        { name: "React.dev (Official React Docs)", url: "https://react.dev/" },
        { name: "Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" },
      ],
    },
    {
      title: "Backend Development & Databases (Year 2/3)",
      duration: "6-8 Months",
      progress: 0,
      keyTasks: [
        "Learn a backend language & framework (e.g., Node.js/Express, Python/Django, Java/Spring).",
        "Understand RESTful API design principles.",
        "Learn SQL & a relational database (e.g., PostgreSQL, MySQL).",
        "Explore NoSQL databases (e.g., MongoDB) and their use cases.",
        "Build a full-stack application with user authentication and database integration.",
      ],
      learningResources: [
        { name: "Node.js Official Documentation", url: "https://nodejs.org/en/docs" },
        { name: "SQLBolt - Interactive SQL Tutorial", url: "https://sqlbolt.com/" },
        { name: "MongoDB University", url: "https://learn.mongodb.com/" },
      ],
    },
    {
      title: "Data Analysis & Visualization (Year 2/3)",
      duration: "5 Months",
      progress: 0,
      keyTasks: [
        "Learn to analyze data, find patterns, and communicate insights effectively.",
        "Master Pandas and NumPy for data manipulation.",
        "Learn Matplotlib and Seaborn for data visualization.",
        "Complete 2-3 data analysis projects.",
      ],
      learningResources: [
        { name: "Kaggle Courses", url: "https://www.kaggle.com/learn" },
      ],
    },
  ],
};

export const softwareDevelopmentRoadmap = {
    ...dataScienceRoadmap,
    targetCareer: "General Software Development",
    summary: "This is a foundational roadmap for a career in software development, covering key areas from frontend to backend.",
};