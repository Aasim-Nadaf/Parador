"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Home,
  Calendar,
  DollarSign,
  Loader2,
  Pencil,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  is_active: boolean;
  images: string[] | null;
  created_at: string;
}

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
}

const HostDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [maxGuests, setMaxGuests] = useState("2");
  const [bedrooms, setBedrooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate.push("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch host's properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .eq("host_id", user.id)
        .order("created_at", { ascending: false });

      if (propertiesError) throw propertiesError;
      setProperties(propertiesData || []);

      // Fetch bookings for host's properties
      if (propertiesData && propertiesData.length > 0) {
        const propertyIds = propertiesData.map((p) => p.id);
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select(
            `
            id,
            check_in,
            check_out,
            guests,
            total_price,
            status
          `
          )
          .in("property_id", propertyIds)
          .order("created_at", { ascending: false });

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("property-images").getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
      toast({
        title: "Images uploaded",
        description: `${uploadedUrls.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateProperty = async () => {
    if (!user) return;

    if (!title || !location || !pricePerNight) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("properties").insert({
        host_id: user.id,
        title,
        location,
        description,
        price_per_night: parseFloat(pricePerNight),
        max_guests: parseInt(maxGuests),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        images: images.length > 0 ? images : null,
        is_active: true,
      });

      if (error) throw error;

      toast({
        title: "Property created!",
        description: "Your listing is now live.",
      });

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        title: "Error",
        description: "Failed to create property.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (error) throw error;

      toast({ title: "Property deleted" });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property.",
        variant: "destructive",
      });
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);

      if (error) throw error;

      toast({ title: `Booking ${status}` });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setDescription("");
    setPricePerNight("");
    setMaxGuests("2");
    setBedrooms("1");
    setBathrooms("1");
    setImages([]);
  };

  const totalEarnings = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + Number(b.total_price), 0);

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Host Dashboard
          </h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  Create New Listing
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-4">
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {images.map((url, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden group"
                          >
                            <img
                              src={url}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Images
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Upload up to 10 images (JPG, PNG, WebP)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Stunning Ocean View Villa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Malibu, California"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per night ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="250"
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Max guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreateProperty}
                  disabled={saving}
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Listing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl">
                <Home className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-semibold">
                  {properties.filter((p) => p.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl">
                <Calendar className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-semibold">{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl">
                <DollarSign className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-semibold">
                  ${totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties */}
        <section className="mb-12">
          <h2 className="font-serif text-xl text-foreground mb-6">
            Your Properties
          </h2>
          {properties.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No properties yet. Create your first listing!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="aspect-video relative">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {property.title}
                      </h3>
                      <Badge
                        variant={property.is_active ? "default" : "secondary"}
                      >
                        {property.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        ${Number(property.price_per_night).toLocaleString()}
                        /night
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteProperty(property.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Bookings */}
        <section>
          <h2 className="font-serif text-xl text-foreground mb-6">
            Recent Bookings
          </h2>
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bookings yet.</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Guest
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Dates
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-border">
                        <td className="p-4">Guest</td>
                        <td className="p-4 text-sm">
                          {booking.check_in} → {booking.check_out}
                        </td>
                        <td className="p-4 font-medium">
                          ${Number(booking.total_price).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "pending"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateBookingStatus(booking.id, "confirmed")
                                }
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateBookingStatus(booking.id, "declined")
                                }
                              >
                                Decline
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HostDashboard;
