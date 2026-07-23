"use client";

import { Ruler, Weight } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { BODY_TYPES, FITNESS_LEVELS } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

export default function Step5Physical({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Physical Attributes</h2>
        <p className="mt-1 text-sm text-gray-400">
          Provide your physical stats to help scouts assess your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Height (cm)"
          type="number"
          placeholder="e.g. 175"
          icon={Ruler}
          value={data.height || ""}
          onChange={(e) => updateData({ height: e.target.value })}
          error={errors.height}
          required
        />
        <Input
          label="Weight (kg)"
          type="number"
          placeholder="e.g. 70"
          icon={Weight}
          value={data.weight || ""}
          onChange={(e) => updateData({ weight: e.target.value })}
          error={errors.weight}
          required
        />
      </div>

      <Select
        label="Body Type"
        placeholder="Select your body type"
        options={BODY_TYPES}
        value={data.bodyType || ""}
        onChange={(e) => updateData({ bodyType: e.target.value })}
      />

      <Select
        label="Fitness Level"
        placeholder="Select your fitness level"
        options={FITNESS_LEVELS}
        value={data.fitnessLevel || ""}
        onChange={(e) => updateData({ fitnessLevel: e.target.value })}
      />

      <Input
        label="Injuries (Optional)"
        placeholder="Any current or past significant injuries"
        value={data.injuries || ""}
        onChange={(e) => updateData({ injuries: e.target.value })}
        helperText="List any injuries that may affect your performance"
      />
    </div>
  );
}
