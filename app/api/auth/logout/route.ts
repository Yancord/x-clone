import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();

  session.destroy();     // briše podatke iz session-a
  await session.save();  // <<< OBAVEZNO: upisuje brisanje cookie-ja

  return NextResponse.json({ ok: true });
}
