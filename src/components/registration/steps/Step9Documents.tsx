"use client";

import { FileText, Info, Shield, Globe, GraduationCap, Heart, FolderOpen, UserCheck } from "lucide-react";
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
  { key: "schoolId", label: "School ID", icon: GraduationCap },
  { key: "medicalCertificate", label: "Medical Certificate", icon: Heart },
  { key: "clubClearance", label: "Club Clearance Letter", icon: FolderOpen },
  {
    key: "parentConsent",
    label: "Parent Consent Document",
    icon: UserCheck,
    helperText: "Required if you are under 18",
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
    return () => {
      updateData({
        documents: {
          ...documents,
          [key]: null,
        },
      });
    };
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Documents</h2>
        <p className="mt-1 text-sm text-gray-400">
          Upload any supporting documents to strengthen your application.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#D4A843]/30 bg-[#D4A843]/5 px-4 py-3">
        <Info className="h-5 w-5 shrink-0 text-[#D4A843] mt-0.5" />
        <p className="text-sm text-gray-300">
          All documents are optional but may be required before trial invitations.
          Accepted formats: PDF, JPG, PNG (max 5MB each).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {DOCUMENT_FIELDS.map(({ key, label, icon: Icon, helperText }) => {
          const file = documents[key];

          return (
            <Card key={key} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#0D7B3E]" />
                <span className="text-sm font-medium text-white">{label}</span>
              </div>

              <FileUpload
                accept={ACCEPT_TYPES}
                onChange={handleFileChange(key)}
                error={errors[key]}
                maxSize={MAX_SIZE}
                currentFile={file}
                onRemove={handleRemove(key)}
                helperText={helperText || "PDF, JPG, or PNG (max 5MB)"}
                id={`doc-${key}`}
              />

              {file instanceof File && (
                <div className="flex items-center gap-2 rounded-lg bg-[#232838] px-3 py-2 border border-gray-700">
                  <FileText className="h-4 w-4 text-[#D4A843] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemove(key)}
                    className="shrink-0 text-xs text-red-400 hover:text-red-300 transition-colors"
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
