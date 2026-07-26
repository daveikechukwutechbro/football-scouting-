"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-white shadow-md",
  secondary:
    "bg-accent hover:bg-accent/90 text-white shadow-md",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  ghost:
    "text-foreground dark:text-foreground bg-transparent hover:bg-surface-alt dark:hover:bg-surface-alt",
  danger:
    "bg-red-600 hover:bg-red-700 text-white shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  href,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out select-none cursor-pointer";
  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`.trim();

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
