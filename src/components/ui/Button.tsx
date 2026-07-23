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
  primary:
    "bg-[#0D7B3E] text-white hover:bg-[#0a6632] active:bg-[#085528] shadow-md shadow-[#0D7B3E]/20",
  secondary:
    "bg-[#D4A843] text-[#0F1419] hover:bg-[#c49a3a] active:bg-[#b58d33] shadow-md shadow-[#D4A843]/20",
  outline:
    "border-2 border-[#0D7B3E] text-[#0D7B3E] hover:bg-[#0D7B3E]/10 active:bg-[#0D7B3E]/20",
  ghost:
    "text-gray-300 hover:bg-white/5 active:bg-white/10",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md shadow-red-600/20",
};

const sizeStyles: Record<ButtonSize, string> = {
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
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out select-none";

  const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={combinedClassName}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
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
