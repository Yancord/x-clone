
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import HomeNewPost from "./HomeNewPost";
import Card from "./components/ui/Card";
import PostCard from "./components/PostCard";
 
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getSession();

  // GUEST VIEW
  if (!session.userId || !session.username) {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Welcome to X-Clone app made by J</h1>
      </div>
    );
  }

  // LOGGED-IN VIEW
  const [users, posts] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { username: true, displayName: true },
      take: 20,
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: { select: { username: true, displayName: true } },
      },
    }),
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6 grid gap-6 md:grid-cols-[1fr_280px]">
      <main className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">POSTS</div>
            
          </div>
        </header>

        <Card className="space-y-2">
              <HomeNewPost username={session.username} />
        </Card>

        <section className="space-y-3">
          {posts.map((p) => (
            <PostCard
  key={p.id}
  authorName={p.user.displayName ?? p.user.username}
  authorUsername={p.user.username}
  createdAt={p.createdAt}
  content={p.content}
  showProfileLink={false}
/>
          ))}
          {posts.length === 0 && <div className="text-gray-600">No posts yet.</div>}
        </section>
      </main>

    </div>
  );
}
