"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const STATS = [
  { label: "Players", value: "2,500+" },
  { label: "Active Scouts", value: "180+" },
  { label: "Countries", value: "50+" },
];

const PROFILES = [
  { name: "Marcus Johnson", pos: "Striker", age: 21, loc: "London, UK", initials: "MJ", photo: "https://randomuser.me/api/portraits/men/32.jpg", goals: 24, assists: 12, apps: 38, rating: 8.2, pace: 85, shooting: 78, passing: 72, dribbling: 80, status: "Free Agent" },
  { name: "Kai Hernandez", pos: "Midfielder", age: 23, loc: "Barcelona, Spain", initials: "KH", photo: "https://randomuser.me/api/portraits/men/45.jpg", goals: 8, assists: 19, apps: 42, rating: 8.5, pace: 70, shooting: 68, passing: 88, dribbling: 85, status: "Verified" },
  { name: "Amadou Diallo", pos: "Winger", age: 20, loc: "Paris, France", initials: "AD", photo: "https://randomuser.me/api/portraits/men/22.jpg", goals: 15, assists: 11, apps: 30, rating: 7.9, pace: 92, shooting: 72, passing: 65, dribbling: 88, status: "Free Agent" },
  { name: "Lucas Fernández", pos: "Defender", age: 25, loc: "Buenos Aires, Argentina", initials: "LF", photo: "https://randomuser.me/api/portraits/men/51.jpg", goals: 3, assists: 7, apps: 45, rating: 8.1, pace: 74, shooting: 45, passing: 70, dribbling: 55, status: "Verified" },
  { name: "Yusuf Ozil", pos: "Midfielder", age: 22, loc: "Istanbul, Turkey", initials: "YO", photo: "https://randomuser.me/api/portraits/men/36.jpg", goals: 11, assists: 16, apps: 36, rating: 8.0, pace: 72, shooting: 74, passing: 85, dribbling: 82, status: "Free Agent" },
  { name: "Daniel Okafor", pos: "Striker", age: 24, loc: "Lagos, Nigeria", initials: "DO", photo: "https://randomuser.me/api/portraits/men/29.jpg", goals: 31, assists: 5, apps: 34, rating: 8.6, pace: 88, shooting: 90, passing: 58, dribbling: 75, status: "Verified" },
  { name: "Henrik Larsson", pos: "Goalkeeper", age: 27, loc: "Stockholm, Sweden", initials: "HL", photo: "https://randomuser.me/api/portraits/men/41.jpg", goals: 0, assists: 0, apps: 48, rating: 8.3, pace: 30, shooting: 15, passing: 55, dribbling: 20, status: "Free Agent" },
  { name: "Matheus Silva", pos: "Winger", age: 19, loc: "São Paulo, Brazil", initials: "MS", photo: "https://randomuser.me/api/portraits/men/18.jpg", goals: 9, assists: 14, apps: 26, rating: 7.8, pace: 94, shooting: 70, passing: 68, dribbling: 91, status: "Free Agent" },
  { name: "Jamal Williams", pos: "Midfielder", age: 26, loc: "Manchester, UK", initials: "JW", photo: "https://randomuser.me/api/portraits/men/55.jpg", goals: 6, assists: 22, apps: 50, rating: 8.4, pace: 68, shooting: 62, passing: 91, dribbling: 80, status: "Verified" },
  { name: "Ravi Patel", pos: "Defender", age: 23, loc: "Mumbai, India", initials: "RP", photo: "https://randomuser.me/api/portraits/men/33.jpg", goals: 2, assists: 4, apps: 39, rating: 7.7, pace: 76, shooting: 40, passing: 65, dribbling: 50, status: "Free Agent" },
  { name: "Tomás Reyes", pos: "Striker", age: 21, loc: "Mexico City, Mexico", initials: "TR", photo: "https://randomuser.me/api/portraits/men/24.jpg", goals: 18, assists: 7, apps: 32, rating: 7.9, pace: 86, shooting: 82, passing: 60, dribbling: 78, status: "Free Agent" },
  { name: "Oleg Petrov", pos: "Defender", age: 28, loc: "Moscow, Russia", initials: "OP", photo: "https://randomuser.me/api/portraits/men/47.jpg", goals: 4, assists: 3, apps: 44, rating: 8.0, pace: 72, shooting: 38, passing: 62, dribbling: 45, status: "Verified" },
  { name: "Kenji Tanaka", pos: "Midfielder", age: 22, loc: "Tokyo, Japan", initials: "KT", photo: "https://randomuser.me/api/portraits/men/28.jpg", goals: 7, assists: 13, apps: 35, rating: 7.8, pace: 75, shooting: 70, passing: 83, dribbling: 86, status: "Free Agent" },
  { name: "Carlos Mendoza", pos: "Winger", age: 20, loc: "Bogotá, Colombia", initials: "CM", photo: "https://randomuser.me/api/portraits/men/37.jpg", goals: 12, assists: 9, apps: 28, rating: 7.6, pace: 90, shooting: 74, passing: 62, dribbling: 87, status: "Free Agent" },
  { name: "André Dupont", pos: "Goalkeeper", age: 30, loc: "Lyon, France", initials: "AD", photo: "https://randomuser.me/api/portraits/men/60.jpg", goals: 0, assists: 1, apps: 52, rating: 8.5, pace: 28, shooting: 12, passing: 50, dribbling: 18, status: "Verified" },
  { name: "Emeka Chukwu", pos: "Striker", age: 23, loc: "Accra, Ghana", initials: "EC", photo: "https://randomuser.me/api/portraits/men/42.jpg", goals: 27, assists: 4, apps: 33, rating: 8.3, pace: 89, shooting: 87, passing: 55, dribbling: 76, status: "Free Agent" },
  { name: "Stefan Müller", pos: "Midfielder", age: 25, loc: "Berlin, Germany", initials: "SM", photo: "https://randomuser.me/api/portraits/men/48.jpg", goals: 9, assists: 18, apps: 46, rating: 8.2, pace: 71, shooting: 73, passing: 87, dribbling: 79, status: "Free Agent" },
  { name: "Liam O'Brien", pos: "Defender", age: 24, loc: "Dublin, Ireland", initials: "LO", photo: "https://randomuser.me/api/portraits/men/39.jpg", goals: 3, assists: 6, apps: 40, rating: 7.8, pace: 78, shooting: 42, passing: 68, dribbling: 52, status: "Free Agent" },
  { name: "Gabriel Costa", pos: "Winger", age: 21, loc: "Lisbon, Portugal", initials: "GC", photo: "https://randomuser.me/api/portraits/men/34.jpg", goals: 14, assists: 10, apps: 31, rating: 8.0, pace: 91, shooting: 76, passing: 67, dribbling: 89, status: "Verified" },
  { name: "Nikos Papadopoulos", pos: "Striker", age: 26, loc: "Athens, Greece", initials: "NP", photo: "https://randomuser.me/api/portraits/men/53.jpg", goals: 20, assists: 8, apps: 37, rating: 8.1, pace: 82, shooting: 84, passing: 62, dribbling: 73, status: "Free Agent" },
  { name: "Tariq Al-Hassan", pos: "Midfielder", age: 22, loc: "Cairo, Egypt", initials: "TA", photo: "https://randomuser.me/api/portraits/men/31.jpg", goals: 5, assists: 15, apps: 33, rating: 7.7, pace: 73, shooting: 65, passing: 84, dribbling: 81, status: "Free Agent" },
  { name: "Jackson Reed", pos: "Defender", age: 27, loc: "Chicago, USA", initials: "JR", photo: "https://randomuser.me/api/portraits/men/56.jpg", goals: 5, assists: 2, apps: 43, rating: 7.9, pace: 80, shooting: 50, passing: 60, dribbling: 48, status: "Free Agent" },
  { name: "Pierre Moreau", pos: "Winger", age: 19, loc: "Marseille, France", initials: "PM", photo: "https://randomuser.me/api/portraits/men/20.jpg", goals: 6, assists: 8, apps: 22, rating: 7.5, pace: 93, shooting: 68, passing: 60, dribbling: 90, status: "Free Agent" },
  { name: "Arjun Singh", pos: "Striker", age: 24, loc: "New Delhi, India", initials: "AS", photo: "https://randomuser.me/api/portraits/men/44.jpg", goals: 16, assists: 6, apps: 35, rating: 7.8, pace: 84, shooting: 80, passing: 58, dribbling: 74, status: "Free Agent" },
  { name: "Mikhail Volkov", pos: "Goalkeeper", age: 29, loc: "Kyiv, Ukraine", initials: "MV", photo: "https://randomuser.me/api/portraits/men/58.jpg", goals: 0, assists: 0, apps: 47, rating: 8.4, pace: 25, shooting: 10, passing: 48, dribbling: 15, status: "Verified" },
];

function ProfileCard({ profile, fade }: { profile: typeof PROFILES[0]; fade: string }) {
  const statItems = [
    { label: "Goals", value: profile.goals, color: "text-primary" },
    { label: "Assists", value: profile.assists, color: "text-accent" },
    { label: "Apps", value: profile.apps, color: "text-foreground" },
    { label: "Rating", value: profile.rating.toFixed(1), color: "text-amber-500" },
  ];
  const skillItems = [
    { label: "Pace", pct: profile.pace, bar: "bg-primary" },
    { label: "Shooting", pct: profile.shooting, bar: "bg-accent" },
    { label: "Passing", pct: profile.passing, bar: "bg-primary" },
    { label: "Dribbling", pct: profile.dribbling, bar: "bg-accent" },
  ];

  return (
    <div className={`rounded-2xl border border-border bg-surface shadow-lg transition-all duration-500 ${fade}`}>
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-border"
            loading="lazy"
          />
          <div>
            <div className="text-[13px] font-semibold text-foreground">{profile.name}</div>
            <div className="text-[11px] text-muted">{profile.pos} · {profile.loc} · Age {profile.age}</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {statItems.map((s) => (
            <div key={s.label} className="text-center py-2.5 rounded-lg bg-surface-alt border border-border">
              <div className={`text-[17px] font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[9px] mt-0.5 uppercase tracking-[0.05em] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {skillItems.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-[12px]">
              <span className="text-muted w-16">{s.label}</span>
              <div className="flex-1 mx-2 h-1.5 rounded-full overflow-hidden bg-border">
                <div className={`h-full rounded-full ${s.bar} transition-all duration-700`} style={{ width: `${s.pct}%` }} />
              </div>
              <span className="font-medium tabular-nums text-foreground w-7 text-right">{s.pct}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 flex items-center gap-2">
        <span className="px-2 py-1 rounded text-[10px] font-semibold bg-primary-light text-primary">{profile.status}</span>
        {profile.rating >= 8.0 && <span className="px-2 py-1 rounded text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Top Rated</span>}
      </div>
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState("opacity-100");

  const next = useCallback(() => {
    setFade("opacity-0");
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % PROFILES.length);
      setFade("opacity-100");
    }, 250);
  }, []);

  const prev = useCallback(() => {
    setFade("opacity-0");
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + PROFILES.length) % PROFILES.length);
      setFade("opacity-100");
    }, 250);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background -mt-16">
      <div className="absolute inset-0 opacity-[0.025]">
        <svg viewBox="0 0 1200 800" className="w-full h-full fill-none stroke-primary" strokeWidth="0.5">
          <circle cx="600" cy="400" r="200" />
          <circle cx="600" cy="400" r="80" />
          <line x1="600" y1="200" x2="600" y2="600" />
          <line x1="400" y1="400" x2="800" y2="400" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-24 lg:pb-0 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary-light mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                Trusted by scouts in 50+ countries
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground">
              Show the world
              <br />
              <span className="text-primary">what you can do</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] max-w-[520px] text-muted">
              Create your player profile, upload match highlights, and get directly in front of professional scouts actively looking for talent like yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white bg-primary transition-all duration-200 hover:opacity-90"
              >
                Create Your Profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-medium text-muted border border-border transition-all duration-200 hover:bg-surface-alt"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <ProfileCard profile={PROFILES[current]} fade={fade} />
            <div className="flex items-center justify-between mt-4">
              <button onClick={prev} className="p-2 rounded-lg border border-border bg-surface hover:bg-surface-alt transition-colors" aria-label="Previous profile">
                <ChevronLeft className="h-4 w-4 text-muted" />
              </button>
              <div className="flex items-center gap-1.5">
                {PROFILES.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-primary" : "w-1.5 bg-border"}`} />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-lg border border-border bg-surface hover:bg-surface-alt transition-colors" aria-label="Next profile">
                <ChevronRight className="h-4 w-4 text-muted" />
              </button>
            </div>
            <p className="text-center text-[11px] text-muted mt-2">
              Player {current + 1} of {PROFILES.length} · Auto-rotating every 10s
            </p>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-[480px]">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[24px] font-bold tracking-tight text-foreground">{stat.value}</div>
              <div className="text-[12px] mt-0.5 text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="h-5 w-5 text-muted" />
      </div>
    </section>
  );
}
