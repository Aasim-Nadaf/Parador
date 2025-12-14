import { ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Destinations",
  description:
    "Explore the world's most sought-after luxury destinations. From tropical paradises to urban escapes, discover your next extraordinary getaway with Parador.",
  keywords: [
    "luxury destinations",
    "travel destinations",
    "vacation destinations",
    "luxury travel",
    "premium destinations",
    "exotic locations",
    "luxury getaways",
    "top destinations",
    "vacation spots",
  ],
  openGraph: {
    title: "Luxury Destinations | Parador",
    description:
      "Explore the world's most sought-after luxury destinations. From tropical paradises to urban escapes, discover your next extraordinary getaway.",
    url: "https://parador-stays.vercel.app/destinations",
    type: "website",
    images: [
      {
        url: "https://parador-stays.vercel.app/property-1.jpg",
        width: 1200,
        height: 630,
        alt: "Parador Luxury Destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Destinations | Parador",
    description:
      "Explore the world's most sought-after luxury destinations. From tropical paradises to urban escapes.",
    images: ["https://parador-stays.vercel.app/hero-villa.jpg"],
  },
  alternates: {
    canonical: "https://parador-stays.vercel.app/destinations",
  },
};

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    properties: 234,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    description:
      "Iconic white-washed buildings perched on volcanic cliffs overlooking the Aegean Sea.",
  },
  {
    name: "Bali",
    country: "Indonesia",
    properties: 567,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description:
      "Tropical paradise with lush rice terraces, ancient temples, and world-class beaches.",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    properties: 189,
    image:
      "https://plus.unsplash.com/premium_photo-1695735927059-084a7567d303?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Dramatic coastline with colorful villages clinging to steep cliffs above the Mediterranean.",
  },
  {
    name: "Provence",
    country: "France",
    properties: 312,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80",
    description:
      "Rolling lavender fields, medieval hilltop villages, and sun-drenched vineyards.",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    properties: 145,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    description:
      "Pristine overwater villas surrounded by crystal-clear turquoise lagoons.",
  },
  {
    name: "Tuscany",
    country: "Italy",
    properties: 423,
    image:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80",
    description:
      "Rolling hills dotted with cypress trees, Renaissance art, and world-renowned wines.",
  },
  {
    name: "Kyoto",
    country: "Japan",
    properties: 178,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    description:
      "Ancient temples, traditional tea houses, and serene bamboo forests.",
  },
  {
    name: "Côte d'Azur",
    country: "France",
    properties: 256,
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    description:
      "Glamorous French Riviera with azure waters, Belle Époque architecture, and legendary beaches.",
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
              Explore the World
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Curated Destinations
            </h1>
            <p className="text-muted-foreground text-lg">
              From sun-kissed Mediterranean coastlines to lush tropical
              retreats, discover the world's most sought-after locations for
              your next escape.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-card shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-cream/70 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{dest.country}</span>
                    <span className="mx-2">•</span>
                    <span>{dest.properties} properties</span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl text-cream mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-cream/80 text-sm line-clamp-2 mb-4">
                    {dest.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-cream group-hover:text-gold-light transition-colors">
                    <span className="text-sm font-medium">
                      Explore Properties
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Region */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
                Featured Region
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                The Mediterranean
              </h2>
              <p className="text-muted-foreground mb-6">
                Experience the timeless allure of the Mediterranean, where
                ancient history meets modern luxury. From the Greek islands to
                the Italian coastline, discover properties that capture the
                essence of la dolce vita.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Over 1,200 hand-selected properties
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Private beach access and yacht charters
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Exclusive vineyard tours and culinary experiences
                </li>
              </ul>
              <button className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors">
                Explore Mediterranean
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80"
                alt="Mediterranean coast"
                className="rounded-2xl object-cover h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80"
                alt="Mediterranean villa"
                className="rounded-2xl object-cover h-64 w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
