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
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          whitespace-nowrap rounded-lg bg-[#1A1F2E] px-3 py-1.5
          text-xs text-white shadow-lg shadow-black/30 border border-gray-700
          pointer-events-none z-50
          transition-all duration-200 ease-in-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
        role="tooltip"
      >
        {content}
        <div
          className="
            absolute top-full left-1/2 -translate-x-1/2 -mt-px
            w-0 h-0
            border-l-[5px] border-l-transparent
            border-r-[5px] border-r-transparent
            border-t-[5px] border-t-[#1A1F2E]
          "
        />
      </div>
    </div>
  );
}
