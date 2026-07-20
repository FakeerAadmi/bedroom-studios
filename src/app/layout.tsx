// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Newsreader, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
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
      <body className="font-body bg-paper text-ink">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
