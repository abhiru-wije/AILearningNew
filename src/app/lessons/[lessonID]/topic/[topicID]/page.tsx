import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TopicIntroClient from "@/app/components/TopicIntroClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TopicIntroPage({
  params,
}: {
  params: { lessonID: string; topicID: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.access_token) {
    redirect("/auth/signin");
  }

  // Optional: If you want to check whether the topic is already completed,
  // you can call your API here and redirect early.

  return (
    <TopicIntroClient
      lessonID={params.lessonID}
      topicID={params.topicID}
      accessToken={session.access_token}
    />
  );
}
