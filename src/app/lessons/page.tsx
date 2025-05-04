import { API_ENDPOINTS } from "@/config/api";
import { authOptions } from "@/config/auth-options";
import axios from "axios";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LessonsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.access_token) {
    throw new Error("Unauthorized");
  }

  const response = await axios.get(API_ENDPOINTS.LESSONS, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  const lessons = response.data;

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
      <div className="fixed inset-0 w-screen h-screen overflow-auto">
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
            {lessons.map((level: any) =>
              level.isLocked ? (
                <div
                  key={level.lessonId}
                  className="kids-button button-blue flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                  title="Level is locked"
                >
                  <Lock size={25} />
                  {level.name}
                </div>
              ) : (
                <Link
                  key={level.lessonId}
                  className="kids-button button-blue flex items-center justify-center gap-2"
                  href={`/lessons/${level.lessonId}/intro`}
                >
                  {level.name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Floating End Session Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <Link
            href="/dashboard"
            className="cursor-pointer button-red kids-button"
          >
            End Session
          </Link>
        </div>
      </div>
    </>
  );
}
