import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ProScout Football | Get Discovered by Professional Scouts",
    template: "%s | ProScout Football",
  },
  description:
    "Join ProScout Football — the premier platform for aspiring footballers to register, upload highlights, and get scouted by professional scouts worldwide.",
  keywords: [
    "football scouting", "player registration", "football trials",
    "soccer scouting", "football recruitment", "get discovered",
    "football talent", "scout football players", "football academy",
  ],
  authors: [{ name: "ProScout Football" }],
  creator: "ProScout Football",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://proscoutfootball.com",
    siteName: "ProScout Football",
    title: "ProScout Football | Get Discovered by Professional Scouts",
    description:
      "Create your player profile, upload highlights, and get reviewed by professional scouts.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ProScout Football" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProScout Football | Get Discovered",
    description: "Create your player profile, upload highlights, and get scouted.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
