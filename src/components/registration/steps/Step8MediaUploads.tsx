"use client";

import type { ChangeEvent } from "react";
import { Camera, Video, Film, Dumbbell, Sparkles, Info } from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import type { StepProps } from "@/lib/types";

function isValidUrl(url: string): boolean {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidVideoUrl(url: string): boolean {
  if (!url) return true;
  if (!isValidUrl(url)) return false;
  return /youtube\.com|vimeo\.com|youtu\.be/i.test(url);
}

export default function Step8MediaUploads({
  data,
  updateData,
  errors,
}: StepProps) {
  const handleInput = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    updateData({ [field]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Media & Videos</h2>
        <p className="mt-1 text-sm text-gray-400">
          Upload photos and add video links to showcase your ability.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#D4A843]/30 bg-[#D4A843]/5 px-4 py-3">
        <Info className="h-5 w-5 shrink-0 text-[#D4A843] mt-0.5" />
        <p className="text-sm text-gray-300">
          Quality videos significantly increase your chances of being reviewed. Upload your best footage.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Photos
        </h3>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FileUpload
            label="Profile Photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={(file) =>
              updateData({
                profilePhoto: file instanceof File ? file : null,
              })
            }
            error={errors.profilePhoto}
            maxSize={5 * 1024 * 1024}
            currentFile={
              data.profilePhoto instanceof File ? data.profilePhoto : null
            }
            onRemove={() => updateData({ profilePhoto: null })}
            helperText="A clear headshot — this is the first thing scouts see"
            id="profile-photo"
          />

          <FileUpload
            label="Full-Body Photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={(file) =>
              updateData({
                fullBodyPhoto: file instanceof File ? file : null,
              })
            }
            error={errors.fullBodyPhoto}
            maxSize={5 * 1024 * 1024}
            currentFile={
              data.fullBodyPhoto instanceof File ? data.fullBodyPhoto : null
            }
            onRemove={() => updateData({ fullBodyPhoto: null })}
            helperText="Full-length shot showing your athletic build"
            id="full-body-photo"
          />
        </div>

        {data.profilePhoto instanceof File && (
          <div className="flex items-center gap-3 rounded-lg bg-[#232838] px-3 py-2 border border-gray-700">
            <Camera className="h-4 w-4 text-[#0D7B3E]" />
            <p className="text-xs text-gray-300">Profile photo uploaded</p>
          </div>
        )}

        {data.fullBodyPhoto instanceof File && (
          <div className="flex items-center gap-3 rounded-lg bg-[#232838] px-3 py-2 border border-gray-700">
            <Camera className="h-4 w-4 text-[#0D7B3E]" />
            <p className="text-xs text-gray-300">Full-body photo uploaded</p>
          </div>
        )}
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Videos
        </h3>

        <div className="flex items-start gap-3 rounded-xl border border-gray-700 bg-[#232838] px-4 py-3">
          <Info className="h-4 w-4 shrink-0 text-gray-500 mt-0.5" />
          <p className="text-xs text-gray-400">
            Scouts look for match awareness, technical skill, movement off the ball, and consistency.
            Keep highlight videos under 5 minutes and ensure good quality footage.
          </p>
        </div>

        <Input
          label="Highlight Video Link"
          type="url"
          placeholder="YouTube or Vimeo URL"
          value={data.highlightVideo || ""}
          onChange={handleInput("highlightVideo")}
          error={errors.highlightVideo}
          icon={Film}
          helperText="Paste a link to your best highlights reel"
          id="highlight-video"
        />

        <Input
          label="Full Match Video Link"
          type="url"
          placeholder="YouTube or Vimeo URL"
          value={data.fullMatchVideo || ""}
          onChange={handleInput("fullMatchVideo")}
          error={errors.fullMatchVideo}
          icon={Video}
          helperText="Link to a full 90-minute match if available"
          id="full-match-video"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            label="Training Video Link"
            type="url"
            placeholder="YouTube or Vimeo URL"
            value={data.trainingVideo || ""}
            onChange={handleInput("trainingVideo")}
            error={errors.trainingVideo}
            icon={Dumbbell}
            helperText="Show your training routine and skills"
            id="training-video"
          />

          <Input
            label="Skills Video Link"
            type="url"
            placeholder="YouTube or Vimeo URL"
            value={data.skillsVideo || ""}
            onChange={handleInput("skillsVideo")}
            error={errors.skillsVideo}
            icon={Sparkles}
            helperText="Optional: dribbling, shooting, or other skills showcase"
            id="skills-video"
          />
        </div>
      </Card>
    </div>
  );
}
