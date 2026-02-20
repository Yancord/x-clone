"use client";

import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={`w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-black ${className}`}
      {...props}
    />
  );
}
