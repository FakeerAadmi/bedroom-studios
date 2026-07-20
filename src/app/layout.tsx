import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { DM_Sans, Newsreader, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
import "./globals.css";
import "../env";

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
  metadataBase: new URL('https://bedroomstudios.vercel.app'),
  title: {
    default: "Bedroom Studios | Handmade Desk Objects & Cementware",
    template: "%s | Bedroom Studios"
  },
  description: "Small-batch, essentially handmade desk objects built in India. Quirky 3D printed gadgets and brutalist cementware.",
  keywords: ["desk setup", "desk toys", "cementware", "3D printed gadgets", "fidget toys", "made in India"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Bedroom Studios",
    description: "Small-batch, essentially handmade desk objects built in India.",
    url: 'https://bedroomstudios.vercel.app',
    siteName: 'Bedroom Studios',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bedroom Studios",
    description: "Small-batch, essentially handmade desk objects built in India.",
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
      className={`${dmSans.variable} ${newsreader.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="font-body bg-paper text-ink">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>

        {/* Analytics Placeholders */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-MEASUREMENT-ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR-GA4-MEASUREMENT-ID');
          `}
        </Script>
      </body>
    </html>
  );
}
