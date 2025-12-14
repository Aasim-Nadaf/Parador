import { Metadata } from "next";
import HostDashboard from "./Host";

export const metadata: Metadata = {
  title: "Become a Host",
  description:
    "Join Parador's network of premium hosts. List your luxury property, earn exceptional returns, and connect with discerning travelers worldwide. Start hosting today.",
  keywords: [
    "become a host",
    "list property",
    "rent property",
    "luxury hosting",
    "vacation rental host",
    "property listing",
    "earn from property",
    "host dashboard",
    "property management",
    "vacation rental income",
  ],
  openGraph: {
    title: "Become a Host | Parador",
    description:
      "Join Parador's network of premium hosts. List your luxury property and earn exceptional returns.",
    url: "https://parador-stays.vercel.app/host",
    type: "website",
    images: [
      {
        url: "https://parador-stays.vercel.app/hero-villa.jpg",
        width: 1200,
        height: 630,
        alt: "Become a Parador Host",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Host | Parador",
    description:
      "Join Parador's network of premium hosts. List your luxury property and earn exceptional returns.",
    images: ["https://parador-stays.vercel.app/property-4.jpg"],
  },
  alternates: {
    canonical: "https://parador-stays.vercel.app/host",
  },
};

export default function page() {
  return <HostDashboard />;
}
