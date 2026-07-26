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
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1.5 text-xs shadow-lg transition-all duration-200 ease-in-out dark:border-border dark:bg-surface ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
