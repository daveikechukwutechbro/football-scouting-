"use client";

import { type ReactNode, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);

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
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl border transition-all duration-200"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          ...(isOpen ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(0.95)" }),
        }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          {title && <h2 className="text-lg font-semibold" style={{ color: "var(--fg-heading)" }}>{title}</h2>}
          <button onClick={onClose} className="ml-auto rounded-lg p-1.5 transition-colors" style={{ color: "var(--fg-muted)" }}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
