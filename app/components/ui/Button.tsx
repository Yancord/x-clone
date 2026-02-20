"use client";

import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "border border-gray-300 bg-white text-black hover:bg-gray-50";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
