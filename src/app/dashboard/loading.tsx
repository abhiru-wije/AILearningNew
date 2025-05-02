"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
