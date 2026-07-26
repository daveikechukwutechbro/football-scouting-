"use client";

import { type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const currentLength = typeof value === "string" ? value.length : 0;
  const showCounterActual = showCounter && maxLength != null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium" style={{ color: "var(--fg-text)" }}>
          {label}
          {required && <span className="ml-0.5" style={{ color: "var(--danger)" }}>*</span>}
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
        className="w-full resize-y rounded-xl border px-4 py-2.5 text-sm outline-none transition-all duration-200 min-h-[80px]"
        style={{
          backgroundColor: "var(--bg-input)",
          borderColor: error ? "var(--danger)" : "var(--border)",
          color: "var(--fg)",
          ...(disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}),
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = "var(--primary)";
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = "var(--border)";
        }}
        {...props}
      />
      <div className="flex items-center justify-between">
        <div>
          {error && <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>}
          {helperText && !error && <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{helperText}</p>}
        </div>
        {showCounterActual && (
          <p className="text-xs" style={{ color: currentLength >= maxLength ? "var(--danger)" : "var(--fg-muted)" }}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
