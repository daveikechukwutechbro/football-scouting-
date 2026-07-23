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
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#232838] mb-4">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400 max-w-sm mb-6">{description}</p>
      )}
      {action && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
