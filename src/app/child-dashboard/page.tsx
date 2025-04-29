"use client";

import { useRouter } from "next/navigation";
import LevelShape from "../components/LevelShape";

const levels = [
  { level: 1, title: "Level 1", isLocked: false, bgColor: "#FDD835" },
  { level: 2, title: "Level 2", isLocked: true, bgColor: "#EC407A" },
  { level: 3, title: "Level 3", isLocked: true, bgColor: "#66BB6A" },
  { level: 4, title: "Level 4", isLocked: true, bgColor: "#FFA726" },
  { level: 5, title: "Level 5", isLocked: true, bgColor: "#42A5F5" },
  { level: 6, title: "Level 6", isLocked: true, bgColor: "#AB47BC" },
];

export default function ChildDashboard() {
  const router = useRouter();

  const handleLevelClick = (levelId: number) => {
    if (!levels[levelId - 1].isLocked) {
      router.push(`/level/${levelId}/intro`);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-100 to-purple-100 overflow-auto">
      <div className="min-h-full w-full p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-6xl font-bold text-gray-800 mb-2 mt-5">
              Welcome, Little Leo
            </h1>
            <p className="text-3xl text-gray-600">
              Ready for an amazing adventure?
            </p>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {levels.map((level) => (
            <LevelShape
              key={level.level}
              level={level.level}
              title={level.title}
              isLocked={level.isLocked}
              bgColor={level.bgColor}
              onClick={() => handleLevelClick(level.level)}
            />
          ))}
        </div>
      </div>

      {/* Floating End Session Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-12 py-8 rounded-full bg-red-500 hover:bg-red-600 font-bold text-3xl text-white hover:scale-105 transition-all duration-300 ease-in-out transform"
        >
          End Session
        </button>
      </div>
    </div>
  );
}
