import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import NewPost from "./new-post-client";
import type { Metadata } from "next";
import PostCard from "@/app/components/PostCard";

export async function generateMetadata(
  { params }: { params: Promise<{ username: string }> }
): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `@${username}`,
  };
}

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

const session = await getSession();
if (!session.userId || !session.username) {
  return <div className="p-6">Please login</div>;
}

if (session.username !== username) {
  return <div className="p-6">Forbidden</div>; // ili redirect na /
}

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  });

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
       
      <header className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
          {user.username.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <div className="text-xl font-bold">
            {user.displayName ?? user.username}
          </div>
          <div className="text-gray-600">@{user.username}</div>
        </div>
      </header>

      <NewPost username={user.username} />

      <section className="space-y-3">
        {posts.map((p) => (
         <PostCard
  key={p.id}
  authorName={user.displayName ?? user.username}
  authorUsername={user.username}
  createdAt={p.createdAt}
  content={p.content}
  showProfileLink={false}
/>
        ))}

        {posts.length === 0 && (
          <div className="text-gray-600">No posts yet.</div>
        )}
      </section>
    </div>
  );
}
