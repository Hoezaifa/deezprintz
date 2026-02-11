"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { Minus, Plus, Heart, Share2 } from "lucide-react"

export default function ProductPage() {
    const params = useParams()
    const product = products.find(p => p.id === params.slug)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Container className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                </Container>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-1 py-12">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image Section */}
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-xl bg-secondary border">
                                <img
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-all duration-300"
                                />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <h2 className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{product.category}</h2>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                                <p className="text-2xl font-semibold">PKR {product.price}.00</p>
                            </div>

                            <div className="prose prose-stone mb-8 text-muted-foreground">
                                <p>{product.description}</p>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium">Quantity</span>
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-secondary transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 hover:bg-secondary transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button size="lg" className="flex-1 rounded-full text-lg h-12">
                                        Add to Cart - PKR {product.price * quantity}.00
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="mt-12 space-y-4 border-t pt-8">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    In stock and ready to ship
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    *Actual colors may vary slightly due to monitor settings.
                                </p>
                            </div>

                        </div>
                    </div>
                </Container>
            </main>
        </div>
    )
}
