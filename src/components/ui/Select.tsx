"use client";

import { type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
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
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium" style={{ color: "var(--fg-text)" }}>
          {label}
          {required && <span className="ml-0.5" style={{ color: "var(--danger)" }}>*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-input)",
            borderColor: error ? "var(--danger)" : "var(--border)",
            color: value ? "var(--fg)" : "var(--fg-muted)",
            ...(disabled ? { opacity: 0.5, cursor: "not-allowed" } : { cursor: "pointer" }),
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = "var(--primary)";
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = "var(--border)";
          }}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--fg-muted)" }}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>}
      {helperText && !error && <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{helperText}</p>}
    </div>
  );
}
