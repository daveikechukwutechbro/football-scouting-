import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--primary)" }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-[15px] font-bold" style={{ color: "var(--fg-heading)" }}>ProScout</span>
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[280px]" style={{ color: "var(--fg-muted)" }}>
              Connecting aspiring footballers with professional scouts worldwide. Your talent, our platform.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-5" style={{ color: "var(--fg-muted)" }}>Platform</h4>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/register", label: "Register" }, { href: "/login", label: "Login" }, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[13px] transition-colors" style={{ color: "var(--fg-muted)" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-5" style={{ color: "var(--fg-muted)" }}>Legal</h4>
            <ul className="space-y-3">
              {[{ href: "/privacy", label: "Privacy Policy" }, { href: "/terms", label: "Terms of Use" }, { href: "/cookies", label: "Cookie Policy" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[13px] transition-colors" style={{ color: "var(--fg-muted)" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-5" style={{ color: "var(--fg-muted)" }}>Contact</h4>
            <ul className="space-y-3">
              <li className="text-[13px]" style={{ color: "var(--fg-muted)" }}>info@proscoutfootball.com</li>
              <li className="text-[13px]" style={{ color: "var(--fg-muted)" }}>London, United Kingdom</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-[12px]" style={{ color: "var(--fg-muted)" }}>&copy; {new Date().getFullYear()} ProScout Football. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[12px] transition-colors" style={{ color: "var(--fg-muted)" }}>Privacy</Link>
            <Link href="/terms" className="text-[12px] transition-colors" style={{ color: "var(--fg-muted)" }}>Terms</Link>
            <Link href="/cookies" className="text-[12px] transition-colors" style={{ color: "var(--fg-muted)" }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
