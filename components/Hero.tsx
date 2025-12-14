"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-villa.jpg";
import Image from "next/image";

const Hero = () => {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState<"stays" | "experiences">("stays");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    if (guests > 1) params.set("guests", guests.toString());

    if (activeTab === "stays") {
      navigate.push(`/stays?${params.toString()}`);
    } else {
      navigate.push(`/experiences?${params.toString()}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Luxury villa with infinity pool overlooking the Mediterranean sea at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            Discover Your Next
            <span className="block italic text-gold-light">
              Extraordinary Escape
            </span>
          </h1>

          <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 stagger-2">
            Handpicked luxury villas, boutique stays, and unforgettable
            experiences curated for the discerning traveler.
          </p>

          {/* Search Card */}
          <div className="bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 animate-fade-up opacity-0 stagger-3">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 bg-muted rounded-xl w-fit mx-auto">
              <button
                onClick={() => setActiveTab("stays")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "stays"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Stays
              </button>
              <button
                onClick={() => setActiveTab("experiences")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "experiences"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Experiences
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
              {/* Destination */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <div className="text-left flex-1">
                  <p className="text-xs text-muted-foreground">Where</p>
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Search destinations"
                    className="border-0 p-0 h-auto text-sm font-medium bg-transparent focus-visible:ring-0 placeholder:text-foreground/60"
                  />
                </div>
              </div>

              {/* Check In */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <Calendar className="h-5 w-5 text-accent shrink-0" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Check in</p>
                      <p className="text-sm font-medium text-foreground">
                        {checkIn ? format(checkIn, "MMM d, yyyy") : "Add dates"}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              {/* Check Out */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <Calendar className="h-5 w-5 text-accent shrink-0" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Check out</p>
                      <p className="text-sm font-medium text-foreground">
                        {checkOut
                          ? format(checkOut, "MMM d, yyyy")
                          : "Add dates"}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              {/* Guests */}
              <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer md:pr-2">
                    <Users className="h-5 w-5 text-accent shrink-0" />
                    <div className="text-left flex-1">
                      <p className="text-xs text-muted-foreground">Guests</p>
                      <p className="text-sm font-medium text-foreground">
                        {guests} {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 w-10 rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch();
                      }}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">Guests</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {guests}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.min(16, guests + 1))}
                        disabled={guests >= 16}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 animate-fade-up opacity-0 stagger-4">
            <div className="text-center">
              <p className="text-3xl font-serif text-cream">10K+</p>
              <p className="text-sm text-cream/60">Curated Properties</p>
            </div>
            <div className="h-8 w-px bg-cream/20 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-serif text-cream">150+</p>
              <p className="text-sm text-cream/60">Destinations</p>
            </div>
            <div className="h-8 w-px bg-cream/20 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-serif text-cream">50K+</p>
              <p className="text-sm text-cream/60">Happy Travelers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cream/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cream/80 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
