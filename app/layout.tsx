import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FitBuddy — Your AI Fitness Buddy",
  description: "Login‑free fitness onboarding and dashboard demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="container py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold hover:text-indigo-600 transition-colors">FitBuddy</Link>
            <nav className="flex items-center gap-2">
              <Link className="btn-ghost" href="/onboarding">Get Started</Link>
              <Link className="btn-primary" href="/app">Open App</Link>
            </nav>
          </header>
          <main className="container pb-20">{children}</main>
          <footer className="container py-10 text-sm text-slate-600">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p>© {new Date().getFullYear()} FitBuddy (Demo)</p>
              <Link href="/legal" className="underline hover:text-indigo-600 transition-colors">Terms & Privacy</Link>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}