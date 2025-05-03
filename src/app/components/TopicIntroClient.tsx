"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface Props {
  lessonID: string;
  topicID: string;
  accessToken: string;
}

export default function TopicIntroClient({
  lessonID,
  topicID,
  accessToken,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleCompleteLesson = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/lesson/${lessonID}/topic/${topicID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update topic completion");
      }

      router.push(`/lessons/${lessonID}/map`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {videoEnded && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            onClick={handleCompleteLesson}
            className="kids-button button-blue cursor-pointer"
            disabled={loading}
          >
            {loading ? "Loading" : "Complete Lesson"}
          </Button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <p className="text-sm text-red-600">{error}</p>
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
            src={`/assets/videos/${topicID}.mp4`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
