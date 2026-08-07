"use client";

import { useMemo, useState } from "react";
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
  if (!code) return "";
  return list.find((c) => c.value === code)?.label || code;
}

function formatLabel(value?: string | number | boolean | null): string {
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}

function Field({ label, value }: { label: string; value?: string | number | boolean | null }) {
  const display = formatLabel(value);
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 py-1">
      <span className="w-full sm:w-52 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="flex-1 text-[13px] text-gray-900 border-b border-dotted border-gray-300 pb-0.5">
        {display || <span className="italic text-gray-400">—</span>}
      </span>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white/95 p-4">
      <div className="mb-3 flex items-center gap-2 border-b-2 border-primary pb-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-0.5 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export default function Step12ReviewSubmit({ data }: StepProps) {
  const [passportUrl, setPassportUrl] = useState<string | null>(null);

  useMemo(() => {
    const passport = data.documents?.passport;
    if (passport instanceof File && passport.type.startsWith("image/")) {
      setPassportUrl(URL.createObjectURL(passport));
    } else {
      setPassportUrl(null);
    }
  }, [data.documents]);

  const personalFields = (
    <>
      <Field label="Full Name" value={`${data.firstName || ""} ${data.lastName || ""}`.trim()} />
      <Field label="Date of Birth" value={data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : ""} />
      <Field label="Age" value={data.age ? `${data.age} years` : ""} />
      <Field label="Nationality" value={getLabel(COUNTRIES, data.nationality)} />
      <Field label="Country of Residence" value={getLabel(COUNTRIES, data.country)} />
      <Field label="City" value={data.city} />
      <Field label="Phone" value={data.phoneNumber} />
    </>
  );

  const footballFields = (
    <>
      <Field label="Primary Position" value={getLabel(POSITIONS, data.currentPosition)} />
      <Field label="Secondary Position" value={getLabel(POSITIONS, data.secondaryPosition)} />
      <Field label="Preferred Foot" value={getLabel(PREFERRED_FOOT, data.preferredFoot)} />
      <Field label="Current Level" value={getLabel(FOOTBALL_LEVELS, data.currentLevel)} />
      <Field label="Contract Status" value={data.contractStatus} />
      <Field label="Current Club" value={data.currentClub} />
      <Field label="Experience" value={data.yearsExperience ? `${data.yearsExperience} years` : ""} />
      <Field label="Previous Clubs" value={data.previousClubs} />
    </>
  );

  const physicalFields = (
    <>
      <Field label="Height" value={data.height ? `${data.height} cm` : ""} />
      <Field label="Weight" value={data.weight ? `${data.weight} kg` : ""} />
      <Field label="Body Type" value={data.bodyType} />
      <Field label="Fitness Level" value={data.fitnessLevel} />
      <Field label="Injuries" value={data.injuries} />
    </>
  );

  const statsFields = (
    <>
      <Field label="Appearances" value={data.totalAppearances} />
      <Field label="Goals" value={data.totalGoals} />
      <Field label="Assists" value={data.totalAssists} />
      <Field label="Clean Sheets" value={data.cleanSheets} />
      <Field label="Yellow Cards" value={data.yellowCards} />
      <Field label="Red Cards" value={data.redCards} />
    </>
  );

  const playingStyleFields = (
    <>
      <Field label="Biography" value={data.biography} />
      <Field label="Playing Style" value={data.playingStyle} />
      <Field label="Strengths" value={data.strengths} />
      <Field label="Weaknesses" value={data.weaknesses} />
      <Field label="Favorite Position" value={getLabel(POSITIONS, data.favoritePosition)} />
      <Field label="Favorite Player" value={data.favoritePlayer} />
      <Field label="Career Goal" value={data.careerGoal} />
      <Field label="Motivation" value={data.motivation} />
    </>
  );

  const mediaFields = (
    <>
      <Field label="Videos Added" value={`${(data.videos || []).length} video(s)`} />
      {(data.videos || []).slice(0, 3).map((url: string, i: number) => (
        <Field key={i} label={`Video ${i + 1}`} value={url} />
      ))}
    </>
  );

  const documentEntries = Object.entries(data.documents || {}).filter(
    ([, v]) => v instanceof File
  );
  const documentFields = documentEntries.length
    ? documentEntries.map(([key, file]) => ({
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s: string) => s.toUpperCase()),
        value: file instanceof File ? file.name : "",
      }))
    : [{ label: "Documents Added", value: "None" }];

  const availabilityFields = (
    <>
      <Field label="Available for Trials" value={data.availableForTrials === true ? "Yes" : data.availableForTrials === false ? "No" : ""} />
      <Field label="Available Immediately" value={data.availableImmediately === true ? "Yes" : data.availableImmediately === false ? "No" : ""} />
      <Field label="Can Travel" value={data.canTravel === true ? "Yes" : data.canTravel === false ? "No" : ""} />
      <Field label="Can Relocate" value={data.canRelocate === true ? "Yes" : data.canRelocate === false ? "No" : ""} />
      <Field label="Preferred Country" value={getLabel(COUNTRIES, data.preferredCountry)} />
      <Field label="Preferred League" value={data.preferredLeague} />
      <Field label="Preferred Communication" value={data.preferredCommunication} />
      <Field label="Contact Details" value={data.communicationContact} />
    </>
  );

  const socialFields = (() => {
    const links = data.socialLinks || {};
    return [
      { key: "instagram", label: "Instagram" },
      { key: "facebook", label: "Facebook" },
      { key: "tiktok", label: "TikTok" },
      { key: "youtube", label: "YouTube" },
      { key: "twitter", label: "X / Twitter" },
    ].map(({ key, label }) => (
      <Field key={key} label={label} value={links[key]} />
    ));
  })();

  const isMinor = data.age > 0 && data.age < 18;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-foreground dark:text-foreground">
          Review Your Application
        </h2>
        <p className="mt-1 text-sm text-muted">
          Please review all the information below before submitting.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border-2 border-gray-400 bg-gray-50 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none whitespace-nowrap text-[120px] sm:text-[160px] font-black tracking-widest text-primary/10 uppercase -rotate-12">
            ProScout
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none whitespace-nowrap text-[52px] sm:text-[72px] font-black tracking-[0.3em] text-primary/[0.06] uppercase rotate-12">
            Official Form
          </span>
        </div>

        <div className="relative p-5 sm:p-8">
          <div className="mb-6 flex flex-col items-start gap-4 border-b-2 border-gray-400 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-white">
                <span className="text-xl font-black text-primary">P</span>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                  ProScout Football
                </h3>
                <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
                  Player Registration Form
                </p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  Form PS-FB-001 · Official Application
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              {passportUrl ? (
                <div className="relative">
                  <img
                    src={passportUrl}
                    alt="Passport photo"
                    className="h-24 w-24 rounded-lg border-2 border-gray-400 bg-white object-cover shadow"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                    Passport
                  </span>
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-white">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                    No Photo
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Section title="Personal Details" icon={User}>
              {personalFields}
            </Section>

            {isMinor && (
              <Section title="Guardian Information" icon={User}>
                <Field label="Guardian Name" value={data.guardianName} />
                <Field label="Relationship" value={data.guardianRelationship} />
                <Field label="Guardian Email" value={data.guardianEmail} />
                <Field label="Guardian Phone" value={data.guardianPhone} />
              </Section>
            )}

            <Section title="Football Profile" icon={Shirt}>
              {footballFields}
            </Section>

            <Section title="Physical Attributes" icon={Ruler}>
              {physicalFields}
            </Section>

            <Section title="Career Statistics" icon={BarChart3}>
              {statsFields}
            </Section>

            <Section title="Playing Style & Motivation" icon={Globe}>
              {playingStyleFields}
            </Section>

            <Section title="Media & Highlights" icon={Video}>
              {mediaFields}
            </Section>

            <Section title="Documents" icon={FileText}>
              {documentFields.map((doc, i) => (
                <Field key={i} label={doc.label} value={doc.value} />
              ))}
            </Section>

            <Section title="Availability & Preferences" icon={Calendar}>
              {availabilityFields}
            </Section>

            <Section title="Social Media" icon={Globe}>
              {socialFields}
            </Section>
          </div>

          <div className="mt-6 border-t-2 border-gray-400 pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded border border-gray-300 bg-white p-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Applicant Signature</p>
                <div className="mt-2 border-b border-gray-400" />
              </div>
              <div className="rounded border border-gray-300 bg-white p-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Date</p>
                <div className="mt-2 border-b border-gray-400" />
              </div>
              <div className="rounded border border-gray-300 bg-white p-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Ref Number</p>
                <div className="mt-2 border-b border-gray-400 text-left font-mono text-xs text-gray-700">
                  {data.refNumber || "PS-XXXXXXXX"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded border border-gray-300 bg-primary/5 p-3">
            <p className="text-center text-[11px] leading-relaxed text-gray-700">
              I hereby certify that the information provided on this application is true and
              complete to the best of my knowledge. I understand that any false information may
              result in the rejection of this application. I agree to the terms of service and
              privacy policy of ProScout Football.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-widest text-gray-400">
              Reviewed by ProScout Scouting Department
            </p>
            <p className="text-[9px] uppercase tracking-widest text-gray-400">
              Confidential · PS-FB-001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
