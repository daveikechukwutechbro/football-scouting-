"use client";

import type { ChangeEvent } from "react";
import { Star } from "lucide-react";
import TextArea from "@/components/ui/TextArea";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { POSITIONS } from "@/lib/constants";
import type { StepProps } from "@/lib/types";

export default function Step7PlayingStyle({
  data,
  updateData,
  errors,
}: StepProps) {
  const handleText = (field: string) => (e: ChangeEvent<HTMLTextAreaElement>) =>
    updateData({ [field]: e.target.value });
  const handleInput = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    updateData({ [field]: e.target.value });
  const handleSelect = (field: string) => (e: ChangeEvent<HTMLSelectElement>) =>
    updateData({ [field]: e.target.value });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground dark:text-foreground">
          Playing Style &amp; Motivation
        </h2>
        <p className="mt-1 text-sm text-muted">
          Help scouts understand who you are as a player and what drives
          you.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <TextArea
          label="Short Biography"
          placeholder="Tell us about yourself as a football player."
          value={data.biography || ""}
          onChange={handleText("biography")}
          error={errors.biography}
          required
          maxLength={500}
          showCounter
          rows={4}
          helperText="Tell scouts about yourself as a player"
          id="biography"
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TextArea
            label="Strengths"
            placeholder="e.g. Pace, vision, tackling, leadership..."
            value={data.strengths || ""}
            onChange={handleText("strengths")}
            error={errors.strengths}
            required
            rows={3}
            helperText="What are your key strengths?"
            id="strengths"
          />
          <TextArea
            label="Weaknesses (Optional)"
            placeholder="e.g. Aerial duels, weak foot, stamina..."
            value={data.weaknesses || ""}
            onChange={handleText("weaknesses")}
            rows={3}
            helperText="Be honest — scouts appreciate self-awareness"
            id="weaknesses"
          />
        </div>
        <TextArea
          label="Playing Style Description"
          placeholder="Describe your style of play in detail..."
          value={data.playingStyle || ""}
          onChange={handleText("playingStyle")}
          error={errors.playingStyle}
          required
          rows={3}
          helperText="How would you describe your style of play?"
          id="playing-style"
        />
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Select
            label="Favorite Position"
            options={POSITIONS}
            value={data.favoritePosition || ""}
            onChange={handleSelect("favoritePosition")}
            placeholder="Select position"
            id="favorite-position"
          />
          <Input
            label="Favorite Player"
            type="text"
            placeholder="e.g. Lionel Messi"
            value={data.favoritePlayer || ""}
            onChange={handleInput("favoritePlayer")}
            icon={Star}
            helperText="Who do you look up to?"
            id="favorite-player"
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <TextArea
          label="Career Goal"
          placeholder="Where do you see yourself in 5 years?"
          value={data.careerGoal || ""}
          onChange={handleText("careerGoal")}
          error={errors.careerGoal}
          required
          rows={2}
          helperText="Your aspirations"
          id="career-goal"
        />
        <TextArea
          label="Why Do You Want to Be Scouted?"
          placeholder="What motivates you to play professionally?"
          value={data.motivation || ""}
          onChange={handleText("motivation")}
          error={errors.motivation}
          required
          rows={3}
          helperText="What drives you?"
          id="motivation"
        />
      </Card>
    </div>
  );
}
