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
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
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
        className={`
          w-full resize-y rounded-xl border bg-[#232838] px-4 py-2.5
          text-sm text-white placeholder-gray-500 outline-none transition-all duration-200
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
              : "border-gray-700 focus:border-[#0D7B3E] focus:ring-2 focus:ring-[#0D7B3E]/30"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          min-h-[80px]
        `}
        {...props}
      />
      <div className="flex items-center justify-between">
        <div>
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-xs text-gray-500">{helperText}</p>
          )}
        </div>
        {showCounterActual && (
          <p className={`text-xs ${currentLength >= maxLength ? "text-red-500" : "text-gray-500"}`}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
