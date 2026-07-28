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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/80 dark:bg-background/80 backdrop-blur-xl border-border dark:border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] fill-current text-white"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-[15px] font-bold tracking-tight text-foreground dark:text-foreground">
                ProScout
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const base = link.href.split("#")[0];
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : base !== "/" && pathname.startsWith(base);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-light dark:bg-primary/20 text-foreground dark:text-foreground"
                        : "text-muted hover:text-foreground dark:text-muted dark:hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-primary/90"
              >
                Register Free
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-lg p-2 text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 border-b border-border bg-background dark:border-border dark:bg-background">
            <nav className="flex flex-col gap-1 px-4 pt-4 pb-2">
              {NAV_LINKS.map((link) => {
                const base = link.href.split("#")[0];
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : base !== "/" && pathname.startsWith(base);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-primary-light dark:bg-primary/20 text-foreground dark:text-foreground"
                        : "text-foreground dark:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 dark:border-border">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-5 py-3 text-center text-[14px] font-medium text-foreground transition-colors hover:bg-surface dark:border-border dark:text-foreground dark:hover:bg-surface"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-5 py-3 text-center text-[14px] font-semibold text-white transition-all duration-200 hover:bg-primary/90"
              >
                Register Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
