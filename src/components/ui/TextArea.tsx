"use client";

import { type TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
  helperText?: string;
  showCounter?: boolean;
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  maxLength,
  helperText,
  rows = 4,
  className = "",
  id,
  showCounter = false,
  ...props
}: TextAreaProps) {
  const textareaId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const currentLength = typeof value === "string" ? value.length : 0;
  const showCounterActual = showCounter && maxLength != null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-foreground dark:text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`w-full resize-y rounded-xl border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 min-h-[80px] dark:bg-input dark:text-foreground dark:placeholder:text-muted ${
          error
            ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-border dark:border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
        } ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      <div className="flex items-center justify-between">
        <div>
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-xs text-muted">{helperText}</p>
          )}
        </div>
        {showCounterActual && (
          <p
            className={`text-xs ${
              currentLength >= maxLength
                ? "text-red-500 dark:text-red-400"
                : "text-muted"
            }`}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
