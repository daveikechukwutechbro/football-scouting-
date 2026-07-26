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
        rounded-2xl border shadow-theme-sm
        ${paddingStyles[padding]}
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-theme-md"
            : "transition-all duration-200"
        }
        ${className}
      `}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}
