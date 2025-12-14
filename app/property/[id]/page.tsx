// app/property/[id]/page.tsx
import { Metadata } from "next";
import { supabase } from "@/integrations/supabase/client";
import PropertyDetailClient from "./PropertyDetailClient";

// Type for params
type Props = {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate dynamic metadata for each property
export async function generateMetadata(prop: Props): Promise<Metadata> {
  const { id } = await prop.params;

  try {
    // Fetch property data from Supabase
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    // If property not found or error
    if (error || !property) {
      return {
        title: "Property Not Found",
        description: "This property is no longer available on Parador.",
      };
    }

    // Create SEO-optimized description
    const description =
      property.description?.slice(0, 155) ||
      `Book this stunning ${property.bedrooms}-bedroom luxury property in ${property.location}. Sleeps ${property.max_guests} guests. From $${property.price_per_night} per night on Parador.`;

    // Get first image or use default
    const mainImage =
      property.images?.[0] ||
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop";

    return {
      title: property.title,
      description,
      keywords: [
        property.location,
        "luxury rental",
        "vacation rental",
        `${property.bedrooms} bedroom`,
        "premium stay",
        property.title,
        "luxury accommodation",
        "vacation home",
        `${property.max_guests} guests`,
      ],
      openGraph: {
        title: `${property.title} | Parador`,
        description,
        url: `https://parador-stays.vercel.app/property/${id}`,
        type: "website",
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: property.title,
          },
          // Add additional images if available
          ...(property.images?.slice(1, 4).map((img: string) => ({
            url: img,
            width: 1200,
            height: 630,
            alt: property.title,
          })) || []),
        ],
        locale: "en_US",
        siteName: "Parador",
      },
      twitter: {
        card: "summary_large_image",
        title: `${property.title} | Parador`,
        description,
        images: [mainImage],
      },
      alternates: {
        canonical: `https://parador-stays.vercel.app/property/${id}`,
      },
      // Additional rich metadata
      other: {
        "property:price": `${property.price_per_night}`,
        "property:currency": "USD",
        "property:bedrooms": `${property.bedrooms}`,
        "property:bathrooms": `${property.bathrooms}`,
        "property:guests": `${property.max_guests}`,
        "property:location": property.location,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Property Not Found",
      description: "This property is no longer available on Parador.",
    };
  }
}

// Main page component
export default async function PropertyPage(prop: Props) {
  const { id } = await prop.params;
  return <PropertyDetailClient id={id} />;
}

// Optional: Generate static params for static generation (if needed)
// export async function generateStaticParams() {
//   const { data: properties } = await supabase
//     .from("properties")
//     .select("id")
//     .eq("is_active", true);
//
//   if (!properties) return [];
//
//   return properties.map((property) => ({
//     id: property.id,
//   }));
// }
