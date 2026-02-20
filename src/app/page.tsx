import { HeroSection } from "@/components/home/HeroSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
// import { HeroSectionV2 } from "@/components/home/HeroSectionV2";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/container";

import { getProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const FEATURED_PRODUCTS = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      {/* <HeroSectionV2 /> */}

      <CollectionsSection />

      <section className="py-20 relative z-10">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">TRENDING NOW</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-8" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
