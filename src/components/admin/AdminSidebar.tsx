"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/players", label: "Players", icon: Users },
  { href: "/admin/trials", label: "Trials", icon: Trophy },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-[#111827] border-r border-gray-800 z-50 transition-all duration-300 flex flex-col
          ${collapsed ? "w-[72px]" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D7B3E]">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-bold">ProScout</span>
            </Link>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-[#0D7B3E]/15 text-[#0D7B3E]"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all w-full
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
