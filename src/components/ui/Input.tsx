"use client";

import { type InputHTMLAttributes, type ReactNode, useState, type ElementType } from "react";
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
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: "var(--fg-text)" }}>
          {label}
          {required && <span className="ml-0.5" style={{ color: "var(--danger)" }}>*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--fg-muted)" }}>
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
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-input)",
            borderColor: error ? "var(--danger)" : "var(--border)",
            color: "var(--fg)",
            ...(Icon ? { paddingLeft: "2.5rem" } : {}),
            ...(isPassword ? { paddingRight: "2.5rem" } : {}),
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
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "var(--fg-muted)" }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>}
      {helperText && !error && <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{helperText}</p>}
    </div>
  );
}
