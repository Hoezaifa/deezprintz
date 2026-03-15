"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"
import { motion, AnimatePresence } from "framer-motion"

const SLIDES = [
    {
        id: "acid-wash",
        badge: "NEW DROP",
        title1: "ACID WASH",
        title2: "COLLECTION",
        description: "Vintage Texture. Heavy Cotton.",
        href: "/collections/acid-wash",
        image: "/images/generated/acid_wash_vibe.png" // AI Generated Aesthetic Image
    },
    {
        id: "tees",
        badge: "ESSENTIALS",
        title1: "PREMIUM",
        title2: "TEES",
        description: "240 GSM. Statement Graphics.",
        href: "/collections/t-shirts",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773573578/regulars_vtmc2k.webp")
    },
    {
        id: "drop-shoulder",
        badge: "RELAXED",
        title1: "DROP",
        title2: "SHOULDER",
        description: "Everyday Wear. Effortless Style.",
        href: "/collections/drop-shoulder",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773574932/drp_btiwfr.webp")
    }
]

export function WhyDeezPrintsSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
        } else if (info.offset.x < -100) {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
        }
    }

    return (
        <section className="py-10 bg-background relative z-10" suppressHydrationWarning>
            <Container>
                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-4 md:mb-8">
                    <div className="h-px w-10 md:w-32 bg-white/20 hidden sm:block" />
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#FF5900] uppercase text-center glow-text-orange" style={{ fontFamily: "var(--font-bebas)" }}>
                        <span className="text-white">WHY DEEZ </span>PRINTS
                    </h2>
                    <div className="h-px w-10 md:w-32 bg-white/20 hidden sm:block" />
                </div>

                {/* Features Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mb-8 md:mb-12">
                    {/* Feature 1 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                <line x1="9" y1="9" x2="9.01" y2="9"/>
                                <line x1="15" y1="9" x2="15.01" y2="9"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                240 GSM COTTON
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Premium Feel
                            </span>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m14.5 4-5 5a2 2 0 0 0-2.8 2.8l3 3a2 2 0 0 0 2.8-2.8l5-5"/>
                                <path d="m5 16-1 4 4-1"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                HIGH DETAIL PRINTS
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Long Lasting
                            </span>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.38 3.46 16 2a8.86 8.86 0 0 1-5 0l-4.38 1.46A2 2 0 0 0 5 5.36v.92c0 .92.37 1.8.18 2.65L4.4 11H2m18 0h-2.4l-.78 2.07c-.19.85.18 1.73.18 2.65v.92c0 1.43-1.04 2.66-2.45 2.86L10 20.3V22h4v-1.7l4.63-.8c1.4-.2 2.45-1.43 2.45-2.86v-.92c0-.92-.37-1.8-.18-2.65L21.6 11Z"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                OVERSIZED FIT
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Drop Shoulder
                            </span>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-[#FF5900] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                LIMITED DROPS
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Every Season
                            </span>
                        </div>
                    </div>
                </div>

                {/* Slider Banner */}
                <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] min-h-[300px] md:h-[280px] group flex flex-col md:flex-row">
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="absolute inset-0 flex flex-col md:flex-row cursor-grab active:cursor-grabbing"
                        >
                            {/* Background Overlay Component for Mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:hidden z-10" />

                            {/* Background Image Container */}
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={SLIDES[currentSlide].image}
                                    alt={SLIDES[currentSlide].title1}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 md:opacity-50"
                                    sizes="100vw"
                                />
                                {/* Gradient Overlay to ensure text readability */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 md:via-[#0a0a0a]/60 to-transparent z-10" />
                            </div>

                            {/* Content Section */}
                            <div className="relative z-20 h-full flex flex-col justify-end md:justify-center px-6 py-10 md:p-12 lg:p-16 w-full md:max-w-xl">
                                <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 md:mb-4 opacity-70">
                                    {SLIDES[currentSlide].badge}
                                </span>
                                
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-2 md:mb-3 flex flex-wrap gap-2">
                                    <span>{SLIDES[currentSlide].title1}</span> 
                                    <span className="font-light text-white/90">{SLIDES[currentSlide].title2}</span>
                                </h3>
                                
                                <p className="text-xs md:text-sm lg:text-base font-normal tracking-wide text-white/60 mb-8 max-w-sm">
                                    {SLIDES[currentSlide].description}
                                </p>
                                
                                <div>
                                    <Link 
                                        href={SLIDES[currentSlide].href}
                                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-transparent text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                                    >
                                        SHOP NOW
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Navigation Dots */}
                    <div className="absolute bottom-6 right-8 md:right-12 z-30 flex gap-2">
                        {SLIDES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
