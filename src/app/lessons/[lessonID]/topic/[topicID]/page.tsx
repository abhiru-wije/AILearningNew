import TopicIntroClient from "@/app/components/TopicIntroClient";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TopicIntroPage({ params }: { params: any }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.access_token) {
    redirect("/auth/signin");
  }

  return (
    <TopicIntroClient
      lessonID={params.lessonID}
      topicID={params.topicID}
      accessToken={session.access_token}
    />
  );
}
