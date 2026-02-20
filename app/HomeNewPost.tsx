"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

const MAX_LEN = 280;

export default function HomeNewPost({ username }: { username: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    const text = content.trim();
    if (!text || text.length > MAX_LEN) {
      setErr(`Text must be 1-${MAX_LEN} characters.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${username}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Failed to post");
      }
      setContent("");
      window.location.reload();
    } catch (e: any) {
      setErr(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>New post</span>
        <span>{content.length}/{MAX_LEN}</span>
      </div>

      <textarea
        className="w-full border rounded-md p-2"
        rows={3}
        maxLength={MAX_LEN}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />

      {err && <div className="text-sm text-red-600">{err}</div>}

      <Button
      variant="primary"
        disabled={loading}
        onClick={submit}
      >
        {loading ? "Posting..." : "Post"}
      </Button>
    </section>
  );
}
