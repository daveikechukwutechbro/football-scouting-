"use client";

import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import { User, Mail, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Admin account settings</p>
      </div>

      <Card padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D7B3E]/15">
            <User className="h-6 w-6 text-[#0D7B3E]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{(session?.user as any)?.name || "Admin"}</h3>
            <p className="text-sm text-gray-400">{session?.user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#232838] border border-gray-700">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-white">{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#232838] border border-gray-700">
            <Shield className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm text-white capitalize">{(session?.user as any)?.role || "admin"}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-sm font-semibold text-white mb-3">Platform Info</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>ProScout Football — Player Registration & Scouting Platform</p>
          <p>Version 1.0.0</p>
        </div>
      </Card>
    </div>
  );
}
