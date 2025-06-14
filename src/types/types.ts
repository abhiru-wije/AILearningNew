export interface ITopic {
  topicId: string;
  title: string;
  isCompleted: boolean;
}

export interface ILessonDetails {
  lessonId: string;
  name: string;
  isIntroDone: boolean;
  isLessonDone: boolean;
  isQuizDone: boolean;
  topics: ITopic[];
}

export interface ILesson {
  lessonId: string;
  name: string;
}

export interface IQuizInfo {
  lesson: ILesson;
  quiz: QuizItem[];
}

export interface QuizItem {
  name: string;
  type: "image" | "text" | string; // Extend types as needed
  instructions: string[];
  image: string;
  answer: string;
}

export interface IImageQuizInfo {
  lesson: ILesson;
  quiz: ImageQuizItem[];
}

export interface ImageQuizItem {
  name: string;
  type: "image" | "text" | string;
  instructions: string[];
  answer: string[];
  questions: string[];
}

export interface IItem {
  id: string;
  content: string;
}

export interface IRows {
  Question: { items: IItem[] };
  Answer: { items: IItem[] };
}
