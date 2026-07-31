"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/useAuth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
