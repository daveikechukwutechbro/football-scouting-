"use client";

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-[#1A1F2E] shadow-lg shadow-black/20
        ${paddingStyles[padding]}
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0D7B3E]/10 hover:border hover:border-[#0D7B3E]/30"
            : "transition-all duration-200"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
