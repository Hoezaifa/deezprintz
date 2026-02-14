import { HeroSection } from "@/components/home/HeroSection";
// import { HeroSectionV2 } from "@/components/home/HeroSectionV2";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/container";

import { PRODUCTS } from "@/lib/products";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      {/* <HeroSectionV2 /> */}

      <section className="py-20 relative z-10">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">TRENDING NOW</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                href={`/products/${product.id}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
