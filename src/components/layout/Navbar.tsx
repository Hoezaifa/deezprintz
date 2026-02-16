"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { SideMenu } from "@/components/layout/SideMenu"
import { supabase } from "@/lib/supabase"
import { PRODUCTS, Product, getProducts } from "@/lib/products"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

const navLinks = [
    {
        name: "T-SHIRTS",
        href: "/collections/t-shirts",
        subcategories: [
            { name: "Regular Fit", href: "/collections/regular" },
            { name: "Drop Shoulder", href: "/collections/drop-shoulder" },
            { name: "Acid Wash", href: "/collections/acid-wash" }
        ]
    },
    { name: "HOODIES", href: "/collections/hoodies" },
    { name: "JERSEYS", href: "/collections/jerseys" },
    {
        name: "ACCESSORIES",
        href: "/collections/accessories",
        subcategories: [
            { name: "Mugs", href: "/collections/mugs" },
            { name: "Flags", href: "/collections/flags" },
            { name: "Tapestries", href: "/collections/tapestries" },
            { name: "Wristbands", href: "/collections/wristbands" },
            { name: "Badges", href: "/collections/badges" },
            { name: "Wallet Cards", href: "/collections/wallet-cards" },
            { name: "Keychains", href: "/collections/keychains" },
            { name: "Magnets", href: "/collections/magnets" },
            { name: "Notebooks", href: "/collections/notebooks" },
            { name: "Corporate Gift Boxes", href: "/collections/gift-boxes" }
        ]
    },
]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const { setCartOpen, cartCount } = useCart()
    const router = useRouter()

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                router.push(`/collections/all?search=${encodeURIComponent(searchQuery.trim())}`)
                setSearchQuery("")
            }
        }
    }

    // Auth State
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.reload()
    }

    // Search Logic
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts()
            setProducts(data)
        }
        loadProducts()
    }, [])

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return []
        const query = searchQuery.toLowerCase()
        return products.filter((product: Product) =>
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.subcategory?.toLowerCase().includes(query) ||
            product.artist?.toLowerCase().includes(query)
        ).slice(0, 5) // Limit to 5 results
    }, [searchQuery, products])

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
            <Container className="flex h-20 items-center">

                {/* Left: Menu Button & Logo */}
                <div className="flex-1 flex items-center justify-start gap-4">
                    <button
                        className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 relative z-10">
                        {/* Using standard img to ensure visibility */}
                        <img
                            src="/assets/logo.png"
                            alt="Deez Prints"
                            className="w-auto h-12 object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Nav - Centered in remaining space (effectively centered if sides are balanced) */}
                <nav className="hidden lg:flex items-center justify-center gap-6">
                    {navLinks.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => setOpenDropdown(item.name)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className="px-4 py-2 text-sm font-bold tracking-widest text-muted-foreground hover:text-white transition-colors duration-300 relative z-10 block whitespace-nowrap"
                            >
                                {item.name}
                            </Link>

                            {/* Hover Highlight */}
                            <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />

                            {/* Dropdown */}
                            {item.subcategories && (
                                <AnimatePresence>
                                    {openDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 p-2"
                                        >
                                            {item.subcategories.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex-1 flex items-center justify-end gap-4 z-10">
                    <div className="relative hidden xl:flex items-center">
                        <div className="flex items-center bg-secondary/50 rounded-full px-4 py-2 border border-white/10 relative z-20">
                            <Search className="h-4 w-4 text-muted-foreground mr-2" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground w-20 focus:w-32 transition-all duration-300"
                            />
                        </div>

                        {/* Real-time Search Dropdown */}
                        <AnimatePresence>
                            {searchQuery && filteredProducts.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
                                >
                                    <div className="p-2">
                                        {filteredProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors group"
                                                onClick={() => setSearchQuery("")}
                                            >
                                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
                                                    <Image
                                                        src={product.image || '/assets/placeholder.jpg'}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-white truncate group-hover:text-orange-500 transition-colors">
                                                        {product.title}
                                                    </h4>
                                                    <p className="text-xs text-zinc-500 truncate">{product.artist || product.category}</p>
                                                </div>
                                                <div className="text-sm font-bold text-zinc-400">
                                                    Rs. {product.price.toLocaleString()}
                                                </div>
                                            </Link>
                                        ))}
                                        <Link
                                            href={`/collections/all?search=${encodeURIComponent(searchQuery)}`}
                                            className="block text-center text-xs text-orange-500 hover:text-orange-400 py-2 border-t border-white/5 mt-1"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            View all results
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-white/10 text-white rounded-full"
                        onClick={() => setCartOpen(true)}
                        aria-label="Open Cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        )}
                    </Button>



                    {/* User Auth */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-white dark:text-white text-black leading-none">{user.user_metadata?.full_name || 'My Account'}</p>
                                <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300">
                                    Logout
                                </button>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold">
                                {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth/login" aria-label="Login">
                            <Button variant="ghost" size="icon" className="hover:bg-white/10 text-black dark:text-white rounded-full" aria-label="User Account">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                </div>
            </Container>

            {/* Side Menu */}
            <SideMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                navLinks={navLinks}
                user={user}
                onLogout={handleLogout}
            />
        </header>
    )
}

