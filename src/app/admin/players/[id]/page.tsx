"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft, User, Shirt, Ruler, BarChart3, Video, FileText, Calendar,
  Globe, MapPin, Save, Loader2, CheckCircle, XCircle, Clock, Star,
  Shield, GraduationCap, Heart, FolderOpen, ExternalLink, CreditCard,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PlayerDetail {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  city: string;
  phoneNumber: string;
  createdAt: string;
  user: { email: string; createdAt: string };
  guardian: { name: string; relationship: string; email: string; phone: string } | null;
  footballProfile: {
    primaryPosition: string; secondaryPosition: string | null;
    preferredFoot: string; currentLevel: string; contractStatus: string;
    currentClub: string | null; yearsExperience: number | null; previousClubs: string | null;
  } | null;
  physicalProfile: {
    heightCm: number; weightKg: number; bodyType: string | null;
    fitnessLevel: string | null; injuries: string | null;
  } | null;
  careerStats: {
    totalAppearances: number; totalGoals: number; totalAssists: number;
    cleanSheets: number | null; yellowCards: number | null; redCards: number | null;
  } | null;
  playingStyle: {
    biography: string | null; playingStyle: string; strengths: string;
    weaknesses: string | null; favoritePosition: string | null;
    favoritePlayer: string | null; careerGoal: string | null; motivation: string | null;
  } | null;
  media: { videos: string } | null;
  availability: {
    availableForTrials: boolean; availableImmediately: boolean; canTravel: boolean;
    canRelocate: boolean; preferredCountry: string | null; preferredLeague: string | null;
    preferredTrialDates: string | null; preferredCommunication: string;
  } | null;
  socialLinks: {
    instagram: string | null; facebook: string | null; tiktok: string | null;
    youtube: string | null; twitter: string | null; linkedin: string | null;
  } | null;
  documents: { id: string; documentType: string; fileUrl: string; originalFilename: string }[];
  applications: { id: string; status: string; refNumber: string; notes: string | null; submittedAt: string }[];
  payment: { status: string; transactionId: string; amount: number; currency: string; paidAt: string } | null;
}

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted", icon: Clock, color: "text-blue-400" },
  { value: "under_review", label: "Under Review", icon: Clock, color: "text-yellow-400" },
  { value: "shortlisted", label: "Shortlisted", icon: CheckCircle, color: "text-[#0D7B3E]" },
  { value: "rejected", label: "Rejected", icon: XCircle, color: "text-red-400" },
];

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  under_review: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  shortlisted: "bg-[#0D7B3E]/10 text-[#0D7B3E] border-[#0D7B3E]/20",
  rejected: "bg-red-400/10 text-red-400 border-red-400/20",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

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

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  const display = value ? String(value) : "—";
  const isEmpty = !value;
  return (
    <div className="flex flex-col py-2">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm ${isEmpty ? "text-gray-600 italic" : "text-white"}`}>{display}</span>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Card padding="lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D7B3E]/15">
          <Icon className="h-4 w-4 text-[#0D7B3E]" />
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
        {children}
      </div>
    </Card>
  );
}

export default function AdminPlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [player, setPlayer] = useState<PlayerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
        setCurrentStatus(data.applications?.[0]?.status || "submitted");
        setNotes(data.applications?.[0]?.notes || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function saveStatus() {
    setSaving(true);
    setSaveMessage("");
    try {
      await Promise.all([
        fetch(`/api/players/${id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: currentStatus }),
        }),
        fetch(`/api/players/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes }),
        }),
      ]);
      setSaveMessage("Saved successfully");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-[#0D7B3E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Player not found</p>
        <Link href="/admin/players" className="text-[#0D7B3E] hover:underline mt-2 inline-block">
          Back to players
        </Link>
      </div>
    );
  }

  const app = player.applications?.[0];
  const age = player.dateOfBirth
    ? Math.floor((Date.now() - new Date(player.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;

  let videos: string[] = [];
  try {
    videos = player.media?.videos ? JSON.parse(player.media.videos) : [];
  } catch { videos = []; }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/players"
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">
            {player.firstName} {player.lastName}
          </h1>
          <p className="text-sm text-gray-400">
            {player.user?.email} · Ref: {app?.refNumber || "N/A"}
          </p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[currentStatus] || ""}`}>
          {formatStatus(currentStatus)}
        </span>
        {player.payment?.status === "paid" && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border bg-[#0D7B3E]/10 text-[#0D7B3E] border-[#0D7B3E]/20">
            <CreditCard className="h-4 w-4" />
            Paid ${player.payment.amount ?? "5"}.00
          </span>
        )}
      </div>

      <Card padding="lg">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Status & Notes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Application Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-[#232838] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0D7B3E]"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Submitted</label>
            <p className="text-sm text-white py-2.5">
              {app ? new Date(app.submittedAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-1 block">Scout Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add your notes about this player..."
            className="w-full rounded-xl border border-gray-700 bg-[#232838] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#0D7B3E] resize-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={saveStatus} loading={saving}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Failed") ? "text-red-400" : "text-[#0D7B3E]"}`}>
              {saveMessage}
            </span>
          )}
        </div>
      </Card>

      <Section title="Personal Details" icon={User}>
        <DetailRow label="Full Name" value={`${player.firstName} ${player.lastName}`} />
        <DetailRow label="Email" value={player.user?.email} />
        <DetailRow label="Date of Birth" value={player.dateOfBirth ? new Date(player.dateOfBirth).toLocaleDateString() : ""} />
        <DetailRow label="Age" value={age ? `${age} years` : ""} />
        <DetailRow label="Nationality" value={player.nationality} />
        <DetailRow label="Country of Residence" value={player.countryOfResidence} />
        <DetailRow label="City" value={player.city} />
        <DetailRow label="Phone" value={player.phoneNumber} />
      </Section>

      {player.guardian && (
        <Section title="Guardian Information" icon={Shield}>
          <DetailRow label="Guardian Name" value={player.guardian.name} />
          <DetailRow label="Relationship" value={player.guardian.relationship} />
          <DetailRow label="Email" value={player.guardian.email} />
          <DetailRow label="Phone" value={player.guardian.phone} />
        </Section>
      )}

      {player.footballProfile && (
        <Section title="Football Profile" icon={Shirt}>
          <DetailRow label="Primary Position" value={getLabel(POSITIONS, player.footballProfile.primaryPosition)} />
          <DetailRow label="Secondary Position" value={player.footballProfile.secondaryPosition ? getLabel(POSITIONS, player.footballProfile.secondaryPosition) : null} />
          <DetailRow label="Preferred Foot" value={player.footballProfile.preferredFoot} />
          <DetailRow label="Current Level" value={player.footballProfile.currentLevel?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} />
          <DetailRow label="Contract Status" value={player.footballProfile.contractStatus?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} />
          <DetailRow label="Current Club" value={player.footballProfile.currentClub} />
          <DetailRow label="Years Experience" value={player.footballProfile.yearsExperience} />
          <DetailRow label="Previous Clubs" value={player.footballProfile.previousClubs} />
        </Section>
      )}

      {player.physicalProfile && (
        <Section title="Physical Attributes" icon={Ruler}>
          <DetailRow label="Height" value={`${player.physicalProfile.heightCm} cm`} />
          <DetailRow label="Weight" value={`${player.physicalProfile.weightKg} kg`} />
          <DetailRow label="Body Type" value={player.physicalProfile.bodyType} />
          <DetailRow label="Fitness Level" value={player.physicalProfile.fitnessLevel} />
          <DetailRow label="Injuries" value={player.physicalProfile.injuries} />
        </Section>
      )}

      {player.careerStats && (
        <Section title="Career Statistics" icon={BarChart3}>
          <DetailRow label="Appearances" value={player.careerStats.totalAppearances} />
          <DetailRow label="Goals" value={player.careerStats.totalGoals} />
          <DetailRow label="Assists" value={player.careerStats.totalAssists} />
          <DetailRow label="Clean Sheets" value={player.careerStats.cleanSheets} />
          <DetailRow label="Yellow Cards" value={player.careerStats.yellowCards} />
          <DetailRow label="Red Cards" value={player.careerStats.redCards} />
        </Section>
      )}

      {player.playingStyle && (
        <Section title="Playing Style" icon={Globe}>
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailRow label="Biography" value={player.playingStyle.biography} />
          </div>
          <DetailRow label="Playing Style" value={player.playingStyle.playingStyle} />
          <DetailRow label="Strengths" value={player.playingStyle.strengths} />
          <DetailRow label="Weaknesses" value={player.playingStyle.weaknesses} />
          <DetailRow label="Favorite Position" value={player.playingStyle.favoritePosition ? getLabel(POSITIONS, player.playingStyle.favoritePosition) : null} />
          <DetailRow label="Favorite Player" value={player.playingStyle.favoritePlayer} />
          <DetailRow label="Career Goal" value={player.playingStyle.careerGoal} />
          <DetailRow label="Motivation" value={player.playingStyle.motivation} />
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0D7B3E]/10 text-[#0D7B3E] hover:bg-[#0D7B3E]/20 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  Video {i + 1}
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {player.availability && (
        <Section title="Availability" icon={Calendar}>
          <DetailRow label="Available for Trials" value={player.availability.availableForTrials ? "Yes" : "No"} />
          <DetailRow label="Available Immediately" value={player.availability.availableImmediately ? "Yes" : "No"} />
          <DetailRow label="Can Travel" value={player.availability.canTravel ? "Yes" : "No"} />
          <DetailRow label="Can Relocate" value={player.availability.canRelocate ? "Yes" : "No"} />
          <DetailRow label="Preferred Country" value={player.availability.preferredCountry} />
          <DetailRow label="Preferred League" value={player.availability.preferredLeague} />
          <DetailRow label="Preferred Trial Dates" value={player.availability.preferredTrialDates} />
          <DetailRow label="Preferred Communication" value={player.availability.preferredCommunication} />
        </Section>
      )}

      {player.socialLinks && (
        <Section title="Social Media" icon={Globe}>
          {Object.entries(player.socialLinks).map(([key, value]) => (
            <DetailRow key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={value} />
          ))}
        </Section>
      )}

      {player.documents && player.documents.length > 0 && (
        <Section title="Documents" icon={FileText}>
          <div className="sm:col-span-2 lg:col-span-3 space-y-2">
            {player.documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#232838] border border-gray-700">
                <FileText className="h-4 w-4 text-[#D4A843] shrink-0" />
                <span className="text-sm text-white flex-1 truncate">{doc.originalFilename}</span>
                <span className="text-xs text-gray-500 capitalize">{doc.documentType.replace(/([A-Z])/g, " $1")}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
