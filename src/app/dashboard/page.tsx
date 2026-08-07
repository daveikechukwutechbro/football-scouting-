"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Shirt, Ruler, BarChart3, Video, FileText, Calendar,
  Globe, Shield, Loader2, CheckCircle, CreditCard, ExternalLink, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

function getLabel(list: { value: string; label: string }[], value: string): string {
  return list.find((l) => l.value === value)?.label || value;
}

const POSITIONS = [
  { value: "goalkeeper", label: "Goalkeeper" }, { value: "right-back", label: "Right Back" },
  { value: "left-back", label: "Left Back" }, { value: "center-back", label: "Center Back" },
  { value: "defensive-midfielder", label: "Defensive Midfielder" },
  { value: "central-midfielder", label: "Central Midfielder" },
  { value: "attacking-midfielder", label: "Attacking Midfielder" },
  { value: "right-winger", label: "Right Winger" }, { value: "left-winger", label: "Left Winger" },
  { value: "striker", label: "Striker" }, { value: "center-forward", label: "Center Forward" },
];

const COUNTRIES: { value: string; label: string }[] = [];

function DetailRow({ label, value }: { label: string; value?: string | number | boolean | null }) {
  const display = value === undefined || value === null || value === "" ? null : String(value);
  return (
    <div className="flex flex-col py-1.5">
      <span className="text-xs text-muted">{label}</span>
      <span className={`text-sm ${display ? "text-foreground" : "italic text-muted"}`}>{display || "Not provided"}</span>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
        {children}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/profile", { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 404) {
          router.push("/register");
          return;
        }
        if (!res.ok) { setError("Could not load your profile."); return; }
        const data = await res.json();
        setProfile(data.profile);
      } catch {
        setError("Network error loading your profile.");
      } finally {
        setProfileLoading(false);
      }
    };
    load();
  }, [user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const p = profile;
  const app = p?.applications?.[0];
  const age = p?.dateOfBirth
    ? Math.floor((Date.now() - new Date(p.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;

  let videos: string[] = [];
  try { videos = p?.media?.videos ? JSON.parse(p.media.videos) : []; } catch { videos = []; }

  const statusLabel = (app?.status || "submitted").replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-lg font-bold text-foreground">ProScout</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-surface-alt transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-r from-primary to-primary-hover p-6 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm opacity-80">Player Dashboard</p>
              <h1 className="text-2xl font-bold mt-1">
                {p?.firstName} {p?.lastName}
              </h1>
              <p className="text-sm opacity-80 mt-1">
                {p?.footballProfile?.primaryPosition ? getLabel(POSITIONS, p.footballProfile.primaryPosition) : ""} · {p?.nationality || ""} · Ref: <span className="font-mono font-semibold">{p?.refNumber || "N/A"}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">
                <CheckCircle className="h-4 w-4" /> {statusLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">
                <CreditCard className="h-4 w-4" /> Paid ${p?.payment?.amount ?? "5"}.00
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-2xl">
            Our scouts will review your profile within 48 hours. You can come back anytime to check your application status.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <Section title="Personal Details" icon={User}>
            <DetailRow label="Full Name" value={`${p?.firstName} ${p?.lastName}`} />
            <DetailRow label="Email" value={p?.email} />
            <DetailRow label="Date of Birth" value={p?.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : ""} />
            <DetailRow label="Age" value={age ? `${age} years` : ""} />
            <DetailRow label="Nationality" value={p?.nationality} />
            <DetailRow label="Country of Residence" value={p?.countryOfResidence} />
            <DetailRow label="City" value={p?.city} />
            <DetailRow label="Phone" value={p?.phoneNumber} />
          </Section>

          {p?.guardian && (
            <Section title="Guardian Information" icon={Shield}>
              <DetailRow label="Guardian Name" value={p.guardian.name} />
              <DetailRow label="Relationship" value={p.guardian.relationship} />
              <DetailRow label="Email" value={p.guardian.email} />
              <DetailRow label="Phone" value={p.guardian.phone} />
            </Section>
          )}

          {p?.footballProfile && (
            <Section title="Football Profile" icon={Shirt}>
              <DetailRow label="Primary Position" value={getLabel(POSITIONS, p.footballProfile.primaryPosition)} />
              <DetailRow label="Secondary Position" value={p.footballProfile.secondaryPosition ? getLabel(POSITIONS, p.footballProfile.secondaryPosition) : null} />
              <DetailRow label="Preferred Foot" value={p.footballProfile.preferredFoot} />
              <DetailRow label="Current Level" value={p.footballProfile.currentLevel} />
              <DetailRow label="Contract Status" value={p.footballProfile.contractStatus} />
              <DetailRow label="Current Club" value={p.footballProfile.currentClub} />
              <DetailRow label="Years Experience" value={p.footballProfile.yearsExperience} />
              <DetailRow label="Previous Clubs" value={p.footballProfile.previousClubs} />
            </Section>
          )}

          {p?.physicalProfile && (
            <Section title="Physical Attributes" icon={Ruler}>
              <DetailRow label="Height" value={p.physicalProfile.heightCm ? `${p.physicalProfile.heightCm} cm` : ""} />
              <DetailRow label="Weight" value={p.physicalProfile.weightKg ? `${p.physicalProfile.weightKg} kg` : ""} />
              <DetailRow label="Body Type" value={p.physicalProfile.bodyType} />
              <DetailRow label="Fitness Level" value={p.physicalProfile.fitnessLevel} />
              <DetailRow label="Injuries" value={p.physicalProfile.injuries} />
            </Section>
          )}

          {p?.careerStats && (
            <Section title="Career Statistics" icon={BarChart3}>
              <DetailRow label="Appearances" value={p.careerStats.totalAppearances} />
              <DetailRow label="Goals" value={p.careerStats.totalGoals} />
              <DetailRow label="Assists" value={p.careerStats.totalAssists} />
              <DetailRow label="Clean Sheets" value={p.careerStats.cleanSheets} />
              <DetailRow label="Yellow Cards" value={p.careerStats.yellowCards} />
              <DetailRow label="Red Cards" value={p.careerStats.redCards} />
            </Section>
          )}

          {p?.playingStyle && (
            <Section title="Playing Style" icon={Globe}>
              <div className="sm:col-span-2 lg:col-span-3">
                <DetailRow label="Biography" value={p.playingStyle.biography} />
              </div>
              <DetailRow label="Playing Style" value={p.playingStyle.playingStyle} />
              <DetailRow label="Strengths" value={p.playingStyle.strengths} />
              <DetailRow label="Weaknesses" value={p.playingStyle.weaknesses} />
              <DetailRow label="Favorite Position" value={p.playingStyle.favoritePosition ? getLabel(POSITIONS, p.playingStyle.favoritePosition) : null} />
              <DetailRow label="Favorite Player" value={p.playingStyle.favoritePlayer} />
              <DetailRow label="Career Goal" value={p.playingStyle.careerGoal} />
              <DetailRow label="Motivation" value={p.playingStyle.motivation} />
            </Section>
          )}

          {videos.length > 0 && (
            <Section title="Media" icon={Video}>
              <div className="sm:col-span-2 lg:col-span-3">
                <DetailRow label="Videos" value={`${videos.length} video(s) linked`} />
                <div className="mt-2 flex flex-wrap gap-2">
                  {videos.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> Video {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            </Section>
          )}

          {p?.availability && (
            <Section title="Availability" icon={Calendar}>
              <DetailRow label="Available for Trials" value={p.availability.availableForTrials ? "Yes" : "No"} />
              <DetailRow label="Available Immediately" value={p.availability.availableImmediately ? "Yes" : "No"} />
              <DetailRow label="Can Travel" value={p.availability.canTravel ? "Yes" : "No"} />
              <DetailRow label="Can Relocate" value={p.availability.canRelocate ? "Yes" : "No"} />
              <DetailRow label="Preferred Country" value={p.availability.preferredCountry} />
              <DetailRow label="Preferred League" value={p.availability.preferredLeague} />
              <DetailRow label="Preferred Trial Dates" value={p.availability.preferredTrialDates} />
              <DetailRow label="Preferred Communication" value={p.availability.preferredCommunication} />
            </Section>
          )}

          {p?.socialLinks && (
            <Section title="Social Media" icon={Globe}>
              {Object.entries(p.socialLinks).map(([key, value]) => (
                <DetailRow key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={String(value)} />
              ))}
            </Section>
          )}
        </div>
      </main>
    </div>
  );
}
