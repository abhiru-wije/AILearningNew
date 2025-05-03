import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LevelIntroClient from "@/app/components/LevelIntroClient";
import { API_ENDPOINTS } from "@/config/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LevelIntroPage({
  params,
}: {
  params: { lessonID: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.access_token) {
    redirect("/auth/signin");
  }

  const res = await fetch(`${API_ENDPOINTS.LESSONS}/${params.lessonID}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    cache: "no-store", // ensure fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to load lesson details");
  }

  const lessonDetails = await res.json();

  if (lessonDetails.isIntroDone) {
    redirect(`/lessons/${params.lessonID}/map`);
  }

  return (
    <LevelIntroClient
      lessonDetails={lessonDetails}
      lessonID={params.lessonID}
    />
  );
}
