"use client"

import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { StreetwearPlaceholder } from "@/components/ui/StreetwearPlaceholder"

export function CartSidebar() {
    const { cartOpen, setCartOpen, items, removeItem, updateQuantity, cartTotal } = useCart()

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                YOUR CART
                            </h2>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <ShoppingBag className="w-16 h-16" />
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                    <Button onClick={() => setCartOpen(false)} variant="outline">
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                                        {/* Image */}
                                        <div className="relative w-24 h-24 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <StreetwearPlaceholder type="shirt" className="w-full h-full" />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-white line-clamp-2">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{item.selectedSize || "One Size"} | {item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-1 border border-white/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="hover:text-white transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-mono w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="hover:text-white transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Subtotal</span>
                                    <span>Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Shipping & taxes calculated at checkout
                                </p>
                                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                                    <Button className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                                        CHECKOUT
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
