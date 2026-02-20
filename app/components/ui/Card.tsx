import * as React from "react";

export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}>{children}</div>;
}
