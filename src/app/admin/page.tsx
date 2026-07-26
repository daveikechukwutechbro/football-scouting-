"use client";

import { useEffect, useState } from "react";
import { Users, FileText, Clock, CheckCircle, XCircle, Star, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";

interface DashboardStats {
  totalPlayers: number;
  totalApplications: number;
  statusCounts: Record<string, number>;
  positionCounts: { position: string; count: number }[];
  recentApplications: any[];
}

const STATUS_COLORS: Record<string, string> = {
  submitted: "text-blue-400",
  under_review: "text-yellow-400",
  shortlisted: "text-[#0D7B3E]",
  rejected: "text-red-400",
};

const STATUS_BG: Record<string, string> = {
  submitted: "bg-blue-400/10",
  under_review: "bg-yellow-400/10",
  shortlisted: "bg-[#0D7B3E]/10",
  rejected: "bg-red-400/10",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function getPositionLabel(code: string): string {
  return code
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-[#0D7B3E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-400 py-12">
        Failed to load dashboard data
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Players",
      value: stats.totalPlayers,
      icon: Users,
      color: "text-[#0D7B3E]",
      bg: "bg-[#0D7B3E]/10",
    },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Under Review",
      value: stats.statusCounts["under_review"] || 0,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Shortlisted",
      value: stats.statusCounts["shortlisted"] || 0,
      icon: Star,
      color: "text-[#D4A843]",
      bg: "bg-[#D4A843]/10",
    },
  ];

  const maxPositionCount = Math.max(...stats.positionCounts.map((p) => p.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Overview of your scouting platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Applications by Status
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className={`text-sm w-28 ${STATUS_COLORS[status] || "text-gray-400"}`}>
                  {formatStatus(status)}
                </span>
                <div className="flex-1 h-6 bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0D7B3E] to-[#0D7B3E]/70 rounded-lg transition-all duration-500"
                    style={{ width: `${(count / Math.max(stats.totalApplications, 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
              </div>
            ))}
            {Object.keys(stats.statusCounts).length === 0 && (
              <p className="text-sm text-gray-500 italic">No applications yet</p>
            )}
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Players by Position
          </h3>
          <div className="space-y-3">
            {stats.positionCounts.slice(0, 8).map((item) => (
              <div key={item.position} className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-36 truncate">
                  {getPositionLabel(item.position)}
                </span>
                <div className="flex-1 h-6 bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4A843] to-[#D4A843]/70 rounded-lg transition-all duration-500"
                    style={{ width: `${(item.count / maxPositionCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8 text-right">{item.count}</span>
              </div>
            ))}
            {stats.positionCounts.length === 0 && (
              <p className="text-sm text-gray-500 italic">No player data yet</p>
            )}
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Recent Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Player</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Location</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stats.recentApplications.map((app: any) => (
                <tr key={app.id} className="hover:bg-gray-800/30">
                  <td className="py-3 text-sm text-white">
                    {app.player?.firstName} {app.player?.lastName}
                  </td>
                  <td className="py-3 text-sm text-gray-400">
                    {app.player?.city || "N/A"}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BG[app.status] || "bg-gray-800"} ${STATUS_COLORS[app.status] || "text-gray-400"}`}>
                      {formatStatus(app.status)}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-400">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recentApplications.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 italic">
                    No applications yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
