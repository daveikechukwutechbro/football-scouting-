"use client";

import {
  FileText,
  Info,
  Shield,
  Globe,
  GraduationCap,
  Heart,
  FolderOpen,
  UserCheck,
} from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import Card from "@/components/ui/Card";
import type { StepProps } from "@/lib/types";

const ACCEPT_TYPES = "application/pdf,image/jpeg,image/png";
const MAX_SIZE = 5 * 1024 * 1024;

interface DocumentField {
  key: string;
  label: string;
  icon: typeof FileText;
  helperText?: string;
}

const DOCUMENT_FIELDS: DocumentField[] = [
  { key: "nationalId", label: "National ID", icon: Shield },
  { key: "passport", label: "Passport", icon: Globe },
  { key: "birthCertificate", label: "Birth Certificate", icon: FileText },
  {
    key: "schoolId",
    label: "School ID",
    icon: GraduationCap,
  },
  {
    key: "medicalCertificate",
    label: "Medical Certificate",
    icon: Heart,
  },
  {
    key: "clubClearance",
    label: "Club Clearance Letter",
    icon: FolderOpen,
  },
  {
    key: "parentConsent",
    label: "Parent Consent Document",
    icon: UserCheck,
    helperText: "Required if under 18",
  },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export default function Step9Documents({
  data,
  updateData,
  errors,
}: StepProps) {
  const documents = (data.documents || {}) as Record<string, File | null>;

  function handleFileChange(key: string) {
    return (file: File | File[] | null) => {
      updateData({
        documents: {
          ...documents,
          [key]: file instanceof File ? file : null,
        },
      });
    };
  }

  function handleRemove(key: string) {
    return () =>
      updateData({
        documents: { ...documents, [key]: null },
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground dark:text-foreground">
          Documents
        </h2>
        <p className="mt-1 text-sm text-muted">
          Upload any supporting documents to strengthen your application.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-950/30">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-foreground dark:text-foreground">
          All documents are optional but may be required before trial
          invitations. Accepted: PDF, JPG, PNG (max 5MB each).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {DOCUMENT_FIELDS.map(({ key, label, icon: Icon, helperText }) => {
          const file = documents[key];
          return (
            <Card key={key} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground dark:text-foreground">
                  {label}
                </span>
              </div>
              <FileUpload
                accept={ACCEPT_TYPES}
                onChange={handleFileChange(key)}
                error={errors[key]}
                maxSize={MAX_SIZE}
                currentFile={file}
                onRemove={handleRemove(key)}
                helperText={
                  helperText || "PDF, JPG, or PNG (max 5MB)"
                }
                id={`doc-${key}`}
              />
              {file instanceof File && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 dark:border-border dark:bg-surface-alt">
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
                    onClick={handleRemove(key)}
                    className="shrink-0 text-xs text-red-500 transition-colors hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
