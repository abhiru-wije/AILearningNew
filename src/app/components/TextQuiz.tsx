"use client";

import { QuizItem } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const onDragEnd = (
  result: DropResult,
  rows: IRows,
  setRows: Dispatch<SetStateAction<IRows>>
) => {
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

interface IItem {
  id: string;
  content: string;
}

interface IRows {
  Question: { items: IItem[] };
  Answer: { items: IItem[] };
}

interface IQuizClient {
  quizDetails: QuizItem;
  lessonID: string;
}

export default function TextQuiz({ quizDetails, lessonID }: IQuizClient) {
  const router = useRouter();

  const items: IItem[] = [
    { id: uuid(), content: "speak" },
    { id: uuid(), content: "Spanish" },
    { id: uuid(), content: "I" },
  ];

  const rowsBackend: IRows = {
    Question: {
      items: items,
    },
    Answer: {
      items: [],
    },
  };

  const [rows, setRows] = useState(rowsBackend);

  const [winReady, setwinReady] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (
    rows: IRows,
    setRows: Dispatch<SetStateAction<IRows>>,
    items: IItem[]
  ) => {
    const answer = "I speak Spanish";
    const res = rows.Answer.items.map((item) => item.content).join(" ");
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-5">
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
        )}

        <DragDropContext
          onDragEnd={(result) => services.onDragEnd(result, rows, setRows)}
        >
          <div className="wrapper bg-gray-100 md:w-3/5 w-full   h-4/5 rounded-xl p-10 shadow-xl">
            <h2 className="text-3xl font-medium">Write this in English</h2>
            <div className="question-wrapper mt-16 flex gap-3 text-lg">
              <Word text="Yo" hint="I" />
              <Word text="hablo" hint="speak" />
              <Word text="español" hint="Spanish" />
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
                        className="answers flex gap-2 w-full h-10"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
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

              <hr className=" border-gray-300" />
              <br />
              <hr className="mt-5 border-gray-300" />
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

            <div className="flex justify-center mt-10 md:mt-5">
              <button
                className="kids-button button-blue flex items-center justify-center gap-2"
                onClick={() => handleSubmit(rows, setRows, items)}
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
