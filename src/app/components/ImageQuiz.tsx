"use client";

import { IItem, IRows, QuizItem } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const onDragEnd = (
  result: DropResult,
  rows: IRows,
  setRows: Dispatch<SetStateAction<IRows>>
) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceRow = rows[source.droppableId as keyof IRows];
    const destRow = rows[destination.droppableId as keyof IRows];
    const sourceItems = [...sourceRow.items];
    const destItems = [...destRow.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...sourceRow,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destRow,
        items: destItems,
      },
    });
  } else {
    const row = rows[source.droppableId as keyof IRows];
    const copiedItem = [...row.items];
    const [removed] = copiedItem.splice(source.index, 1);
    copiedItem.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...row,
        items: copiedItem,
      },
    });
  }
};

const services = {
  onDragEnd,
};

interface IQuizClient {
  quizDetails: QuizItem;
  lessonID: string;
  data: IRows;
  onSuccess: () => void;
}

export default function ImageQuiz({
  quizDetails,
  lessonID,
  data,
  onSuccess,
}: IQuizClient) {
  const router = useRouter();

  const [rows, setRows] = useState(data);

  const [winReady, setwinReady] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (
    rows: IRows,
    setRows: Dispatch<SetStateAction<IRows>>,
    items: IItem[]
  ) => {
    const answer = quizDetails.answer;
    const res = rows.Answer.items.map((item) => item.content).join("");
    console.log(res);
    if (res == answer) {
      setIsSuccess(true);

      setRows({
        Question: {
          items: items,
        },
        Answer: {
          items: [],
        },
      });

      // onSuccess();
    } else {
      console.log("Oops! That is the wrong answer");
      setRows({
        Question: {
          items: items,
        },
        Answer: {
          items: [],
        },
      });
    }
  };

  const goToNextLevel = () => {
    router.push("/lessons");
  };

  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-80"
          src="/assets/images/bg.jpg"
          alt="Child Dashboard Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-purple-100/30"></div>
      </div>
      <main className="fixed inset-0 z-40 flex justify-center items-center h-screen w-screen">
        {isSuccess && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex items-center gap-5">
              <div className="w-96 h-56 -mt-12 bg-orange-100 rounded-[38.92px] shadow-[0px_5.189272880554199px_0px_0px_rgba(255,201,119,1.00)] relative flex flex-col items-center justify-center">
                <Image
                  src="/assets/images/winner_top.svg"
                  alt="Bright Buddy Logo"
                  width={200}
                  height={200}
                  className="w-96 h-auto -top-48 left-0 right-0 absolute mx-auto"
                />

                <p className="text-lg">You have completed Level 1</p>

                <button
                  className="cursor-pointer button-red kids-button mt-3"
                  onClick={goToNextLevel}
                >
                  Go to Next Level
                </button>
              </div>
            </div>
          </div>
        )}

        <DragDropContext
          onDragEnd={(result) => services.onDragEnd(result, rows, setRows)}
        >
          <div className="wrapper bg-gray-100 md:w-3/5 w-full h-4/5 rounded-xl p-10 shadow-xl">
            <h2 className="text-3xl font-medium text-center">
              {quizDetails.name}
            </h2>

            <div className="flex flex-col space-y-1 my-1 items-center">
              {quizDetails.instructions.map((instruction) => (
                <p>{instruction}</p>
              ))}
            </div>

            <div className="w-full flex items-center justify-center">
              <div className="mt-16 flex gap-3 w-60 h-60 overflow-hidden relative justify-center items-center">
                <Image
                  src={`/assets/images/${quizDetails.image}.jpg`}
                  alt="Children learning background"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            </div>

            <div className="answer-wrapper mt-10">
              {winReady ? (
                <Droppable
                  droppableId="Answer"
                  direction="horizontal"
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="answers flex gap-2 w-full h-10 rounded-md bg-gray-200"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {rows["Answer"].items.length === 0 && (
                          <div className="flex-1 w-full flex items-center justify-center">
                            Drop words here
                          </div>
                        )}

                        {rows["Answer"].items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Option item={item} provided={provided} />
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              ) : null}
            </div>
            {winReady ? (
              <Droppable
                droppableId="Question"
                direction="horizontal"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      className="Question option-wrapper mt-16 flex items-start gap-2 h-28"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {rows["Question"].items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return <Option item={item} provided={provided} />;
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            ) : null}

            <div className="flex justify-center">
              <button
                className="kids-button button-blue flex items-center justify-center gap-2"
                onClick={() =>
                  handleSubmit(rows, setRows, data["Question"].items)
                }
              >
                Check Your Answer
              </button>
            </div>
          </div>
        </DragDropContext>
      </main>
    </>
  );
}

function Word({ text, hint }: { text: string; hint: string }) {
  return (
    <div className="word underline font-medium text-xl hover:text-gray-600 tracking-wide underline-offset-8 decoration-dotted group cursor-pointer select-none  decoration-gray-600">
      <p>
        {text}{" "}
        <span className='tooltip-text text-lg bg-whit border-[#58cc02] border-solid border-2 p-3 -mt-20 transition-all -ml-6 rounded hidden group-hover:block absolute text-center py-2 px-6 z-50"'>
          {hint}
        </span>
      </p>
    </div>
  );
}

function Option({ item, provided }: { item: IItem; provided: any }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white shadow-lg py-2 px-4 rounded-lg"
      style={{
        userSelect: "none",
        ...provided.draggableProps.style,
      }}
    >
      {item.content}
    </div>
  );
}
