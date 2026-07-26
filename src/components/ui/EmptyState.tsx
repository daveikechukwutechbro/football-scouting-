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

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt dark:bg-surface-alt">
        <Icon className="h-8 w-8 text-muted" />
      </div>
      <h3 className="mt-4 mb-1 text-lg font-semibold text-foreground dark:text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted">
          {description}
        </p>
      )}
      {action && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
