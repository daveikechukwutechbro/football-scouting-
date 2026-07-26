"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  type ElementType,
} from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  icon?: ElementType;
  helperText?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  helperText,
  className = "",
  id,
  autoComplete,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground dark:text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 dark:bg-input dark:text-foreground dark:placeholder:text-muted ${
            Icon ? "pl-10" : ""
          } ${
            isPassword ? "pr-10" : ""
          } ${
            error
              ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-border dark:border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
          } ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-muted">{helperText}</p>
      )}
    </div>
  );
}
