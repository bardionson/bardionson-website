import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bård Ionson - Fine Digital Art",
  description: "Bård Ionson Artist Studio & Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans selection:bg-primary/30 selection:text-primary-foreground`} suppressHydrationWarning>
        <AuthProvider>
          <header className="sticky top-0 z-50 w-full glassmorphism border-b-0 border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tighter hover:text-primary transition-colors">
                Bård Ionson
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/70">
                <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                <Link href="/exhibitions" className="hover:text-white transition-colors">Exhibitions</Link>
                <Link href="/news" className="hover:text-white transition-colors">News</Link>
                <Link href="/primary-market" className="hover:text-white transition-colors">Primary</Link>
                <Link href="/secondary-market" className="hover:text-white transition-colors">Secondary</Link>
                <Link href="/balloons-in-the-sky" className="hover:text-white transition-colors">Balloons In The Sky</Link>
                <Link href="/collectors" className="hover:text-white transition-colors text-primary">Collectors Vault</Link>
              </nav>
            </div>
          </header>

          <main className="min-h-[calc(100vh-4rem-1px)]">
            {children}
          </main>

          <footer className="border-t border-white/10 glassmorphism mt-20">
            <div className="container mx-auto px-4 py-8 flex items-center justify-between text-white/50 text-sm">
              <p>© {new Date().getFullYear()} Bård Ionson Studio. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/cv" className="hover:text-white transition-colors">CV</Link>
                <a href="https://twitter.com/bardionson" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter (X)</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
