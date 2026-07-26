"use client";

import { type ReactNode, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-200 dark:border-border dark:bg-surface ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4 dark:border-border">
          {title && (
            <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
