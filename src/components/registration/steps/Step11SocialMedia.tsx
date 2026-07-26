"use client";

import type { ChangeEvent } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  Link,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import type { StepProps } from "@/lib/types";

interface SocialField {
  key: string;
  label: string;
  placeholder: string;
  icon: typeof Instagram;
}

const SOCIAL_FIELDS: SocialField[] = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "@username",
    icon: Instagram,
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "Profile URL",
    icon: Facebook,
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "@username",
    icon: Link,
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "Channel URL",
    icon: Youtube,
  },
  {
    key: "twitter",
    label: "X / Twitter",
    placeholder: "@username",
    icon: Twitter,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "Profile URL",
    icon: Linkedin,
  },
];

export default function Step11SocialMedia({
  data,
  updateData,
}: StepProps) {
  const socialLinks = (data.socialLinks || {}) as Record<string, string>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground dark:text-foreground">
          Social Media
        </h2>
        <p className="mt-1 text-sm text-muted">
          Connect your social profiles to give scouts a fuller picture.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-primary-light bg-primary-light/50 px-4 py-3">
        <p className="text-sm text-foreground dark:text-foreground">
          Social media profiles are optional but help scouts see your
          personality and brand.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {SOCIAL_FIELDS.map(({ key, label, placeholder, icon }) => (
            <Input
              key={key}
              label={label}
              type="text"
              placeholder={placeholder}
              value={socialLinks[key] || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateData({
                  socialLinks: {
                    ...socialLinks,
                    [key]: e.target.value,
                  },
                })
              }
              icon={icon}
              id={`social-${key}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
