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
    if (!trimmed || !trimmed.match(/^https?:\/\//) || videos.length >= 5) return;
    updateData({ videos: [...videos, trimmed] });
    setNewUrl("");
  };

  const removeVideo = (index: number) => updateData({ videos: videos.filter((_: string, i: number) => i !== index) });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--fg-heading)" }}>Media & Highlights</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
          Upload links to your highlight reels, match footage, or training videos.
        </p>
      </div>

      <div className="rounded-xl border border-dashed p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-input)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--primary-light)" }}>
            <Video className="h-5 w-5" style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--fg-heading)" }}>Add Video Links</p>
            <p className="text-xs" style={{ color: "var(--fg-muted)" }}>YouTube, Vimeo, or Google Drive links. Max 5 videos.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input placeholder="https://youtube.com/watch?v=..." icon={LinkIcon} value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
          </div>
          <Button onClick={addVideo} disabled={!newUrl.trim() || videos.length >= 5} size="md">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: "var(--fg-text)" }}>Added Videos ({videos.length}/5)</p>
          {videos.map((url: string, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "var(--bg-input)" }}>
              <div className="flex items-center gap-3 min-w-0">
                <Video className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                <span className="text-sm truncate" style={{ color: "var(--fg)" }}>{url}</span>
              </div>
              <button type="button" onClick={() => removeVideo(index)} className="shrink-0 transition-colors" style={{ color: "var(--fg-muted)" }}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <div className="text-center py-8">
          <Video className="h-12 w-12 mx-auto mb-3" style={{ color: "var(--fg-muted)" }} />
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>No videos added yet. Add links to your best highlights above.</p>
        </div>
      )}
    </div>
  );
}
