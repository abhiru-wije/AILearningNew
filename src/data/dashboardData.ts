export interface Child {
  _id: string;
  firstname: string;
  lastname: string;
  class: string
}

export interface LearningProgress {
  subject: string;
  completed: number;
  total: number;
  lastActivity: string;
}

export interface WeeklyActivity {
  date: string;
  minutes: number;
}

export interface SubjectPerformance {
  subject: string;
  score: number;
}

export const children: Child[] = [];

export const learningProgress: LearningProgress[] = [
  {
    subject: "Mathematics",
    completed: 75,
    total: 100,
    lastActivity: "2024-02-20",
  },
  {
    subject: "Science",
    completed: 60,
    total: 100,
    lastActivity: "2024-02-19",
  },
  {
    subject: "English",
    completed: 85,
    total: 100,
    lastActivity: "2024-02-21",
  },
  {
    subject: "History",
    completed: 70,
    total: 100,
    lastActivity: "2024-02-18",
  },
];

export const weeklyActivity: WeeklyActivity[] = [
  { date: "2024-02-15", minutes: 45 },
  { date: "2024-02-16", minutes: 60 },
  { date: "2024-02-17", minutes: 30 },
  { date: "2024-02-18", minutes: 75 },
  { date: "2024-02-19", minutes: 50 },
  { date: "2024-02-20", minutes: 65 },
  { date: "2024-02-21", minutes: 55 },
];

export const subjectPerformance: SubjectPerformance[] = [
  { subject: "Mathematics", score: 85 },
  { subject: "Science", score: 75 },
  { subject: "English", score: 90 },
  { subject: "History", score: 80 },
];

export const monthlyProgress = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  mathematics: [65, 70, 75, 80, 85, 90],
  science: [60, 65, 70, 75, 80, 85],
  english: [75, 80, 85, 90, 95, 100],
  history: [70, 75, 80, 85, 90, 95],
};

export const skillDistribution = {
  labels: [
    "Critical Thinking",
    "Problem Solving",
    "Creativity",
    "Communication",
    "Collaboration",
  ],
  data: [85, 75, 90, 80, 85],
};

export const timeDistribution = {
  labels: ["Mathematics", "Science", "English", "History", "Other"],
  data: [30, 25, 20, 15, 10],
};
