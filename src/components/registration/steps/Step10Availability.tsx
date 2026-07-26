"use client";

import type { ChangeEvent } from "react";
import { MapPin, Calendar } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { COUNTRIES, COMMUNICATION_METHODS } from "@/lib/constants";
import type { StepProps } from "@/lib/types";

interface ToggleGroupProps {
  label: string;
  value: boolean | undefined;
  onChange: (val: boolean) => void;
  error?: string;
  required?: boolean;
  id?: string;
}

function ToggleGroup({
  label,
  value,
  onChange,
  error,
  required,
  id,
}: ToggleGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground dark:text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
        )}
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          id={id ? `${id}-yes` : undefined}
          onClick={() => onChange(true)}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            value === true
              ? "border-primary bg-primary text-white"
              : "border-border bg-surface text-muted dark:border-border dark:bg-surface"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          id={id ? `${id}-no` : undefined}
          onClick={() => onChange(false)}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            value === false
              ? "border-border bg-surface-alt text-foreground dark:border-border dark:bg-surface-alt dark:text-foreground"
              : "border-border bg-surface text-muted dark:border-border dark:bg-surface"
          }`}
        >
          No
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default function Step10Availability({
  data,
  updateData,
  errors,
}: StepProps) {
  const handleSelect =
    (field: string) => (e: ChangeEvent<HTMLSelectElement>) =>
      updateData({ [field]: e.target.value });
  const handleInput =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
      updateData({ [field]: e.target.value });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground dark:text-foreground">
          Availability &amp; Preferences
        </h2>
        <p className="mt-1 text-sm text-muted">
          Let scouts know when and where you are available.
        </p>
      </div>

      <Card className="flex flex-col gap-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Availability
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ToggleGroup
            label="Available for trials?"
            value={data.availableForTrials}
            onChange={(val) => updateData({ availableForTrials: val })}
            error={errors.availableForTrials}
            required
            id="trials"
          />
          <ToggleGroup
            label="Available immediately?"
            value={data.availableImmediately}
            onChange={(val) =>
              updateData({ availableImmediately: val })
            }
            error={errors.availableImmediately}
            required
            id="immediate"
          />
          <ToggleGroup
            label="Can travel?"
            value={data.canTravel}
            onChange={(val) => updateData({ canTravel: val })}
            error={errors.canTravel}
            required
            id="travel"
          />
          <ToggleGroup
            label="Can relocate?"
            value={data.canRelocate}
            onChange={(val) => updateData({ canRelocate: val })}
            error={errors.canRelocate}
            required
            id="relocate"
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Preferences
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Select
            label="Preferred Country / Region"
            options={COUNTRIES}
            value={data.preferredCountry || ""}
            onChange={handleSelect("preferredCountry")}
            placeholder="Select a country"
            id="preferred-country"
          />
          <Input
            label="Preferred League"
            type="text"
            placeholder="e.g. Premier League, La Liga, MLS"
            value={data.preferredLeague || ""}
            onChange={handleInput("preferredLeague")}
            icon={MapPin}
            id="preferred-league"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            label="Preferred Trial Dates"
            type="date"
            value={data.preferredTrialDates || ""}
            onChange={handleInput("preferredTrialDates")}
            icon={Calendar}
            helperText="When are you available for trials?"
            id="trial-dates"
          />
          <Select
            label="Preferred Communication Method"
            options={COMMUNICATION_METHODS}
            value={data.preferredCommunication || ""}
            onChange={handleSelect("preferredCommunication")}
            placeholder="Select method"
            error={errors.preferredCommunication}
            required
            id="communication-method"
          />
        </div>
      </Card>
    </div>
  );
}
