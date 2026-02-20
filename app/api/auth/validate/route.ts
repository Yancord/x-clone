import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();

  if (!session.userId) {
    return NextResponse.json({ ok: true, loggedIn: false });
  }

  const exists = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true },
  });

  if (!exists) {
    session.destroy(); // OVDE SME jer je route handler
    return NextResponse.json({ ok: true, loggedIn: false });
  }

  return NextResponse.json({ ok: true, loggedIn: true });
}
