import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, passwordHash: true },
  });

  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

if (!user.passwordHash) {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


  const session = await getSession();
  session.userId = user.id;
  session.username = user.username;
  await session.save();

  return NextResponse.json({ ok: true });
}
