"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ChevronRight, Facebook, Instagram, Youtube, User } from "lucide-react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface SideMenuProps {
    isOpen: boolean
    onClose: () => void
    navLinks: any[]
}

export function SideMenu({ isOpen, onClose, navLinks }: SideMenuProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>("ACCESSORIES")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
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
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Area - Explicit Rendering */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
                            <div className="flex flex-col space-y-4">
                                {navLinks.map((item) => (
                                    <div key={item.name} className="w-full">
                                        {item.subcategories ? (
                                            // Expandable
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => toggleCategory(item.name)}
                                                    className="flex items-center justify-between w-full py-2 text-xl font-bold text-white uppercase tracking-wider hover:text-orange-500 transition-colors"
                                                >
                                                    {item.name}
                                                    <ChevronRight
                                                        className={cn(
                                                            "w-5 h-5 transition-transform duration-200",
                                                            expandedCategory === item.name ? "rotate-90 text-orange-500" : "text-white/50"
                                                        )}
                                                    />
                                                </button>

                                                {/* Subcategories - Direct Render if expanded */}
                                                {expandedCategory === item.name && (
                                                    <div className="flex flex-col pl-4 mt-2 mb-2 space-y-2 border-l border-white/10 ml-1">
                                                        {item.subcategories.map((sub: any) => (
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
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/40">
                            <Link href="/auth/login" onClick={onClose} className="flex items-center gap-4 mb-6 hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">My Account</span>
                                    <span className="text-gray-500 text-xs">Login / Register</span>
                                </div>
                            </Link>

                            <div className="flex gap-6 text-gray-400">
                                <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Youtube className="w-5 h-5 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
