"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#trials", label: "Trials" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--bg-card)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--primary)" }}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-[15px] font-bold tracking-tight" style={{ color: "var(--fg-heading)" }}>ProScout</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const base = link.href.split("#")[0];
                const isActive = link.href === "/" ? pathname === "/" : (base !== "/" && pathname.startsWith(base));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "var(--fg-heading)" : "var(--fg-muted)",
                      backgroundColor: isActive ? "var(--primary-lighter)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--fg-muted)" }}
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
                style={{ color: "var(--fg-muted)" }}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Register Free
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--fg-muted)" }}
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg transition-all"
                style={{ color: "var(--fg-muted)" }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)} />
          <div
            className="absolute top-0 left-0 right-0 pt-[72px] pb-6 px-6"
            style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-[15px] font-medium transition-all"
                  style={{ color: "var(--fg-text)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-6 px-4">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-center px-5 py-3 rounded-lg text-[14px] font-medium border" style={{ color: "var(--fg-text)", borderColor: "var(--border)" }}>
                Log In
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="text-center px-5 py-3 rounded-lg text-[14px] font-semibold text-white" style={{ backgroundColor: "var(--primary)" }}>
                Register Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
