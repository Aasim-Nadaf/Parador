// app/property/[id]/PropertyDetailClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Heart,
  Share2,
  Loader2,
  Check,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  address: string | null;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[] | null;
  images: string[] | null;
  rating: number | null;
  review_count: number | null;
  host_id: string;
}

interface PropertyDetailClientProps {
  id: string;
}

const PropertyDetailClient = ({ id }: PropertyDetailClientProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const fetchProperty = async () => {
    try {
      console.log("Fetching property with id:", id);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      console.log("Property fetch result:", { data, error });

      if (error) throw error;
      if (!data) {
        router.push("/stays");
        return;
      }
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", id)
      .maybeSingle();
    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    try {
      if (isFavorite) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", id);
        setIsFavorite(false);
        toast({ title: "Removed from favorites" });
      } else {
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, property_id: id });
        setIsFavorite(true);
        toast({ title: "Added to favorites" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!id) {
      console.warn("PropertyDetailClient mounted with empty id");
      return;
    }
    fetchProperty();
    if (user) checkFavorite();
  }, [id, user]);

  const handleBooking = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: "Select dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
    if (nights <= 0) {
      toast({
        title: "Invalid dates",
        description: "Check-out must be after check-in.",
        variant: "destructive",
      });
      return;
    }

    if (!property) return;

    setBooking(true);
    try {
      const totalPrice = nights * Number(property.price_per_night);
      const { error } = await supabase.from("bookings").insert({
        property_id: property.id,
        guest_id: user.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        total_price: totalPrice,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${property.title} has been booked.`,
      });
      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  const nights =
    checkIn && checkOut
      ? Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn)))
      : 0;
  const totalPrice = property ? nights * Number(property.price_per_night) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const amenitiesList = property.amenities || [
    "WiFi",
    "Kitchen",
    "Air Conditioning",
    "Parking",
    "Pool",
    "Gym",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="text-foreground font-medium">
                    {Number(property.rating).toFixed(1)}
                  </span>
                  <span>({property.review_count ?? 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleFavorite}>
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-2xl overflow-hidden">
            <div className="aspect-4/3 md:aspect-auto md:row-span-2 relative">
              <Image
                src={
                  property.images?.[0] ||
                  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200"
                }
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-4/3 relative">
                  <Image
                    src={
                      property.images?.[i] ||
                      `https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop&q=${
                        60 + i * 10
                      }`
                    }
                    alt={`${property.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Info */}
              <div className="flex items-center gap-6 py-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{property.max_guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">
                  About this place
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description ||
                    "Experience luxury living in this stunning property. Designed with modern comfort in mind, this space offers everything you need for an unforgettable stay. From the moment you arrive, you'll be captivated by the attention to detail and premium amenities."}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-semibold text-foreground">
                    ${Number(property.price_per_night).toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/ night</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-out</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      min={1}
                      max={property.max_guests}
                    />
                  </div>
                </div>

                <Button
                  className="w-full mb-4"
                  onClick={handleBooking}
                  disabled={booking || nights === 0}
                >
                  {booking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {user ? "Reserve" : "Sign in to book"}
                </Button>

                {nights > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${Number(property.price_per_night).toLocaleString()} ×{" "}
                        {nights} nights
                      </span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetailClient;
