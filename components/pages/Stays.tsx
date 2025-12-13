"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  rating: number;
  review_count: number;
  images: string[] | null;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
}

const Stays = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties
    .filter(
      (property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price_per_night) - Number(b.price_per_night);
        case "price-high":
          return Number(b.price_per_night) - Number(a.price_per_night);
        case "rating":
          return Number(b.rating) - Number(a.rating);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our curated collection of luxury properties, from
              beachfront villas to mountain retreats.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium text-foreground mb-2">
                No properties found
              </h2>
              <p className="text-muted-foreground">
                {properties.length === 0
                  ? "No properties available yet. Check back soon!"
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  image={
                    property.images?.[0] ||
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"
                  }
                  title={property.title}
                  location={property.location}
                  price={Number(property.price_per_night)}
                  rating={Number(property.rating)}
                  reviewCount={property.review_count}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stays;
