"use client";

import { type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  helperText?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  helperText,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-foreground dark:text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full appearance-none rounded-xl border bg-input px-4 py-2.5 pr-10 text-sm outline-none transition-all duration-200 dark:bg-input dark:text-foreground ${
            value
              ? "text-foreground dark:text-foreground"
              : "text-muted"
          } ${
            error
              ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-border dark:border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
          } ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          <ChevronDown className="h-4 w-4" />
        </div>
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
