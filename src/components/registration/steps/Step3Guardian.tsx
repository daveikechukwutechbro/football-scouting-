"use client";

import { Shield, Mail, Phone } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { RELATIONSHIP_OPTIONS } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

export default function Step3Guardian({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A843]/10">
            <Shield className="h-5 w-5 text-[#D4A843]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Guardian Information</h2>
        </div>
        <p className="mt-1 text-sm text-gray-400">
          Since you are under 18, we need a parent or guardian&apos;s contact information for
          consent and communication purposes.
        </p>
      </div>

      <Input
        label="Guardian Full Name"
        placeholder="Enter guardian's full name"
        icon={Shield}
        value={data.guardianName || ""}
        onChange={(e) => updateData({ guardianName: e.target.value })}
        error={errors.guardianName}
        required
      />

      <Select
        label="Relationship to Player"
        placeholder="Select relationship"
        options={RELATIONSHIP_OPTIONS}
        value={data.guardianRelationship || ""}
        onChange={(e) => updateData({ guardianRelationship: e.target.value })}
        error={errors.guardianRelationship}
        required
      />

      <Input
        label="Guardian Email"
        type="email"
        placeholder="guardian@example.com"
        icon={Mail}
        value={data.guardianEmail || ""}
        onChange={(e) => updateData({ guardianEmail: e.target.value })}
        error={errors.guardianEmail}
        required
        autoComplete="email"
      />

      <Input
        label="Guardian Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        icon={Phone}
        value={data.guardianPhone || ""}
        onChange={(e) => updateData({ guardianPhone: e.target.value })}
        error={errors.guardianPhone}
        required
        autoComplete="tel"
      />
    </div>
  );
}
