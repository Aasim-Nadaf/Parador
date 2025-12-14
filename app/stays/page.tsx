import { Metadata } from "next";
import Stays from "./Stays";

export const metadata: Metadata = {
  title: "Luxury Stays",
  description:
    "Browse our collection of premium vacation rentals and luxury accommodations.",
  openGraph: {
    title: "Luxury Stays | Parador",
    description:
      "Browse our collection of premium vacation rentals and luxury accommodations.",
    url: "https://parador-stays.vercel.app/stays",
    images: [
      {
        url: "https://parador-stays.vercel.app/hero-villa.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function stays() {
  return <Stays />;
}
