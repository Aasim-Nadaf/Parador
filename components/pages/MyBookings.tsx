"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  created_at: string;
  properties: {
    id: string;
    title: string;
    location: string;
    images: string[] | null;
  } | null;
}

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          check_in,
          check_out,
          guests,
          total_price,
          status,
          created_at,
          properties (
            id,
            title,
            location,
            images
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load your bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });
      fetchBookings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 container mx-auto px-6 lg:px-12">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">
              No bookings yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and book your first luxury stay!
            </p>
            <Button onClick={() => router.push("/stays")}>
              Browse Properties
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="md:w-72 h-48 md:h-auto">
                    <img
                      src={
                        booking.properties?.images?.[0] ||
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"
                      }
                      alt={booking.properties?.title || "Property"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl text-foreground">
                            {booking.properties?.title || "Property"}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.properties?.location || "Location"}
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gold" />
                            <span>
                              {format(new Date(booking.check_in), "MMM d")} -{" "}
                              {format(
                                new Date(booking.check_out),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gold" />
                            <span>{booking.guests} guests</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-semibold text-foreground">
                          ${Number(booking.total_price).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">total</p>

                        {booking.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
