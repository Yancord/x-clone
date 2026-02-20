"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function NewPost({ username }: { username: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!content.trim()) return;

    setLoading(true);

    await fetch(`/api/users/${username}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    setContent("");
    window.location.reload();
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={280}
        placeholder="What's happening?"
      />
      <Button
        onClick={submit}
        disabled={loading}
      >
        Post
      </Button>
    </div>
  );
}
