import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Destinations from "@/components/Destinations";
import WhyParador from "@/components/WhyParador";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <Destinations />
      <WhyParador />
      <Newsletter />
      <Footer />
    </main>
  );
}
