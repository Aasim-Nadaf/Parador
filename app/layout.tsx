import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Parador - Luxury Stays & Premium Vacation Rentals",
    template: "%s | Parador",
  },
  description:
    "Discover exceptional luxury stays with Parador. Book premium vacation rentals, boutique hotels, and exclusive properties worldwide. Experience comfort, elegance, and world-class hospitality.",

  // Keywords for SEO
  keywords: [
    "luxury vacation rentals",
    "premium stays",
    "boutique hotels",
    "luxury accommodations",
    "vacation homes",
    "luxury travel",
    "exclusive properties",
    "high-end rentals",
    "luxury getaways",
    "premium hospitality",
    "parador stays",
    "luxury bookings",
    "vacation rentals",
    "holiday homes",
  ],

  // Authors & Creators
  authors: [{ name: "Parador" }],
  creator: "Parador",
  publisher: "Parador",
  applicationName: "Parador",

  // Referrer Policy
  referrer: "origin-when-cross-origin",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: [
      { url: "/logo.svg" },
      { url: "/logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },

  // Manifest
  manifest: "/manifest.json",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parador-stays.vercel.app",
    siteName: "Parador",
    title: "Parador - Luxury Stays & Premium Vacation Rentals",
    description:
      "Discover exceptional luxury stays with Parador. Book premium vacation rentals and exclusive properties worldwide.",
    images: [
      {
        url: "https://parador-stays.vercel.app/hero-villa.jpg",
        width: 1200,
        height: 630,
        alt: "Parador - Luxury Stays",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Parador - Luxury Stays & Premium Vacation Rentals",
    description:
      "Discover exceptional luxury stays with Parador. Book premium vacation rentals and exclusive properties worldwide.",
    images: ["https://parador-stays.vercel.app/hero-villa.jpg"],
  },

  // Verification (Add your actual codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Category
  category: "Travel & Hospitality",

  // Canonical URL
  metadataBase: new URL("https://parador-stays.vercel.app"),

  // Alternate languages
  alternates: {
    canonical: "https://parador-stays.vercel.app",
  },

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />

            <Navbar />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
