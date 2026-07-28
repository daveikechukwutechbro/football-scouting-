import Link from "next/link";

const PLATFORM_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/signup", label: "Register" },
  { href: "/login", label: "Login" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookies", label: "Cookie Policy" },
];

const BOTTOM_LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background dark:border-border dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-white"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-[15px] font-bold text-foreground dark:text-foreground">
                ProScout
              </span>
            </Link>
            <p className="max-w-[280px] text-[13px] leading-relaxed text-muted dark:text-muted">
              Connecting aspiring footballers with professional scouts
              worldwide. Your talent, our platform.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted dark:text-muted">
              Platform
            </h4>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted dark:text-muted">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted dark:text-muted">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-[13px] text-muted dark:text-muted">
                info@proscoutfootball.com
              </li>
              <li className="text-[13px] text-muted dark:text-muted">
                London, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row dark:border-border">
          <p className="text-[12px] text-muted dark:text-muted">
            &copy; {new Date().getFullYear()} ProScout Football. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {BOTTOM_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-muted transition-colors hover:text-foreground dark:text-muted dark:hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
