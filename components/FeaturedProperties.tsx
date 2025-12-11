import PropertyCard from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const properties = [
  {
    image: property1.src,
    title: "Mountain Retreat with Panoramic Views",
    location: "Aspen, Colorado",
    price: 890,
    rating: 4.97,
    reviewCount: 124,
    type: "Entire Villa",
    isSuperhost: true,
  },
  {
    image: property2.src,
    title: "Overwater Bungalow Paradise",
    location: "Maldives",
    price: 1250,
    rating: 4.99,
    reviewCount: 89,
    type: "Private Island",
    isSuperhost: true,
  },
  {
    image: property3.src,
    title: "Luxury Forest A-Frame Cabin",
    location: "Lake Tahoe, California",
    price: 425,
    rating: 4.92,
    reviewCount: 256,
    type: "Entire Cabin",
    isSuperhost: false,
  },
  {
    image: property4.src,
    title: "Historic Tuscan Estate",
    location: "Florence, Italy",
    price: 1875,
    rating: 4.98,
    reviewCount: 67,
    type: "Entire Estate",
    isSuperhost: true,
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
              Featured Stays
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Handpicked for You
            </h2>
          </div>
          <a
            href="/stays"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
          >
            View all properties →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.title}
              className="animate-fade-up opacity-0"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
