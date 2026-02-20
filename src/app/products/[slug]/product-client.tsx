"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, ShoppingCart, Heart, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { Product } from "@/lib/products"
import { StreetwearPlaceholder } from "@/components/ui/StreetwearPlaceholder"
import { Accordion } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/ui/ProductCard"

interface ProductClientProps {
    product: Product
    relatedProducts: Product[]
}

const SIZES = ["S", "M", "L", "XL", "XXL"]
const TAPESTRY_SIZES = ["24\"x36\"", "36\"x48\"", "48\"x60\""]

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
    const { addItem, setCartOpen } = useCart()
    const router = useRouter()

    const isTapestry = product.subcategory === 'tapestries'

    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Black")
    // Determine initial size based on category
    const initialSize =
        product.subcategory === 'tapestries' ? "36\"x48\"" :
            product.subcategory === 'flags' ? "36\"x48\"" :
                "L";

    const [selectedSize, setSelectedSize] = useState(initialSize)

    // Quantity state (defaults to 1, or first bulk option qty)
    const initialQty = product.bulkOptions ? product.bulkOptions[0].qty : 1;
    const [quantity, setQuantity] = useState(initialQty)

    const [activeImage, setActiveImage] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const [currentPrice, setCurrentPrice] = useState(product.price)

    // Handle hydration mismatch for animations
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Update Price based on Size or Bulk Selection
    useEffect(() => {
        if (product.sizePricing && product.sizePricing[selectedSize]) {
            setCurrentPrice(product.sizePricing[selectedSize])
        } else if (product.bulkOptions) {
            const option = product.bulkOptions.find(o => o.qty === quantity)
            if (option) {
                setCurrentPrice(option.pricePerItem * quantity)
            } else {
                setCurrentPrice(product.price * quantity)
            }
        } else {
            setCurrentPrice(product.price)
        }
    }, [selectedSize, quantity, product])


    // Generate distinct image paths for the gallery
    const images = product.images && product.images.length > 0
        ? product.images.map((src, i) => ({
            id: i,
            src: src,
            alt: `${product.title} View ${i + 1}`
        }))
        : (isTapestry
            ? [{ id: 0, src: product.image, alt: product.title }]
            : Array.from({ length: 5 }).map((_, i) => {
                if (!product.image) return { id: i, src: null, alt: "Placeholder" }

                // Remove existing extension and suffix if any, then append new suffix
                // We assume product.image is the "base" path or one of the variants
                // If product.image is "/assets/.../shirt-v1.jpg", we want "/assets/.../shirt-v1.jpg", "...-v2.jpg" etc.

                // Remove extension first
                let base = product.image.replace(/\.[^/.]+$/, "")
                // Remove trailing -v followed by numbers like -v1, -v2 if they exist
                base = base.replace(/-v\d+$/, "")

                const ext = product.image.split('.').pop() || 'jpg';
                const src = `${base}-v${i + 1}.${ext}`;

                return {
                    id: i,
                    src,
                    alt: `${product.title} View ${i + 1}`
                }
            })
        )

    const handleAddToCart = () => {
        const specificImage = images[activeImage]?.src || product.image;

        // Use specific details for the Cart Item ID to allow multiple variants
        // For Bulk items, the ID should include the qty to separate different bulk packs if needed
        const cartId = `${product.id}-${selectedColor}-${selectedSize}-${quantity}`

        // Pass specific image and color to addItem
        addItem({ ...product, id: cartId }, selectedSize, quantity, selectedColor, specificImage!)
        setCartOpen(true)
    }

    const handleBuyNow = () => {
        const specificImage = images[activeImage]?.src || product.image;
        const cartId = `${product.id}-${selectedColor}-${selectedSize}-${quantity}`
        addItem({ ...product, id: cartId }, selectedSize, quantity, selectedColor, specificImage!)
        router.push("/checkout")
    }

    const incrementQty = () => setQuantity(q => q + 1)
    const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    // Helpers to determine what to show
    const showColorSelector = product.colors && product.colors.length > 0;

    const showSizeSelector =
        (product.category === 't-shirts') ||
        (product.category === 'hoodies') ||
        (product.subcategory === 'tapestries') ||
        (product.subcategory === 'flags');

    const availableSizes =
        product.subcategory === 'tapestries' || product.subcategory === 'flags'
            ? TAPESTRY_SIZES
            : SIZES;

    const showQuantitySelector = !product.bulkOptions;
    const showBulkSelector = !!product.bulkOptions;

    // Custom text content helpers
    const getMaterialsText = () => {
        if (product.subcategory === 'mugs') {
            return (
                <ul className="list-disc list-inside space-y-1">
                    <li>Material: High-grade, heat-resistant Ceramic with a premium Polymer Coating.</li>
                    <li>Finish: High-gloss white for vibrant, full-color reproduction.</li>
                    <li>Durability: Fade-resistant, scratch-resistant, and built for daily use.</li>
                    <li>Capacity: Standard 11oz (325ml) — the perfect size for coffee, tea, or hot cocoa.</li>
                </ul>
            )
        }
        if (product.subcategory === 'wristbands') {
            return <p>High-quality, durable silicone wristbands with long-lasting screen printing.</p>
        }
        if (product.subcategory === 'badges') {
            return <p>2.25 inch round button badges with glossy protective film and secure pin back.</p>
        }
        if (product.subcategory === 'wallet-cards') {
            return <p>Standard ATM size PVC/ cards. Durable, waterproof, and fits perfectly in any wallet.</p>
        }
        if (product.category === 'hoodies') {
            return (
                <ul className="list-disc list-inside space-y-1">
                    <li>High GSM Cotton Fleece Fabric</li>
                    <li>Warm fabric for winters</li>
                    <li>DTF Prints - Washable and Super Long Lasting</li>
                    <li>The Print/Design size varies as per design, proportionally</li>
                    <li>The color of hoodie and print might vary tad bit from original</li>
                </ul>
            )
        }
        return (
            <ul className="list-disc list-inside space-y-1">
                <li>High GSM Fabric</li>
                <li>Direct to Film prints (washable and durable)</li>
                <li>The Print/Design size on the shirt varies as per design, proportionally</li>
                <li>The color of Tshirts and print might vary tad bit from original</li>
            </ul>
        )
    }

    const getCareText = () => {
        if (product.subcategory === 'mugs') {
            return <p>Microwave and dishwasher safe (top rack recommended).</p>
        }
        return (
            <ul className="list-disc list-inside space-y-1">
                <li>Hand wash inside out</li>
                <li>Iron inside out</li>
                <li>Do not bleach</li>
            </ul>
        )
    }

    return (
        <div className="min-h-screen bg-background text-white pt-12 md:pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        {/* Main Image Area */}
                        <div className="relative aspect-square w-full rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-50" />

                            {isMounted ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full p-8 flex items-center justify-center"
                                    >
                                        {images[activeImage]?.src ? (
                                            <Image
                                                src={images[activeImage].src!}
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
                            ) : (
                                /* Static render for SSR/Correction to avoid hydration mismatch */
                                <div className="w-full h-full p-8 flex items-center justify-center">
                                    {images[0]?.src ? (
                                        <Image
                                            src={images[0].src!}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    ) : (
                                        <StreetwearPlaceholder type="shirt" className="w-full h-full" />
                                    )}
                                </div>
                            )}

                            {/* Badges/Tags could go here */}
                            {product.category === 'jerseys' && (
                                <div className="absolute top-6 left-6 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    Premium
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 md:gap-4 mt-4 md:mt-0">
                                {images.slice(0).map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImage(img.id)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img.id
                                            ? "border-orange-500 ring-2 ring-orange-500/20 scale-95"
                                            : "border-transparent bg-zinc-900/50 hover:bg-zinc-800"
                                            }`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center p-2">
                                            {img.src ? (
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <StreetwearPlaceholder type="shirt" className="w-full h-full scale-75" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col h-full py-0 md:py-4 mt-2 md:mt-0">
                        <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
                            {product.artist && (
                                <div className="text-orange-500 font-bold tracking-widest text-sm uppercase">
                                    {product.artist}
                                </div>
                            )}
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4 text-xl md:text-2xl font-bold">
                                    <span>Rs. {currentPrice.toLocaleString()}</span>
                                    {product.rating >= 4.5 && (
                                        <span className="text-sm font-normal text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
                                            Best Seller
                                        </span>
                                    )}
                                </div>
                                {/* Trust Indicators */}
                                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground font-medium">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Premium Material
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 7 Day Return Policy
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> All Over Pakistan Delivery
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 mb-auto">
                            {/* Color Selector */}
                            {showColorSelector && (
                                <div className="space-y-3">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Color</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors!.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-4 py-2 rounded-lg border transition-all ${selectedColor === color
                                                    ? "border-orange-500 bg-orange-500/10 text-white"
                                                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Size Selector */}
                                {showSizeSelector && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
                                            <button className="text-xs text-orange-500 hover:underline">Size Guide</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {availableSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`min-w-12 h-12 px-2 rounded-lg flex items-center justify-center font-bold transition-all border ${selectedSize === size
                                                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                        : "bg-zinc-900 border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector (Standard) */}
                                {showQuantitySelector && (
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
                                )}
                            </div>

                            {/* Bulk Options Selector */}
                            {showBulkSelector && (
                                <div className="space-y-3">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Quantity Pack</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.bulkOptions!.map((opt) => (
                                            <button
                                                key={opt.qty}
                                                onClick={() => setQuantity(opt.qty)}
                                                className={`px-4 py-3 rounded-xl border flex flex-col items-center min-w-[100px] transition-all ${quantity === opt.qty
                                                    ? "border-orange-500 bg-orange-500/10 text-white"
                                                    : "border-white/10 bg-zinc-900/50 text-gray-400 hover:border-white/30 hover:text-white"
                                                    }`}
                                            >
                                                <span className="text-xl font-bold">{opt.qty}</span>
                                                <span className="text-xs opacity-70">Rs. {opt.pricePerItem}/ea</span>
                                                <span className="text-xs font-bold text-orange-400 mt-1">Total: {opt.qty * opt.pricePerItem}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
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

                        {/* Product Description */}
                        <p className="text-gray-400 leading-relaxed mt-10 mb-6 text-base md:text-lg">
                            {product.category === 'accessories'
                                ? "Premium accessory designed with durability and aesthetics in mind. Perfect for gifts or personal collection."
                                : "Premium heavyweight cotton blend designed for oversized comfort and street aesthetics. Features high-definition prints and durable construction tailored for the modern fit."
                            }
                        </p>

                        {/* Expandable Sections */}
                        <div className="mt-8 space-y-2">
                            <Accordion title="Materials & Details">
                                {getMaterialsText()}
                            </Accordion>

                            <Accordion title="Shipping Information">
                                <p>
                                    Standard delivery time is 4-7 working days and 2-4 working days for Karachi. You’ll get a confirmation call from us, once the order is confirmed verbally with mutual understanding then 4-7 working days of delivery will be counted.
                                </p>
                            </Accordion>

                            <Accordion title="Refund & Exchange">
                                <p className="mb-4">
                                    We don&apos;t have any return or exchange policy on size issues, nor there are any refund policy otherwise. So, please refer to our size chart before ordering.
                                </p>
                                <p>
                                    If there&apos;s a defect in your product, we will exchange the product with new one. Mail us at <a href="mailto:deezprints69@gmail.com" className="text-orange-500 hover:underline">deezprints69@gmail.com</a>.
                                </p>
                            </Accordion>

                            <Accordion title="Care Instructions">
                                {getCareText()}
                            </Accordion>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 border-t border-white/10 pt-16">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">YOU MAY ALSO LIKE</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent ml-8" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                    href={`/products/${product.id}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
