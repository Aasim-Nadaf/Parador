import { ArrowRight, Clock, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const experiences = [
  {
    title: "Private Wine Tasting in Tuscany",
    location: "Florence, Italy",
    duration: "4 hours",
    groupSize: "2-8 guests",
    rating: 4.98,
    reviews: 312,
    price: 195,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    category: "Food & Wine",
  },
  {
    title: "Sunrise Hot Air Balloon Ride",
    location: "Cappadocia, Turkey",
    duration: "3 hours",
    groupSize: "4-16 guests",
    rating: 4.96,
    reviews: 856,
    price: 250,
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
    category: "Adventure",
  },
  {
    title: "Traditional Sushi Making Class",
    location: "Tokyo, Japan",
    duration: "2.5 hours",
    groupSize: "2-6 guests",
    rating: 4.99,
    reviews: 423,
    price: 120,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    category: "Culinary Arts",
  },
  {
    title: "Yacht Sunset Cruise",
    location: "Santorini, Greece",
    duration: "5 hours",
    groupSize: "2-12 guests",
    rating: 4.97,
    reviews: 567,
    price: 350,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    category: "Sailing",
  },
  {
    title: "Safari Game Drive",
    location: "Serengeti, Tanzania",
    duration: "Full day",
    groupSize: "2-6 guests",
    rating: 4.99,
    reviews: 234,
    price: 450,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    category: "Wildlife",
  },
  {
    title: "Private Flamenco Show & Dinner",
    location: "Seville, Spain",
    duration: "3 hours",
    groupSize: "2-10 guests",
    rating: 4.95,
    reviews: 189,
    price: 165,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Culture",
  },
];

const categories = [
  { name: "All", count: 2400 },
  { name: "Food & Wine", count: 456 },
  { name: "Adventure", count: 312 },
  { name: "Culture", count: 567 },
  { name: "Wellness", count: 234 },
  { name: "Wildlife", count: 189 },
];

const Experiences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
              Beyond Accommodation
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Unforgettable Experiences
            </h1>
            <p className="text-muted-foreground text-lg">
              Immerse yourself in authentic local culture with our carefully
              curated experiences led by passionate experts and artisans.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {exp.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{exp.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium text-foreground">
                        {exp.rating}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({exp.reviews})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-foreground">
                        ${exp.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        / person
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="py-16 lg:py-24 bg-charcoal text-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm uppercase tracking-widest text-gold-light font-medium mb-3">
                Signature Experience
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
                Private Chef's Table Experience
              </h2>
              <p className="text-cream/80 mb-6">
                Join our Michelin-starred chef for an intimate culinary journey
                through local markets, followed by a hands-on cooking class and
                multi-course dinner in a historic villa.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gold-light text-2xl font-serif mb-1">
                    8 Hours
                  </p>
                  <p className="text-cream/60 text-sm">Full Day Experience</p>
                </div>
                <div>
                  <p className="text-gold-light text-2xl font-serif mb-1">
                    2-6 Guests
                  </p>
                  <p className="text-cream/60 text-sm">Intimate Group Size</p>
                </div>
                <div>
                  <p className="text-gold-light text-2xl font-serif mb-1">
                    4.99 ★
                  </p>
                  <p className="text-cream/60 text-sm">From 156 Reviews</p>
                </div>
                <div>
                  <p className="text-gold-light text-2xl font-serif mb-1">
                    $495
                  </p>
                  <p className="text-cream/60 text-sm">Per Person</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 bg-cream text-charcoal px-6 py-3 rounded-full font-medium hover:bg-cream/90 transition-colors">
                Book This Experience
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef's table experience"
                className="rounded-3xl object-cover w-full h-[400px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
