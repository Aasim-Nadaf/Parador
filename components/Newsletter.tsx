"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-charcoal text-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-gold-light font-medium mb-3">
            Stay Inspired
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
            Get Exclusive Travel
            <span className="italic block">Inspiration & Offers</span>
          </h2>
          <p className="text-cream/70 text-lg mb-10 max-w-2xl mx-auto">
            Join our community of discerning travelers and receive handpicked
            recommendations, secret destinations, and members-only rates.
          </p>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold-light transition-colors"
                required
              />
              <Button
                type="submit"
                className="bg-gold hover:bg-gold-light text-charcoal px-8 py-4 h-auto rounded-xl font-medium group"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-gold-light">
              <div className="w-10 h-10 rounded-full bg-gold-light/20 flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-lg">
                Thank you! Check your inbox for a welcome gift.
              </p>
            </div>
          )}

          <p className="text-xs text-cream/40 mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
