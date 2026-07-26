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
    "Join ProScout Football — the premier platform for aspiring footballers to register, upload highlights, and get scouted by professional scouts worldwide. Free registration, real opportunities.",
  keywords: [
    "football scouting",
    "player registration",
    "football trials",
    "soccer scouting",
    "football recruitment",
    "get discovered",
    "football talent",
    "scout football players",
    "football academy",
    "footballer career",
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
      "Create your player profile, upload highlights, and get reviewed by professional scouts. Free registration for aspiring footballers worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProScout Football - Football Scouting Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProScout Football | Get Discovered",
    description:
      "Create your player profile, upload highlights, and get scouted by professional scouts.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#080c12" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080c12] text-white">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
