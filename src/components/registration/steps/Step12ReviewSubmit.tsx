"use client";

import {
  User,
  Shirt,
  Ruler,
  BarChart3,
  Video,
  FileText,
  Calendar,
  Globe,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { POSITIONS, COUNTRIES, PREFERRED_FOOT, FOOTBALL_LEVELS } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

function getCountryLabel(code: string): string {
  if (!code) return "Not provided";
  const country = COUNTRIES.find((c) => c.value === code);
  return country?.label || code;
}

function getPositionLabel(code: string): string {
  if (!code) return "Not provided";
  const pos = POSITIONS.find((p) => p.value === code);
  return pos?.label || code;
}

function getFootLabel(code: string): string {
  if (!code) return "Not provided";
  const foot = PREFERRED_FOOT.find((f) => f.value === code);
  return foot?.label || code;
}

function getLevelLabel(code: string): string {
  if (!code) return "Not provided";
  const level = FOOTBALL_LEVELS.find((l) => l.value === code);
  return level?.label || code;
}

interface ReviewSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function ReviewSection({ title, icon: Icon, children }: ReviewSectionProps) {
  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D7B3E]/15">
          <Icon className="h-4 w-4 text-[#0D7B3E]" />
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {children}
      </div>
    </Card>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  const isEmpty = !value || value === "Not provided";
  return (
    <div className="flex flex-col py-1.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm ${isEmpty ? "text-gray-600 italic" : "text-white"}`}>
        {value || "Not provided"}
      </span>
    </div>
  );
}

export default function Step12ReviewSubmit({ data }: StepProps) {
  const sections = [
    {
      title: "Account",
      icon: User,
      fields: [
        { label: "Email", value: data.email || "" },
      ],
    },
    {
      title: "Personal Details",
      icon: User,
      fields: [
        { label: "Full Name", value: `${data.firstName || ""} ${data.lastName || ""}`.trim() },
        { label: "Date of Birth", value: data.dateOfBirth || "" },
        { label: "Age", value: data.age ? `${data.age} years` : "" },
        { label: "Nationality", value: getCountryLabel(data.nationality) },
        { label: "Country of Residence", value: getCountryLabel(data.country) },
        { label: "City", value: data.city || "" },
        { label: "Phone", value: data.phoneNumber || "" },
      ],
    },
    {
      title: "Football Profile",
      icon: Shirt,
      fields: [
        { label: "Primary Position", value: getPositionLabel(data.currentPosition) },
        { label: "Preferred Foot", value: getFootLabel(data.preferredFoot) },
        { label: "Current Level", value: getLevelLabel(data.currentLevel) },
        { label: "Contract Status", value: data.contractStatus || "" },
        { label: "Current Club", value: data.currentClub || "" },
        { label: "Experience", value: data.yearsExperience ? `${data.yearsExperience} years` : "" },
        { label: "Previous Clubs", value: data.previousClubs || "" },
      ],
    },
    {
      title: "Physical Attributes",
      icon: Ruler,
      fields: [
        { label: "Height", value: data.height ? `${data.height} cm` : "" },
        { label: "Weight", value: data.weight ? `${data.weight} kg` : "" },
        { label: "Body Type", value: data.bodyType || "" },
        { label: "Fitness Level", value: data.fitnessLevel || "" },
        { label: "Injuries", value: data.injuries || "" },
      ],
    },
    {
      title: "Statistics",
      icon: BarChart3,
      fields: [
        { label: "Appearances", value: data.totalAppearances || "" },
        { label: "Goals", value: data.totalGoals || "" },
        { label: "Assists", value: data.totalAssists || "" },
        { label: "Clean Sheets", value: data.cleanSheets || "" },
        { label: "Yellow Cards", value: data.yellowCards || "" },
        { label: "Red Cards", value: data.redCards || "" },
      ],
    },
    {
      title: "Playing Style",
      icon: Globe,
      fields: [
        { label: "Playing Style", value: data.playingStyle || "" },
        { label: "Strengths", value: data.strengths || "" },
        { label: "Weaknesses", value: data.weaknesses || "" },
        { label: "Idols", value: data.idols || "" },
      ],
    },
    {
      title: "Media",
      icon: Video,
      fields: [
        { label: "Videos Added", value: `${(data.videos || []).length} video(s)` },
        ...(data.videos || []).slice(0, 3).map((url: string, i: number) => ({
          label: `Video ${i + 1}`,
          value: url,
        })),
      ],
    },
    {
      title: "Documents",
      icon: FileText,
      fields: [
        { label: "Documents Added", value: `${(data.documents || []).length} document(s)` },
        ...(data.documents || []).slice(0, 3).map((name: string, i: number) => ({
          label: `Document ${i + 1}`,
          value: name,
        })),
      ],
    },
    {
      title: "Availability",
      icon: Calendar,
      fields: [
        { label: "Available From", value: data.availableFrom || "" },
        {
          label: "Willing to Relocate",
          value: data.willingToRelocate === true ? "Yes" : data.willingToRelocate === false ? "No" : "",
        },
        { label: "Preferred Locations", value: data.preferredLocations || "" },
        { label: "Preferred Contact", value: data.preferredContact || "" },
      ],
    },
    {
      title: "Social Media",
      icon: Globe,
      fields: [
        { label: "Instagram", value: data.instagram || "" },
        { label: "X / Twitter", value: data.twitter || "" },
        { label: "Facebook", value: data.facebook || "" },
        { label: "YouTube", value: data.youtube || "" },
      ],
    },
  ];

  if (data.age > 0 && data.age < 18) {
    sections.splice(2, 0, {
      title: "Guardian Information",
      icon: User,
      fields: [
        { label: "Guardian Name", value: data.guardianName || "" },
        { label: "Relationship", value: data.guardianRelationship || "" },
        { label: "Guardian Email", value: data.guardianEmail || "" },
        { label: "Guardian Phone", value: data.guardianPhone || "" },
      ],
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Review Your Application</h2>
        <p className="mt-1 text-sm text-gray-400">
          Please review all the information below before submitting. Make sure everything is
          accurate.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <ReviewSection key={section.title} title={section.title} icon={section.icon}>
            {section.fields.map((field) => (
              <DataRow key={field.label} label={field.label} value={field.value} />
            ))}
          </ReviewSection>
        ))}
      </div>

      <div className="rounded-xl bg-[#0D7B3E]/5 border border-[#0D7B3E]/20 p-4">
        <p className="text-sm text-gray-300">
          By submitting this application, you confirm that all information provided is accurate and
          you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
