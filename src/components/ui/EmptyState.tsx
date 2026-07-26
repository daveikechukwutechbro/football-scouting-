"use client";

import { type ElementType } from "react";
import Button from "./Button";

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, action, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: "var(--bg-input)" }}>
        <Icon className="h-8 w-8" style={{ color: "var(--fg-muted)" }} />
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-1" style={{ color: "var(--fg-heading)" }}>{title}</h3>
      {description && <p className="text-sm max-w-sm mb-6" style={{ color: "var(--fg-muted)" }}>{description}</p>}
      {action && onAction && <Button variant="primary" size="md" onClick={onAction}>{action}</Button>}
    </div>
  );
}
