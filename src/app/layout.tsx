import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

export const metadata: Metadata = {
  title: "Team Workspace — Dashboard V22",
  description: "Animated team workspace dashboard built with Next.js, Tailwind, Motion and GSAP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
