import { Metadata } from "next";
import MyBookings from "./MyBookings";

export const metadata: Metadata = {
  title: "My Bookings",
  description:
    "Manage your Parador bookings. View upcoming stays, past reservations, and booking details all in one place.",
  openGraph: {
    title: "My Bookings | Parador",
    description: "Manage your Parador bookings and view your travel history.",
    url: "https://parador-stays.vercel.app/my-bookings",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Bookings | Parador",
    description: "Manage your Parador bookings and view your travel history.",
  },
  robots: {
    index: false, // Don't index personal pages
    follow: false,
  },
};
export default function page() {
  return <MyBookings />;
}
