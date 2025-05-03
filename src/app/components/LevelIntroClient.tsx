"use client";

import { Button } from "@/components/ui/button";
import { ILessonDetails } from "@/types/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LevelIntroClient({
  lessonDetails,
  lessonID,
}: {
  lessonDetails: ILessonDetails;
  lessonID: string;
}) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => setVideoEnded(true);
  const handleCompleteLesson = () => router.push(`/lessons/${lessonID}/map`);

  return (
    <>
      {videoEnded && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            onClick={handleCompleteLesson}
            className="kids-button button-blue cursor-pointer"
          >
            Complete Lesson
          </Button>
        </div>
      )}

      <div className="inset-0 w-screen h-screen bg-black flex flex-col fixed z-40">
        <div className="flex-grow relative">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            onEnded={handleVideoEnd}
            src={`/assets/videos/${lessonID}.mp4`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
