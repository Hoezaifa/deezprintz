"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@/lib/products"

export interface CartItem extends Product {
    quantity: number
    selectedSize?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product, size?: string, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    cartOpen: boolean
    setCartOpen: (open: boolean) => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [cartOpen, setCartOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addItem = (product: Product, size?: string, quantity: number = 1) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === product.id && item.selectedSize === size)

            if (existingItem) {
                return currentItems.map(item =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }

            return [...currentItems, { ...product, quantity: quantity, selectedSize: size }]
        })
        setCartOpen(true)
    }

    const removeItem = (productId: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            cartOpen,
            setCartOpen,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
