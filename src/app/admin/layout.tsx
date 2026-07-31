"use client";

import { useState, useEffect } from "react";
import { Menu, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "infoproscoutt@gmail.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/admin/login");
      }
    }
  }, [user, loading, router, pathname]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

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

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
