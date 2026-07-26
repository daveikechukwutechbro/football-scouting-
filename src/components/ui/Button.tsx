"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "text-white shadow-md",
  secondary: "text-white shadow-md",
  outline: "border-2",
  ghost: "",
  danger: "text-white shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

function getVariantStyle(variant: ButtonVariant): React.CSSProperties {
  switch (variant) {
    case "primary":
      return { backgroundColor: "var(--primary)", color: "white" };
    case "secondary":
      return { backgroundColor: "var(--accent)", color: "white" };
    case "outline":
      return { border: "2px solid var(--primary)", color: "var(--primary)", backgroundColor: "transparent" };
    case "ghost":
      return { color: "var(--fg-text)", backgroundColor: "transparent" };
    case "danger":
      return { backgroundColor: "var(--danger)", color: "white" };
  }
}

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
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out select-none cursor-pointer";
  const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  if (href && !disabled && !loading) {
    return <Link href={href} className={combinedClassName} style={getVariantStyle(variant)}>{children}</Link>;
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={combinedClassName}
      style={getVariantStyle(variant)}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
