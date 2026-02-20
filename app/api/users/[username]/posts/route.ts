import { getSession } from "@/lib/session";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const MAX_LEN = 280;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const session = await getSession();
  if (!session.userId || !session.username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.username !== username) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!content || content.length > MAX_LEN) {
    return NextResponse.json(
      { error: `Post must be 1-${MAX_LEN} characters` },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: { content, userId: session.userId },
  });

  return NextResponse.json(post, { status: 201 });
}
