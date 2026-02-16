"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ChevronRight, Facebook, Instagram, Youtube, User } from "lucide-react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface SubCategory {
    name: string
    href: string
}

interface NavLink {
    name: string
    href: string
    subcategories?: SubCategory[]
}

interface SideMenuProps {
    isOpen: boolean
    onClose: () => void
    navLinks: NavLink[]
    user: any // Keeping user as any for now to avoid large refactor chain, or User | null
    onLogout: () => void
}

export function SideMenu({ isOpen, onClose, navLinks, user, onLogout }: SideMenuProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>("ACCESSORIES")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const toggleCategory = (name: string) => {
        if (expandedCategory === name) {
            setExpandedCategory(null)
        } else {
            setExpandedCategory(name)
        }
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sidebar / Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 left-0 bottom-0 z-[9999] w-[350px] max-w-[85vw] bg-zinc-950/95 border-r border-white/10 h-full shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <span className="text-xl font-bold tracking-tighter text-white">MENU</span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Area - Explicit Rendering */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
                            <div className="flex flex-col space-y-4">
                                {navLinks.map((item) => {
                                    if (item.name === "ACCESSORIES" && item.subcategories) {
                                        // Flatten Accessories for Side Menu
                                        return item.subcategories.map((sub: SubCategory) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                onClick={onClose}
                                                className="block w-full py-2 text-xl font-bold text-white uppercase tracking-wider hover:text-orange-500 transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))
                                    }

                                    return (
                                        <div key={item.name} className="w-full">
                                            {item.subcategories ? (
                                                // Expandable (For other categories if any)
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() => toggleCategory(item.name)}
                                                        className="flex items-center justify-between w-full py-2 text-xl font-bold text-white uppercase tracking-wider hover:text-orange-500 transition-colors cursor-pointer"
                                                    >
                                                        {item.name}
                                                        <ChevronRight
                                                            className={cn(
                                                                "w-5 h-5 transition-transform duration-200",
                                                                expandedCategory === item.name ? "rotate-90 text-orange-500" : "text-white/50"
                                                            )}
                                                        />
                                                    </button>

                                                    {/* Subcategories */}
                                                    {expandedCategory === item.name && (
                                                        <div className="flex flex-col pl-4 mt-2 mb-2 space-y-2 border-l border-white/10 ml-1">
                                                            {item.subcategories.map((sub: SubCategory) => (
                                                                <Link
                                                                    key={sub.name}
                                                                    href={sub.href}
                                                                    onClick={onClose}
                                                                    className="text-base text-gray-400 hover:text-white py-1 block transition-colors"
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // Simple Link
                                                <Link
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="block w-full py-2 text-xl font-bold text-white uppercase tracking-wider hover:text-orange-500 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/40">
                            <Link href={user ? "#" : "/auth/login"} onClick={user ? undefined : onClose} className="flex items-center gap-4 mb-6 hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    {user ? (
                                        <>
                                            <span className="text-white font-bold text-sm">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'User'}</span>
                                            <button onClick={onLogout} className="text-left text-red-500 text-xs hover:text-red-400">Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-white font-bold text-sm">My Account</span>
                                            <span className="text-gray-500 text-xs">Login / Register</span>
                                        </>
                                    )}
                                </div>
                            </Link>

                            <div className="flex gap-6 text-gray-400">
                                <Link href="https://www.facebook.com/profile.php?id=61556303432172" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" />
                                </Link>
                                <Link href="https://www.instagram.com/deez_prints/" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
