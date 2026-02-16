"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { Product } from "@/lib/products"
import { supabase } from "@/lib/supabase"
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js"

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

    const [user, setUser] = useState<User | null>(null)

    const loadLocalCart = useCallback(() => {
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

    const loadRemoteCart = useCallback(async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('items')
                .eq('user_id', userId)
                .single()

            if (data && data.items) {
                setItems(data.items)
            } else if (error && error.code !== 'PGRST116') {
                console.error("Error fetching cart:", error)
            }
        } catch (error) {
            console.error("Cart load error:", error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Handle Auth & Initial Load
    useEffect(() => {
        // 1. Check current user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            if (user) {
                loadRemoteCart(user.id)
            } else {
                loadLocalCart()
            }
        })

        // 2. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            const currentUser = session?.user
            setUser(currentUser || null)

            if (currentUser) {
                loadRemoteCart(currentUser.id)
            } else {
                // Determine if we should clear or load local
                // For now, let's load local to support guest mode isolation
                setItems([]) // Clear user items
                loadLocalCart() // Try to load guest items if any (optional)
            }
        })

        return () => subscription.unsubscribe()
    }, [loadLocalCart, loadRemoteCart])

    // Save Cart (Debounced for Remote)
    useEffect(() => {
        if (!isLoaded) return

        if (user) {
            // Save to Supabase
            const saveToDb = setTimeout(async () => {
                try {
                    await supabase.from('carts').upsert({
                        user_id: user.id,
                        items: items,
                        updated_at: new Date().toISOString()
                    })
                } catch (err) {
                    console.error("Failed to save cart to DB", err)
                }
            }, 1000)
            return () => clearTimeout(saveToDb)
        } else {
            // Save to LocalStorage
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, user, isLoaded])

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
