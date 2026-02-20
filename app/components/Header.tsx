import Link from "next/link";
import { getSession } from "@/lib/session";
import LogoutButton from "@/app/LogoutButton";
import SessionGuard from "../SessionGuard";

export default async function Header() {
  const session = await getSession();
  const isLoggedIn = Boolean(session.userId && session.username);

  return (
    <header className="border-b bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          X Clone
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="underline">
                Login
              </Link>
              <Link href="/register" className="px-3 py-1 border rounded-md">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/users/${session.username}`}
                className="underline font-medium"
              >
                @{session.username}
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>

      {/* OVO JE CLIENT GUARD: proveri da li user postoji, pa ako ne -> logout */}
      <SessionGuard enabled={isLoggedIn} />
    </header>
  );
}
