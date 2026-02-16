import { PRODUCTS } from "@/lib/products"
import ProductClient from "./product-client"
import { notFound } from "next/navigation"
import { Metadata } from "next"

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

    return {
        title: `${product.title} | Deez Prints`,
        description: `Buy ${product.title} - ${product.category}. Premium streetwear by Deez Prints.`,
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

    return <ProductClient product={product} />
}
