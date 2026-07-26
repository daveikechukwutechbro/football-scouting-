"use client";

import { User, Mail, Phone } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { RELATIONSHIP_OPTIONS } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

export default function Step3Guardian({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--fg-heading)" }}>Guardian Details</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
          Since you are under 18, we need a parent or guardian&apos;s information.
        </p>
      </div>

      <Input label="Guardian Name" placeholder="Full name of guardian" icon={User} value={data.guardianName || ""} onChange={(e) => updateData({ guardianName: e.target.value })} error={errors.guardianName} required />
      <Select label="Relationship" placeholder="Select relationship" options={RELATIONSHIP_OPTIONS} value={data.guardianRelationship || ""} onChange={(e) => updateData({ guardianRelationship: e.target.value })} error={errors.guardianRelationship} required />
      <Input label="Guardian Email" type="email" placeholder="guardian@example.com" icon={Mail} value={data.guardianEmail || ""} onChange={(e) => updateData({ guardianEmail: e.target.value })} error={errors.guardianEmail} required />
      <Input label="Guardian Phone" type="tel" placeholder="+1 (555) 123-4567" icon={Phone} value={data.guardianPhone || ""} onChange={(e) => updateData({ guardianPhone: e.target.value })} error={errors.guardianPhone} required />
    </div>
  );
}
