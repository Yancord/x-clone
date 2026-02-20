"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionGuard({ enabled }: { enabled: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const res = await fetch("/api/auth/validate", { method: "POST" });
      const data = await res.json().catch(() => null);

      if (data && data.loggedIn === false) {
        router.refresh();
      }
    })();
  }, [enabled, router]);

  return null;
}
