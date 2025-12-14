import { Metadata } from "next";
import Auth from "./Authentication";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Parador account to manage bookings, save favorites, and access exclusive luxury stays.",
  openGraph: {
    title: "Sign In | Parador",
    description:
      "Sign in to your Parador account to manage bookings, save favorites, and access exclusive luxury stays.",
    url: "https://parador-stays.vercel.app/auth",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In | Parador",
    description:
      "Sign in to your Parador account to manage bookings, save favorites, and access exclusive luxury stays.",
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
};

export default function page() {
  return <Auth />;
}
