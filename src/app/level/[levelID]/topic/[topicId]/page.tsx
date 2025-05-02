"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LevelIntro() {
  const router = useRouter();
  const params = useParams();
  const topic = params.topicId as string;
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
        {/* Video Container */}
        <div className="flex-grow relative">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            onEnded={handleVideoEnd}
            src={`/assets/videos/level${level}-topic${topic}.mp4`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
