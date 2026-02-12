"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, ShoppingCart, Heart, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { Product } from "@/lib/products"
import { StreetwearPlaceholder } from "@/components/ui/StreetwearPlaceholder"
import { useRouter } from "next/navigation"

interface ProductClientProps {
    product: Product
}

const SIZES = ["S", "M", "L", "XL", "XXL"]

export default function ProductClient({ product }: ProductClientProps) {
    const { addItem, setCartOpen } = useCart()
    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState("L")
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    // Mock images (since we don't have real ones yet)
    // We'll use the placeholder logic or repeated product image
    const images = Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        src: product.image, // In reality, these would be different
        alt: `${product.title} View ${i + 1}`
    }))

    const handleAddToCart = () => {
        addItem(product, selectedSize)
        setCartOpen(true)
    }

    const handleBuyNow = () => {
        addItem(product, selectedSize)
        router.push("/checkout")
    }

    const incrementQty = () => setQuantity(q => q + 1)
    const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    return (
        <div className="min-h-screen bg-background text-white pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        {/* Main Image Area */}
                        <div className="relative aspect-square w-full rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-50" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full p-8 flex items-center justify-center"
                                >
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    ) : (
                                        <StreetwearPlaceholder type="shirt" className="w-full h-full" />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Badges/Tags could go here */}
                            {product.category === 'jerseys' && (
                                <div className="absolute top-6 left-6 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    Premium
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx
                                            ? "border-orange-500 ring-2 ring-orange-500/20 scale-95"
                                            : "border-transparent bg-zinc-900/50 hover:bg-zinc-800"
                                        }`}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt="Thumbnail"
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <StreetwearPlaceholder type="shirt" className="w-full h-full scale-75" />
                                        )}
                                    </div>
                                    {/* Mock Color Overlay for "different colors" */}
                                    {idx > 0 && !product.image && (
                                        <div className={`absolute inset-0 mix-blend-overlay opacity-30 ${idx === 1 ? 'bg-red-500' : idx === 2 ? 'bg-blue-500' : 'bg-green-500'
                                            }`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col h-full py-4">
                        <div className="space-y-4 mb-8">
                            {product.artist && (
                                <div className="text-orange-500 font-bold tracking-widest text-sm uppercase">
                                    {product.artist}
                                </div>
                            )}
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 text-2xl font-bold">
                                <span>Rs. {product.price.toLocaleString()}</span>
                                {product.rating >= 4.5 && (
                                    <span className="text-sm font-normal text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
                                        Best Seller
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                            Premium heavyweight cotton blend designed for oversized comfort and street aesthetics.
                            Features high-definition prints and durable construction tailored for the modern fit.
                        </p>

                        <div className="space-y-8 mb-auto">
                            {/* Color Selector (Visual Only for now as requested) */}
                            <div className="space-y-3">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Color</span>
                                <div className="flex flex-wrap gap-3">
                                    {["Black", "White", "Navy", "Charcoal"].map((color, i) => (
                                        <button
                                            key={color}
                                            className={`px-4 py-2 rounded-lg border transition-all ${i === 0 // Default active
                                                    ? "border-orange-500 bg-orange-500/10 text-white"
                                                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                {/* Size Selector */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
                                        <button className="text-xs text-orange-500 hover:underline">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZES.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all border ${selectedSize === size
                                                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                        : "bg-zinc-900 border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="space-y-3">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                                    <div className="flex items-center gap-4 bg-zinc-900 rounded-lg border border-white/10 w-fit p-1">
                                        <button
                                            onClick={decrementQty}
                                            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 disabled:opacity-50"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-mono text-lg w-4 text-center">{quantity}</span>
                                        <button
                                            onClick={incrementQty}
                                            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-white/10">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 text-lg border-white/20 hover:bg-white/10 gap-2"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                            <Button
                                size="lg"
                                className="h-14 text-lg bg-orange-500 hover:bg-orange-600 text-black font-bold gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
