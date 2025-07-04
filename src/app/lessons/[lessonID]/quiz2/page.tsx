import ImageQuizStepper from "@/app/components/ImageQuizStepper";
import QuizStepper from "@/app/components/QuizStepper";
import { authOptions } from "@/config/auth-options";
import { IImageQuizInfo } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DATA: IImageQuizInfo = {
  lesson: {
    lessonId: "680db3d36e4d3cba6e001882",
    name: "Level 1",
  },
  quiz: [
    {
      name: "Picture Word Builder",
      type: "image",
      instructions: [
        "Look at the picture below.",
        "Check the jumbled letters below.",
        "Drag and drop the letters to the correct boxes in the center to spell the word.",
      ],
      questions: [
        "Beach",
        "Country Side",
        "Forest",
        "Mountain",
        "Park",
        "River",
      ],
      answer: [
        "680db3d36e4d3cba6e001883",
        "680db3d36e4d3cba6e001884",
        "680db3d36e4d3cba6e001885",
        "6830a075f5a3fd320d6e8325",
        "6830a1c1f5a3fd320d6e8326",
        "6830a211f5a3fd320d6e8327",
      ],
    },
    // {
    //   name: "Text Matching",
    //   type: "text",
    //   instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
    //   image: "680db3d36e4d3cba6e001883",
    //   answer: "BEACH",
    // },
  ],
};

export default async function Quiz({ params }: { params: any }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.access_token) {
    redirect("/auth/signin");
  }

  const param = await params;

  // const res = await fetch(`${API_ENDPOINTS.LESSONS}/${param.lessonID}/quiz`, {
  //   headers: {
  //     Authorization: `Bearer ${session.access_token}`,
  //   },
  //   cache: "no-store", // ensure fresh data
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to load quiz details");
  // }

  // const quizDetails = await res.json();

  return <ImageQuizStepper quizDetails={DATA} lessonID={param.lessonID} />;
}
