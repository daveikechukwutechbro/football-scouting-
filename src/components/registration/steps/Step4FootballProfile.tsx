"use client";

import { Shirt, Footprints, Trophy, Briefcase } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { POSITIONS, PREFERRED_FOOT, FOOTBALL_LEVELS, CONTRACT_STATUS } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

export default function Step4FootballProfile({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Football Profile</h2>
        <p className="mt-1 text-sm text-gray-400">
          Share your football background and current status.
        </p>
      </div>

      <Select
        label="Primary Position"
        placeholder="Select your main position"
        options={POSITIONS}
        value={data.currentPosition || ""}
        onChange={(e) => updateData({ currentPosition: e.target.value })}
        error={errors.currentPosition}
        required
      />

      <Select
        label="Secondary Position (Optional)"
        placeholder="Select secondary position"
        options={POSITIONS}
        value={data.secondaryPosition || ""}
        onChange={(e) => updateData({ secondaryPosition: e.target.value })}
      />

      <Select
        label="Preferred Foot"
        placeholder="Select preferred foot"
        options={PREFERRED_FOOT}
        value={data.preferredFoot || ""}
        onChange={(e) => updateData({ preferredFoot: e.target.value })}
        error={errors.preferredFoot}
        required
      />

      <Select
        label="Current Level"
        placeholder="Select your current level"
        options={FOOTBALL_LEVELS}
        value={data.currentLevel || ""}
        onChange={(e) => updateData({ currentLevel: e.target.value })}
        error={errors.currentLevel}
        required
      />

      <Select
        label="Contract Status"
        placeholder="Select your contract status"
        options={CONTRACT_STATUS}
        value={data.contractStatus || ""}
        onChange={(e) => updateData({ contractStatus: e.target.value })}
        error={errors.contractStatus}
        required
      />

      <Input
        label="Current/Last Club"
        placeholder="Enter your club name"
        icon={Shirt}
        value={data.currentClub || ""}
        onChange={(e) => updateData({ currentClub: e.target.value })}
        error={errors.currentClub}
      />

      <Input
        label="Years of Playing Experience"
        type="number"
        placeholder="e.g. 5"
        icon={Briefcase}
        value={data.yearsExperience || ""}
        onChange={(e) => updateData({ yearsExperience: e.target.value })}
        error={errors.yearsExperience}
      />

      <Input
        label="Previous Clubs (Optional)"
        placeholder="List previous clubs, separated by commas"
        icon={Trophy}
        value={data.previousClubs || ""}
        onChange={(e) => updateData({ previousClubs: e.target.value })}
        helperText="e.g. FC Barcelona Youth, Real Madrid Academy"
      />
    </div>
  );
}
