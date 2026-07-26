"use client";

import { type ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs shadow-lg pointer-events-none z-50 transition-all duration-200 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
        style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)", border: "1px solid var(--border)" }}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
