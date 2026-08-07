"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  nationality: string;
  createdAt: string;
  user: { email: string };
  footballProfile: { primaryPosition: string; currentLevel: string } | null;
  physicalProfile: { heightCm: number; weightKg: number } | null;
  careerStats: { totalGoals: number; totalAppearances: number } | null;
  applications: { status: string; refNumber: string }[];
  payment: { status: string } | null;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
];

const POSITION_OPTIONS = [
  { value: "", label: "All Positions" },
  { value: "goalkeeper", label: "Goalkeeper" },
  { value: "right-back", label: "Right Back" },
  { value: "left-back", label: "Left Back" },
  { value: "center-back", label: "Center Back" },
  { value: "defensive-midfielder", label: "Defensive Midfielder" },
  { value: "central-midfielder", label: "Central Midfielder" },
  { value: "attacking-midfielder", label: "Attacking Midfielder" },
  { value: "right-winger", label: "Right Winger" },
  { value: "left-winger", label: "Left Winger" },
  { value: "striker", label: "Striker" },
  { value: "center-forward", label: "Center Forward" },
];

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-blue-400/10 text-blue-400",
  under_review: "bg-yellow-400/10 text-yellow-400",
  shortlisted: "bg-[#0D7B3E]/10 text-[#0D7B3E]",
  rejected: "bg-red-400/10 text-red-400",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function getPositionLabel(code: string): string {
  return code.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const [page, setPage] = useState(1);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "20");
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (position) params.set("position", position);

    try {
      const res = await fetch(`/api/players?${params.toString()}`);
      const data = await res.json();
      setPlayers(data.players || []);
      setPagination(data.pagination || { total: 0, page: 1, limit: 20, totalPages: 0 });
    } catch {
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, position]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    setPage(1);
  }, [search, status, position]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Players</h1>
          <p className="text-sm text-gray-400 mt-1">{pagination.total} total players</p>
        </div>
      </div>

      <Card className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-[34px] h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-[#232838] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#0D7B3E] transition-colors"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#232838] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0D7B3E] transition-colors"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-48">
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#232838] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0D7B3E] transition-colors"
          >
            {POSITION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card padding="none">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="h-8 w-8 border-2 border-[#0D7B3E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No players found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Player</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Position</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Level</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Payment</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Registered</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {players.map((player) => {
                  const appStatus = player.applications?.[0]?.status || "submitted";
                  return (
                    <tr key={player.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {player.firstName} {player.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{player.user?.email}</p>
                          <p className="text-xs text-gray-500">{player.city || player.nationality}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {player.footballProfile ? getPositionLabel(player.footballProfile.primaryPosition) : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {player.footballProfile?.currentLevel?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[appStatus] || "bg-gray-800 text-gray-400"}`}>
                          {formatStatus(appStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {player.payment?.status === "paid" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D7B3E]/10 text-[#0D7B3E]">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-500">
                            Unpaid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(player.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/players/${player.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0D7B3E] hover:bg-[#0D7B3E]/10 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
