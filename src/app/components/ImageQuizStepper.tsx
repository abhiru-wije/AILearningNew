"use client";

import { IImageQuizInfo, IItem } from "@/types/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ImageQuiz from "./ImageQuiz";
import TextQuiz from "./TextQuiz";
import CustomImageQuiz from "./CustomImageQuiz";

function getRandomizedAnswer(answer: string[]): IItem[] {
  let shuffled: string[] = [];

  // Keep shuffling until the order is different from the original
  do {
    shuffled = [...answer].sort(() => Math.random() - 0.5);
  } while (shuffled === answer);

  return shuffled.map((char) => ({
    id: uuid(),
    content: char,
  }));
}

interface IQuizStepper {
  quizDetails: IImageQuizInfo;
  lessonID: string;
}

function ImageQuizStepper({ quizDetails, lessonID }: IQuizStepper) {
  const [step, setStep] = useState(0);
  const quizzes = quizDetails.quiz;
  const totalSteps = quizzes.length;

  const next = () => step < totalSteps - 1 && setStep((s) => s + 1);
  const prev = () => step > 0 && setStep((s) => s - 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <CustomImageQuiz
          quizDetails={quizzes[step]}
          lessonID={lessonID}
          data={{
            Answer: {
              items: getRandomizedAnswer(quizzes[step].answer),
            },
            Question: {
              items: [],
            },
          }}
          onSuccess={next}
        />

        {/* {quizzes[step].type === "image" ? (
          <ImageQuiz
            quizDetails={quizzes[step]}
            lessonID={lessonID}
            data={{
              Answer: {
                items: [],
              },
              Question: {
                items: getRandomizedAnswer(quizzes[step].answer),
              },
            }}
            onSuccess={next}
          />
        ) : (
          <TextQuiz quizDetails={quizzes[step]} lessonID={lessonID} />
        )} */}
      </div>

      {/* Step indicators */}
      <div className="flex space-x-2 mt-2">
        {quizzes.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === step ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ImageQuizStepper;
