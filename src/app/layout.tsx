import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "ProScout Football | Get Discovered by Professional Scouts", template: "%s | ProScout Football" },
  description: "Join ProScout Football — the premier platform for aspiring footballers to register, upload highlights, and get scouted by professional scouts worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
