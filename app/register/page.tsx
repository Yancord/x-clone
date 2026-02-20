"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          displayName: displayName.trim() || undefined,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Register failed");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Username</label>
          <Input
            className="w-full border rounded-md p-2"
            placeholder="e.g. janko_123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="text-xs text-gray-500">
            3–20 chars, letters/numbers/_ only
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Display name (optional)</label>
          <Input
            className="w-full border rounded-md p-2"
            placeholder="e.g. Janko"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Password</label>
          <Input
            className="w-full border rounded-md p-2"
            placeholder="min 6 characters"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create account"}
         </Button>
      </form>

      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
