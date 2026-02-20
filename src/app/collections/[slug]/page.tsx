import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { search } = await searchParams;

    // Handle "all" or specific categories
    const category = slug.toLowerCase();
    const searchQuery = typeof search === 'string' ? search.toLowerCase() : '';

    const PRODUCTS = await getProducts();

    // Filter products
    // Logic: If category matches high-level 'category' OR 'subcategory'
    const filteredProducts = PRODUCTS.filter(p => {
        const matchesCategory = category === 'all' || p.category === category || p.subcategory === category;
        const matchesSearch = !searchQuery ||
            p.title.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery) ||
            (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery)) ||
            (p.artist && p.artist.toLowerCase().includes(searchQuery));

        // Global search if on 'all' OR if matches search query generally
        if (searchQuery && category === 'all') return matchesSearch;
        return matchesCategory && matchesSearch;
    });

    const title = searchQuery ? `Search: "${search}"` : category.replace('-', ' ').toUpperCase();

    return (
        <main className="min-h-screen pt-20 pb-20 bg-background text-foreground">
            <Container>
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <h1 className="text-5xl font-bold tracking-tighter text-white glow-text">{title}</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        {searchQuery
                            ? `Found ${filteredProducts.length} results for "${searchQuery}"`
                            : `Explore our exclusive collection of ${title.toLowerCase()}. Premium quality, designed for the streets.`
                        }
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            href={`/products/${product.id}`}
                        />
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center text-muted-foreground">
                            No products found matching your criteria.
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
}
