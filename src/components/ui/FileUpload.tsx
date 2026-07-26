"use client";

import {
  type DragEvent,
  type ChangeEvent,
  useState,
  useRef,
} from "react";
import { Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  onChange: (file: File | File[] | null) => void;
  error?: string;
  maxSize?: number;
  currentFile?: File | null;
  onRemove?: () => void;
  helperText?: string;
  id?: string;
  multiple?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export default function FileUpload({
  label,
  accept,
  onChange,
  error,
  maxSize,
  currentFile = null,
  onRemove,
  helperText,
  id,
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || "file-upload";

  function validateFile(file: File): boolean {
    setLocalError(null);
    if (maxSize && file.size > maxSize) {
      setLocalError(`File size exceeds ${formatFileSize(maxSize)}`);
      return false;
    }
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const matches = acceptedTypes.some(
        (type) =>
          type === fileExtension || file.type.match(type.replace("*", ".*"))
      );
      if (!matches) {
        setLocalError(`File type not accepted. Allowed: ${accept}`);
        return false;
      }
    }
    return true;
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    if (multiple) {
      const validFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) validFiles.push(files[i]);
      }
      if (validFiles.length > 0) onChange(validFiles);
    } else {
      const file = files[0];
      if (file && validateFile(file)) onChange(file);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }
  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  const displayError = error || localError;
  const files: File[] = currentFile
    ? Array.isArray(currentFile)
      ? currentFile
      : [currentFile]
    : [];

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground dark:text-foreground">
          {label}
        </label>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 transition-all duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : displayError
              ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950/20"
              : "border-border bg-input dark:border-border dark:bg-input"
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        <Upload
          className={`h-8 w-8 ${
            isDragging ? "text-primary" : "text-muted"
          }`}
        />
        <div className="text-center">
          <p className="text-sm text-foreground dark:text-foreground">
            <span className="font-medium text-primary">
              Click to browse
            </span>{" "}
            or drag and drop
          </p>
          {accept && (
            <p className="mt-1 text-xs text-muted">
              Accepted: {accept}
            </p>
          )}
          {maxSize && (
            <p className="mt-0.5 text-xs text-muted">
              Max size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-input px-3 py-2 dark:border-border dark:bg-input"
            >
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground dark:text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                  onChange(null);
                }}
                className="shrink-0 text-muted transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {displayError && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {displayError}
        </p>
      )}
      {helperText && !displayError && (
        <p className="text-xs text-muted">{helperText}</p>
      )}
    </div>
  );
}
