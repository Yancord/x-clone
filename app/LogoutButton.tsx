"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");   // replace umesto push
    router.refresh();           // re-render server komponenti (Header)
    setLoading(false);
  }

  return (
    <Button variant="secondary" onClick={logout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
