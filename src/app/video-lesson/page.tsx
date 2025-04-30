'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function VideoLessonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || '1';
  
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
    router.push('/child-dashboard');
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
          src="/assets/videos/lesson1.mp4" 
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-900 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Level {level}
        </div>
        
        <Button
          onClick={handleCompleteLesson}
          disabled={!videoEnded}
          className={`flex items-center gap-2 ${
            videoEnded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {videoEnded && <CheckCircle className="h-5 w-5" />}
          {videoEnded ? 'Complete Lesson' : 'Watch the video to complete'}
        </Button>
      </div>
    </div>
  );
} 

export default function VideoLesson() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoLessonContent />
    </Suspense>
  );
} 