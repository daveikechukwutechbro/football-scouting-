"use client";

import { useState } from "react";
import { Video, Plus, X, Link as LinkIcon } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { StepProps } from "@/lib/constants";

export default function Step8Media({ data, updateData, errors }: StepProps) {
  const [newUrl, setNewUrl] = useState("");
  const videos: string[] = data.videos || [];

  const addVideo = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    if (!trimmed.match(/^https?:\/\//)) {
      return;
    }
    if (videos.length >= 5) return;
    updateData({ videos: [...videos, trimmed] });
    setNewUrl("");
  };

  const removeVideo = (index: number) => {
    updateData({ videos: videos.filter((_: string, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Media & Highlights</h2>
        <p className="mt-1 text-sm text-gray-400">
          Upload links to your highlight reels, match footage, or training videos.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-gray-700 bg-[#232838]/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]/10">
            <Video className="h-5 w-5 text-[#0D7B3E]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Add Video Links</p>
            <p className="text-xs text-gray-400">
              Paste YouTube, Vimeo, or Google Drive links. Max 5 videos.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="https://youtube.com/watch?v=..."
              icon={LinkIcon}
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          <Button
            onClick={addVideo}
            disabled={!newUrl.trim() || videos.length >= 5}
            size="md"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {errors.videos && (
          <p className="mt-1 text-xs text-red-500">{errors.videos}</p>
        )}
      </div>

      {videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">
            Added Videos ({videos.length}/5)
          </p>
          {videos.map((url: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-xl bg-[#232838] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Video className="h-4 w-4 text-[#0D7B3E] shrink-0" />
                <span className="text-sm text-white truncate">{url}</span>
              </div>
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="text-gray-500 hover:text-red-500 transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <div className="text-center py-8">
          <Video className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            No videos added yet. Add links to your best highlights above.
          </p>
        </div>
      )}
    </div>
  );
}
