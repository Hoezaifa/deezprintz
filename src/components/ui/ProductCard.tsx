"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StreetwearPlaceholder } from "./StreetwearPlaceholder"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
    id: string
    title: string
    price: number
    image?: string | null
    images?: string[] // Added to support explicit image lists
    category: string
    rating?: number
    href: string
    artist?: string
}

export function ProductCard({ id, title, price, image, images, category, rating = 5, href, artist }: ProductCardProps) {
    const { addItem } = useCart()

    // Determine Secondary Image for Hover Effect
    let secondaryImage: string | null = null;

    if (images && images.length > 1) {
        // If explicit list exists and has more than 1 image, use the second one
        secondaryImage = images[1];
    } else if (image) {
        // Fallback to convention: try to find a -v2 version
        // We can't verify existence easily on client, so we blindly construct it 
        // OR we can rely on the fact that if we don't have explicit images, maybe we don't show hover?
        // User asked: "hover to change image (since i can upload 2 images on any product card)"
        // This implies they will likely populate `images` list or we stick to convention.
        // Let's stick to the convention used in product-client for now if list is empty.

        // Remove extension
        let base = image.replace(/\.[^/.]+$/, "")
        // Remove trailing -v followed by numbers
        base = base.replace(/-v\d+$/, "")

        const ext = image.split('.').pop() || 'jpg';
        secondaryImage = `${base}-v2.${ext}`;
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation to product page
        e.stopPropagation()
        addItem({
            id,
            title,
            price,
            image: image || null,
            category,
            rating
        })
    }

    return (

        <div className="group relative flex flex-col gap-4 p-4 rounded-3xl bg-secondary/20 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-secondary/30 cursor-pointer">
            <Link href={href} className="absolute inset-0 z-10 rounded-3xl" aria-label={`View ${title}`} />

            {/* Image Container with Glow */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Primary Image */}
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover transition-all duration-500 z-10 
                            ${secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-110 group-hover:-rotate-3'}
                        `}
                    />
                ) : (
                    <div className="w-full h-full p-2 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                        <StreetwearPlaceholder type="shirt" className="w-full h-full rounded-xl" />
                    </div>
                )}

                {/* Secondary Image (Absolute, behind or on top?) */}
                {/* We put it absolutely on top but initial opacity 0. When hovered, primary goes op-0 and this goes op-100 */}
                {secondaryImage && (
                    <Image
                        src={secondaryImage}
                        alt={`${title} - View 2`}
                        fill
                        className="object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-3 z-20"
                    />
                )}

                {/* Quick Add Button */}
                <Button
                    size="icon"
                    onClick={handleAddToCart}
                    aria-label="Add to Cart"
                    className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white text-black 
                             hover:bg-white/90 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] z-30
                             opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </div>

            {/* Content */}
            <div className="space-y-1 pointer-events-none">
                {artist && (
                    <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                        {artist}
                    </p>
                )}

                <h3 className="font-bold text-lg leading-tight text-white group-hover:text-primary transition-colors">
                    {title}
                </h3>


                {/* Rating */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < rating ? "fill-white text-white" : "fill-white/20 text-white/20"}`}
                        />
                    ))}
                </div>

                {/* Price */}
                <div className="pt-2 font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                    Rs. {price.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
