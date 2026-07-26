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
    if (!trimmed || !trimmed.match(/^https?:\/\//) || videos.length >= 5)
      return;
    updateData({ videos: [...videos, trimmed] });
    setNewUrl("");
  };

  const removeVideo = (index: number) =>
    updateData({
      videos: videos.filter((_: string, i: number) => i !== index),
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
          Media &amp; Highlights
        </h2>
        <p className="mt-1 text-sm text-muted">
          Upload links to your highlight reels, match footage, or training
          videos.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface-alt p-6 dark:border-border dark:bg-surface-alt">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground dark:text-foreground">
              Add Video Links
            </p>
            <p className="text-xs text-muted">
              YouTube, Vimeo, or Google Drive links. Max 5 videos.
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
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground dark:text-foreground">
            Added Videos ({videos.length}/5)
          </p>
          {videos.map((url: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface-alt px-4 py-3 dark:bg-surface-alt"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Video className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate text-sm text-foreground dark:text-foreground">
                  {url}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="shrink-0 text-muted transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <div className="py-8 text-center">
          <Video className="mx-auto mb-3 h-12 w-12 text-muted" />
          <p className="text-sm text-muted">
            No videos added yet. Add links to your best highlights above.
          </p>
        </div>
      )}
    </div>
  );
}
