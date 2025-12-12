import { Shield, Clock, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description:
      "Every listing is personally inspected and verified by our curation team to ensure exceptional quality.",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description:
      "Secure your dream stay in seconds with our seamless booking experience and instant confirmation.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description:
      "Find a lower price elsewhere? We'll match it and give you an additional 10% off your stay.",
  },
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description:
      "Our dedicated concierge team is available around the clock to assist with any request.",
  },
];

const WhyParador = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
              Why Parador
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Travel with
              <span className="italic block">Complete Confidence</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              We've reimagined luxury travel by combining world-class
              hospitality with cutting-edge technology, ensuring every journey
              exceeds expectations.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-4/5 rounded-3xl overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1687996107372-a0817c9006b2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury resort pool with ocean view"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-background rounded-2xl shadow-2xl p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="Guest"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                    alt="Guest"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                    alt="Guest"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  +50K guests
                </span>
              </div>
              <p className="text-sm text-foreground font-medium">
                "Absolutely incredible experience. Parador made our honeymoon
                truly unforgettable."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                — Sarah & Michael
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyParador;
