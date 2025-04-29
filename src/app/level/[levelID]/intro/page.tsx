"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LevelIntro() {
  const router = useRouter();
  const params = useParams();
  const level = params.levelID as string;

  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to handle video end
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // Function to complete the lesson and return to dashboard
  const handleCompleteLesson = () => {
    // Here you would typically update the user's progress to unlock the next level
    // For now, we'll just navigate back to the dashboard
    router.push(`/level/${level}/map`);
  };

  return (
    <div className="inset-0 w-screen h-screen bg-black flex flex-col">
      {/* Video Container */}
      <div className="flex-grow relative">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls
          autoPlay
          onEnded={handleVideoEnd}
          src={`/assets/videos/lesson${level}.mp4`}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-900 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Level {level}</div>

        {videoEnded && (
          <Button
            onClick={handleCompleteLesson}
            className={`className="px-12 py-8 rounded-full bg-green-600 hover:bg-green-700 font-bold text-3xl text-white transform hover:scale-105 transition-all duration-300 ease-in-out"`}
          >
            Complete Lesson
          </Button>
        )}
      </div>
    </div>
  );
}
