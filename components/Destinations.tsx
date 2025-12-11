import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    properties: 234,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
  {
    name: "Bali",
    country: "Indonesia",
    properties: 567,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    properties: 189,
    image:
      "https://images.unsplash.com/photo-1534113414509-0eec2bfb493a?w=800&q=80",
  },
  {
    name: "Provence",
    country: "France",
    properties: 312,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80",
  },
];

const Destinations = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
            Explore
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From sun-kissed Mediterranean coastlines to lush tropical retreats,
            discover the world's most sought-after locations.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Large Featured Card */}
          <div className="lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer">
            <img
              src={destinations[0].image}
              alt={`${destinations[0].name}, ${destinations[0].country}`}
              className="w-full h-full min-h-[400px] lg:min-h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-cream/70 text-sm uppercase tracking-wider mb-2">
                {destinations[0].properties} properties
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-cream mb-2">
                {destinations[0].name}
              </h3>
              <p className="text-cream/80">{destinations[0].country}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-cream group-hover:text-gold-light transition-colors">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Smaller Cards */}
          {destinations.slice(1).map((dest, index) => (
            <div
              key={dest.name}
              className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[280px]"
            >
              <img
                src={dest.image}
                alt={`${dest.name}, ${dest.country}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-cream/70 text-xs uppercase tracking-wider mb-1">
                  {dest.properties} properties
                </p>
                <h3 className="font-serif text-2xl text-cream mb-1">
                  {dest.name}
                </h3>
                <p className="text-cream/80 text-sm">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
