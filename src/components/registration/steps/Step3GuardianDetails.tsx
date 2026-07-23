"use client";

import { useState, type ChangeEvent } from "react";
import {
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { RELATIONSHIP_OPTIONS } from "@/lib/constants";
import type { StepProps } from "@/lib/types";

function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function Step3GuardianDetails({
  data,
  updateData,
  errors,
}: StepProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const age = calculateAge(data.dateOfBirth || "");
  const isUnder18 = age !== null && age < 18;

  const handleField = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData({ [field]: e.target.value });
    if (!touched[field]) setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  if (!isUnder18) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0D7B3E]/10">
          <Shield className="h-8 w-8 text-[#0D7B3E]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Guardian Details Not Required</h2>
          <p className="mt-2 max-w-md text-sm text-gray-400">
            Based on your date of birth, you are 18 or older. Guardian consent is not needed for your registration.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            You can safely proceed to the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Guardian Details</h2>
        <p className="mt-1 text-sm text-gray-400">
          Since you are under 18, we need details and consent from your parent or guardian.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Guardian Full Name"
          type="text"
          placeholder="e.g. Jane Smith"
          value={data.guardianName || ""}
          onChange={handleField("guardianName")}
          onBlur={handleBlur("guardianName")}
          error={touched.guardianName ? errors.guardianName : undefined}
          icon={User}
          required
          autoComplete="name"
        />

        <Select
          label="Relationship to Player"
          options={RELATIONSHIP_OPTIONS}
          value={data.guardianRelationship || ""}
          onChange={handleField("guardianRelationship")}
          error={touched.guardianRelationship ? errors.guardianRelationship : undefined}
          placeholder="Select relationship"
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Guardian Phone Number"
            type="tel"
            placeholder="e.g. +1234567890"
            value={data.guardianPhone || ""}
            onChange={handleField("guardianPhone")}
            onBlur={handleBlur("guardianPhone")}
            error={touched.guardianPhone ? errors.guardianPhone : undefined}
            icon={Phone}
            required
            autoComplete="tel"
          />

          <Input
            label="Guardian Email"
            type="email"
            placeholder="e.g. jane@example.com"
            value={data.guardianEmail || ""}
            onChange={handleField("guardianEmail")}
            onBlur={handleBlur("guardianEmail")}
            error={touched.guardianEmail ? errors.guardianEmail : undefined}
            icon={Mail}
            required
            autoComplete="email"
          />
        </div>

        <Input
          label="Guardian Address"
          type="text"
          placeholder="e.g. 456 Oak Avenue, Suite 2, London"
          value={data.guardianAddress || ""}
          onChange={handleField("guardianAddress")}
          onBlur={handleBlur("guardianAddress")}
          error={touched.guardianAddress ? errors.guardianAddress : undefined}
          icon={MapPin}
          required
        />

        <div className="flex flex-col gap-3 mt-2 p-4 rounded-xl border border-gray-700 bg-[#1A1F2E]">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                checked={data.guardianConsent || false}
                onChange={(e) => updateData({ guardianConsent: e.target.checked })}
                className="peer sr-only"
              />
              <div className="h-5 w-5 shrink-0 rounded-md border border-gray-600 bg-[#232838] transition-all duration-200 peer-checked:border-[#0D7B3E] peer-checked:bg-[#0D7B3E] group-hover:border-gray-500">
                <CheckCircle2
                  className={`h-5 w-5 text-white transition-opacity duration-200 ${
                    data.guardianConsent ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
            <span className="text-sm text-gray-300 leading-snug">
              I confirm that my parent/guardian has given consent for me to register on this platform
              <span className="text-red-500 ml-0.5">*</span>
            </span>
          </label>
          {errors.guardianConsent && (
            <p className="text-xs text-red-500 ml-8">{errors.guardianConsent}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Consent Confirmation"
            type="text"
            placeholder='Type "I CONSENT" to confirm'
            value={data.consentConfirmation || ""}
            onChange={handleField("consentConfirmation")}
            onBlur={handleBlur("consentConfirmation")}
            error={touched.consentConfirmation ? errors.consentConfirmation : undefined}
            icon={Shield}
            required
          />
          <p className="text-xs text-gray-500">
            Please type <span className="font-mono text-[#D4A843]">I CONSENT</span> in all capital letters to confirm guardian approval.
          </p>
        </div>
      </div>
    </div>
  );
}
