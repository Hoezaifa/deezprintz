"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"
import { motion, AnimatePresence } from "framer-motion"

const SLIDES = [
    {
        id: "tees",
        title1: "BUILT FOR",
        title2: "PRESENCE",
        description: "PREMIUM COTTON. OVERSIZED FIT. STATEMENT GRAPHICS.",
        buttonText: "EXPLORE TEES",
        href: "/collections/t-shirts",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773571102/place_d2aqxn.webp")
    },
    {
        id: "drop-shoulder",
        title1: "BUILT FOR",
        title2: "COMFORT",
        description: "RELAXED SHOULDERS. EVERYDAY WEAR. EFFORTLESS STYLE.",
        buttonText: "SHOP DROP SHOULDER",
        href: "/collections/drop-shoulder",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773574932/drp_btiwfr.webp")
    },
    {
        id: "acid-wash",
        title1: "BUILT FOR",
        title2: "TEXTURE",
        description: "VINTAGE WASH. HEAVYWEIGHT FEEL. UNIQUE FINISH.",
        buttonText: "VIEW ACID WASH",
        href: "/collections/acid-wash",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773575788/acioddddd_byto0p.webp")
    }
]

export function BuiltForPresenceSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
        }, 5000) // Change slide every 5 seconds
        return () => clearInterval(timer)
    }, [])

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            // Swiped right - show previous
            setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
        } else if (info.offset.x < -100) {
            // Swiped left - show next
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
        }
    }

    return (
        <section className="py-10 bg-background relative z-10" suppressHydrationWarning>
            <Container>
                <div className="relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 min-h-[500px] md:min-h-[450px]">
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
                            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-stretch cursor-grab active:cursor-grabbing"
                        >
                            {/* Left: Image */}
                            <div className="relative w-full md:w-1/2 h-[50%] md:h-full">
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent md:bg-none z-10" />
                                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent hidden md:block z-10" />
                                <Image
                                    src={SLIDES[currentSlide].image}
                                    alt={SLIDES[currentSlide].title2}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Right: Content */}
                            <div className="relative z-20 w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center h-[50%] md:h-full bg-[#0A0A0A] md:bg-transparent">
                                <div className="text-[#FF5900] font-bold tracking-widest mb-3 md:mb-4">
                                    - - -
                                </div>
                                <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] tracking-normal md:tracking-wide font-bold uppercase leading-none mb-4 md:mb-6" style={{ fontFamily: "var(--font-bebas)" }}>
                                    <span className="text-white block">{SLIDES[currentSlide].title1}</span>
                                    <span className="text-[#FF5900] block">{SLIDES[currentSlide].title2}</span>
                                </h2>
                                
                                <p className="text-xs md:text-sm text-muted-foreground font-bold tracking-wider mb-8 uppercase leading-relaxed max-w-sm">
                                    {SLIDES[currentSlide].description}
                                </p>

                                <div className="flex">
                                    <Link
                                        href={SLIDES[currentSlide].href}
                                        className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase tracking-widest text-xs rounded-lg bg-[#141414] border border-white/10 transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {SLIDES[currentSlide].buttonText}
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Slider Navigation Dots */}
                    <div className="absolute bottom-6 right-8 md:right-16 z-30 flex gap-2">
                        {SLIDES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    currentSlide === index ? "w-8 bg-[#FF5900]" : "w-2 bg-white/20 hover:bg-white/40"
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
