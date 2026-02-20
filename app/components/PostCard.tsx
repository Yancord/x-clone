import Link from "next/link";
import Card from "./ui/Card";

export default function PostCard({
  authorName,
  authorUsername,
  createdAt,
  content,
  showProfileLink = false,
}: {
  authorName: string;
  authorUsername: string;
  createdAt: Date | string;
  content: string;
  showProfileLink?: boolean;
}) {
  const date = new Date(createdAt);

  return (
    <Card className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {showProfileLink ? (
            <Link className="font-semibold underline" href={`/users/${authorUsername}`}>
              {authorName}
            </Link>
          ) : (
            <div className="font-semibold">{authorName}</div>
          )}
          <div className="text-sm text-gray-600">@{authorUsername}</div>
        </div>

        <div className="shrink-0 text-xs text-gray-500">{date.toLocaleString()}</div>
      </div>

      <div className="whitespace-pre-wrap text-sm">{content}</div>
    </Card>
  );
}
