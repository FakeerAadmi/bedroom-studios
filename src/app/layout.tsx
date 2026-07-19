import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Bedroom Studios | Handmade Desk Objects & Cementware",
  description: "Quirky 3D printed gadgets and brutalist cementware for modern Indian desks. Designed and made in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${newsreader.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-paper text-ink">
        {/* Temporary Navigation for Testing Routes */}
        <nav className="p-4 border-b border-ink/10 flex flex-wrap gap-4 text-sm font-mono text-accent">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/product/test-product">Product (test-product)</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/fandoms">Fandoms</Link>
          <Link href="/commissions">Commissions</Link>
          <Link href="/about">About</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/track">Track</Link>
          <Link href="/hq">HQ</Link>
          <Link href="/some-info-page">Info Page (Dynamic slug)</Link>
          <Link href="/invalid/url">404 Test</Link>
        </nav>
        <main className="flex-1 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
