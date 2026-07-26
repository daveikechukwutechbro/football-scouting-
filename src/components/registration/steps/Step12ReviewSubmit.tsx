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
import {
  POSITIONS,
  COUNTRIES,
  PREFERRED_FOOT,
  FOOTBALL_LEVELS,
} from "@/lib/constants";
import type { StepProps } from "@/lib/types";

function getLabel(
  list: { value: string; label: string }[],
  code: string
): string {
  if (!code) return "Not provided";
  return list.find((c) => c.value === code)?.label || code;
}

interface ReviewSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function ReviewSection({ title, icon: Icon, children }: ReviewSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 dark:border-border dark:bg-surface">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground dark:text-foreground">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  const isEmpty = !value || value === "Not provided";
  return (
    <div className="flex flex-col py-1.5">
      <span className="text-xs text-muted">{label}</span>
      <span
        className={`text-sm ${
          isEmpty
            ? "italic text-muted"
            : "text-foreground dark:text-foreground"
        }`}
      >
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
      fields: [{ label: "Email", value: data.email || "" }],
    },
    {
      title: "Personal Details",
      icon: User,
      fields: [
        {
          label: "Full Name",
          value: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        },
        { label: "Date of Birth", value: data.dateOfBirth || "" },
        {
          label: "Age",
          value: data.age ? `${data.age} years` : "",
        },
        {
          label: "Nationality",
          value: getLabel(COUNTRIES, data.nationality),
        },
        {
          label: "Country of Residence",
          value: getLabel(COUNTRIES, data.country),
        },
        { label: "City", value: data.city || "" },
        { label: "Phone", value: data.phoneNumber || "" },
      ],
    },
    {
      title: "Football Profile",
      icon: Shirt,
      fields: [
        {
          label: "Primary Position",
          value: getLabel(POSITIONS, data.currentPosition),
        },
        {
          label: "Preferred Foot",
          value: getLabel(PREFERRED_FOOT, data.preferredFoot),
        },
        {
          label: "Current Level",
          value: getLabel(FOOTBALL_LEVELS, data.currentLevel),
        },
        { label: "Contract Status", value: data.contractStatus || "" },
        { label: "Current Club", value: data.currentClub || "" },
        {
          label: "Experience",
          value: data.yearsExperience
            ? `${data.yearsExperience} years`
            : "",
        },
        { label: "Previous Clubs", value: data.previousClubs || "" },
      ],
    },
    {
      title: "Physical Attributes",
      icon: Ruler,
      fields: [
        {
          label: "Height",
          value: data.height ? `${data.height} cm` : "",
        },
        {
          label: "Weight",
          value: data.weight ? `${data.weight} kg` : "",
        },
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
        { label: "Biography", value: data.biography || "" },
        { label: "Playing Style", value: data.playingStyle || "" },
        { label: "Strengths", value: data.strengths || "" },
        { label: "Weaknesses", value: data.weaknesses || "" },
        {
          label: "Favorite Position",
          value: getLabel(POSITIONS, data.favoritePosition),
        },
        { label: "Favorite Player", value: data.favoritePlayer || "" },
        { label: "Career Goal", value: data.careerGoal || "" },
        { label: "Motivation", value: data.motivation || "" },
      ],
    },
    {
      title: "Media",
      icon: Video,
      fields: [
        {
          label: "Videos Added",
          value: `${(data.videos || []).length} video(s)`,
        },
        ...(data.videos || [])
          .slice(0, 3)
          .map((url: string, i: number) => ({
            label: `Video ${i + 1}`,
            value: url,
          })),
      ],
    },
    {
      title: "Documents",
      icon: FileText,
      fields: (() => {
        const docs = data.documents || {};
        const docEntries = Object.entries(docs).filter(
          ([, v]) => v !== null
        );
        if (docEntries.length === 0)
          return [{ label: "Documents Added", value: "None" }];
        return [
          {
            label: "Documents Added",
            value: `${docEntries.length} document(s)`,
          },
          ...docEntries.slice(0, 7).map(([key, file]) => ({
            label: key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s: string) => s.toUpperCase()),
            value:
              file instanceof File ? file.name : String(file),
          })),
        ];
      })(),
    },
    {
      title: "Availability",
      icon: Calendar,
      fields: [
        {
          label: "Available for Trials",
          value:
            data.availableForTrials === true
              ? "Yes"
              : data.availableForTrials === false
                ? "No"
                : "",
        },
        {
          label: "Available Immediately",
          value:
            data.availableImmediately === true
              ? "Yes"
              : data.availableImmediately === false
                ? "No"
                : "",
        },
        {
          label: "Can Travel",
          value:
            data.canTravel === true
              ? "Yes"
              : data.canTravel === false
                ? "No"
                : "",
        },
        {
          label: "Can Relocate",
          value:
            data.canRelocate === true
              ? "Yes"
              : data.canRelocate === false
                ? "No"
                : "",
        },
        {
          label: "Preferred Country",
          value: getLabel(COUNTRIES, data.preferredCountry),
        },
        {
          label: "Preferred League",
          value: data.preferredLeague || "",
        },
        {
          label: "Preferred Trial Dates",
          value: data.preferredTrialDates || "",
        },
        {
          label: "Preferred Communication",
          value: data.preferredCommunication || "",
        },
      ],
    },
    {
      title: "Social Media",
      icon: Globe,
      fields: (() => {
        const links = data.socialLinks || {};
        return [
          { key: "instagram", label: "Instagram" },
          { key: "facebook", label: "Facebook" },
          { key: "tiktok", label: "TikTok" },
          { key: "youtube", label: "YouTube" },
          { key: "twitter", label: "X / Twitter" },
          { key: "linkedin", label: "LinkedIn" },
        ].map(({ key, label }) => ({
          label,
          value: links[key] || "",
        }));
      })(),
    },
  ];

  if (data.age > 0 && data.age < 18) {
    sections.splice(2, 0, {
      title: "Guardian Information",
      icon: User,
      fields: [
        {
          label: "Guardian Name",
          value: data.guardianName || "",
        },
        {
          label: "Relationship",
          value: data.guardianRelationship || "",
        },
        {
          label: "Guardian Email",
          value: data.guardianEmail || "",
        },
        {
          label: "Guardian Phone",
          value: data.guardianPhone || "",
        },
      ],
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
          Review Your Application
        </h2>
        <p className="mt-1 text-sm text-muted">
          Please review all the information below before submitting.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <ReviewSection
            key={section.title}
            title={section.title}
            icon={section.icon}
          >
            {section.fields.map((field) => (
              <DataRow
                key={field.label}
                label={field.label}
                value={field.value}
              />
            ))}
          </ReviewSection>
        ))}
      </div>

      <div className="rounded-xl border border-primary-light bg-primary-light/30 p-4">
        <p className="text-sm text-foreground dark:text-foreground">
          By submitting this application, you confirm that all
          information provided is accurate and you agree to our terms of
          service and privacy policy.
        </p>
      </div>
    </div>
  );
}
