"use client";

import { Goal, TrendingUp, Hash } from "lucide-react";
import Input from "@/components/ui/Input";
import type { StepProps } from "@/lib/constants";

export default function Step6Statistics({
  data,
  updateData,
  errors,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
          Career Statistics
        </h2>
        <p className="mt-1 text-sm text-muted">
          Share your key performance stats from your career so far.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Total Appearances"
          type="number"
          placeholder="e.g. 50"
          icon={Hash}
          value={data.totalAppearances || ""}
          onChange={(e) =>
            updateData({ totalAppearances: e.target.value })
          }
          error={errors.totalAppearances}
          required
        />
        <Input
          label="Total Goals"
          type="number"
          placeholder="e.g. 15"
          icon={Goal}
          value={data.totalGoals || ""}
          onChange={(e) => updateData({ totalGoals: e.target.value })}
          error={errors.totalGoals}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Total Assists"
          type="number"
          placeholder="e.g. 10"
          icon={TrendingUp}
          value={data.totalAssists || ""}
          onChange={(e) => updateData({ totalAssists: e.target.value })}
          error={errors.totalAssists}
          required
        />
        <Input
          label="Clean Sheets (Goalkeepers)"
          type="number"
          placeholder="e.g. 20"
          value={data.cleanSheets || ""}
          onChange={(e) => updateData({ cleanSheets: e.target.value })}
          helperText="Leave blank if not a goalkeeper"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Yellow Cards"
          type="number"
          placeholder="e.g. 5"
          value={data.yellowCards || ""}
          onChange={(e) => updateData({ yellowCards: e.target.value })}
          error={errors.yellowCards}
          required
        />
        <Input
          label="Red Cards"
          type="number"
          placeholder="e.g. 0"
          value={data.redCards || ""}
          onChange={(e) => updateData({ redCards: e.target.value })}
          error={errors.redCards}
          required
        />
      </div>

      <p className="text-xs text-muted">
        These statistics should cover your entire football career
        including youth, amateur, and professional levels.
      </p>
    </div>
  );
}
