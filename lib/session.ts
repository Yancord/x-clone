import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export type SessionData = {
  userId?: string;
  username?: string;
};

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "xclone_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
