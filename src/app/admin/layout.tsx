"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-[#0F1419]/80 backdrop-blur-xl border-b border-gray-800 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#0D7B3E] flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
