import { PRODUCTS } from "@/lib/products"
import ProductClient from "./product-client"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export const revalidate = 60;

// Force static generation for these paths
export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        slug: product.id,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = PRODUCTS.find((p) => p.id === slug)

    if (!product) {
        return {
            title: "Product Not Found",
        }
    }

    const description = `Buy ${product.title} - Premium ${product.category} by Deez Prints. High-quality streetwear delivered across Pakistan.`;
    const image = product.image || "/assets/logo.png";

    return {
        title: `${product.title} | Deez Prints`,
        description,
        openGraph: {
            title: `${product.title} | Deez Prints`,
            description,
            images: [
                {
                    url: image,
                    width: 800,
                    height: 800,
                    alt: product.title,
                }
            ],
            type: "website",
            siteName: "Deez Prints",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.title} | Deez Prints`,
            description,
            images: [image],
        }
    }
}

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params
    // Ensure we await the params before using slug, and find the product synchronously from the array
    const product = PRODUCTS.find((p) => p.id === slug)

    if (!product) {
        notFound()
    }

    const relatedProducts = PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4)

    const description = `Buy ${product.title} - Premium ${product.category} by Deez Prints. High-quality streetwear delivered across Pakistan.`;
    const image = product.image || "https://deezprints.com/assets/logo.png";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: image,
        description: description,
        brand: {
            "@type": "Brand",
            name: "Deez Prints"
        },
        offers: {
            "@type": "Offer",
            url: `https://deezprints.com/products/${product.id}`,
            priceCurrency: "PKR",
            price: product.price,
            availability: "https://schema.org/InStock",
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductClient product={product} relatedProducts={relatedProducts} />
        </>
    )
}
