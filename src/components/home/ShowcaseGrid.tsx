"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"
import { motion, AnimatePresence } from "framer-motion"

/* ─── BUILT FOR PRESENCE SLIDER DATA ─── */
const PRESENCE_SLIDES = [
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

/* ─── DROP SHOULDER THUMBNAILS ─── */
const DROP_SHOULDER_ITEMS = [
    { title: "Drop Shoulder", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883554/berserkdropf_bed9qx.webp"), href: "/products/tshirt-drop-1" },
    { title: "Drop Shoulder", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp"), href: "/products/tshirt-drop-4" },
    { title: "Breakout Tee", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/breakb_zkkch0.webp"), href: "/products/breakout-tee" },
    { title: "Scarlet Bloom", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772652301/Gemini_Generated_Image_ox19ckox19ckox19_sfssfg.png"), href: "/products/kanye-yeezus-shirt" },
]

/* ─── TAPESTRY PRODUCTS ─── */
const TAPESTRY_ITEMS = [
    { title: "Berserk Eclipse", price: 1000, image: "/images/generated/tapestry_berserk.png", href: "/products/tapestry-berserk-eclipse" },
    { title: "Cyber City Night", price: 2000, image: "/images/generated/tapestry_cybercity.png", href: "/products/tapestry-cyber-city" },
    { title: "Manga Panel", price: 2100, image: "/images/generated/tapestry_manga.png", href: "/products/tapestry-manga-panel" },
    { title: "Demon Sigil", price: 2000, image: "/images/generated/tapestry_demon_sigil.png", href: "/products/tapestry-demon-sigil" },
]

/* ─── MUG PRODUCTS ─── */
const MUG_ITEMS = [
    { title: "Skull Mug", price: 600, image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772897480/mug_sample_sfu1kd.webp"), href: "/products/mug-white" },
    { title: "Custom Mug", price: 1200, image: "/images/generated/mugs_hero.png", href: "/products/mug-colored" },
]

export function ShowcaseGrid() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % PRESENCE_SLIDES.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            setCurrentSlide((prev) => (prev - 1 + PRESENCE_SLIDES.length) % PRESENCE_SLIDES.length)
        } else if (info.offset.x < -100) {
            setCurrentSlide((prev) => (prev + 1) % PRESENCE_SLIDES.length)
        }
    }

    return (
        <section className="py-10 bg-background relative z-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* ═══ TOP LEFT: BUILT FOR PRESENCE (Slider) ═══ */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 min-h-[350px] md:min-h-[380px]">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.4}
                                onDragEnd={handleDragEnd}
                                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                            >
                                {/* Background Image */}
                                <Image
                                    src={PRESENCE_SLIDES[currentSlide].image}
                                    alt={PRESENCE_SLIDES[currentSlide].title2}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center"
                                />
                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
                                    <div className="text-[#FF5900] font-bold tracking-widest mb-2 text-xs">- - -</div>
                                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-none mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                        <span className="text-white block">{PRESENCE_SLIDES[currentSlide].title1}</span>
                                        <span className="text-[#FF5900] block">{PRESENCE_SLIDES[currentSlide].title2}</span>
                                    </h2>
                                    <p className="text-[10px] md:text-xs text-white/50 font-bold tracking-wider mb-4 uppercase max-w-[250px]">
                                        {PRESENCE_SLIDES[currentSlide].description}
                                    </p>
                                    <Link
                                        href={PRESENCE_SLIDES[currentSlide].href}
                                        className="inline-flex items-center gap-2 px-5 py-2 font-bold text-white uppercase tracking-widest text-[10px] rounded-md bg-[#141414] border border-white/10 transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                                    >
                                        {PRESENCE_SLIDES[currentSlide].buttonText}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="absolute bottom-4 right-4 z-30 flex gap-1.5">
                            {PRESENCE_SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? "w-6 bg-[#FF5900]" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ═══ TOP RIGHT: TAPESTRY SHOWCASE ═══ */}
                    <div className="rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5">
                        {/* Hero */}
                        <div className="relative h-[180px] md:h-[200px]">
                            <Image src="/images/generated/tapestry_room_hero.png" alt="Tapestry room" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none text-white mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                    WALLS NEED<br />STATEMENTS TOO
                                </h3>
                                <Link href="/collections/tapestries" className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>
                        {/* Products */}
                        <div className="grid grid-cols-4 gap-2 p-3">
                            {TAPESTRY_ITEMS.map((item, i) => (
                                <Link key={i} href={item.href} className="group flex flex-col gap-1">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors">
                                        <Image src={item.image} alt={item.title} fill sizes="12vw" className="object-cover transition duration-500 group-hover:scale-105" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-white/40 group-hover:text-white/70 transition-colors italic truncate">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ═══ BOTTOM LEFT: DROP SHOULDER ERA ═══ */}
                    <div className="rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5">
                        {/* Hero */}
                        <div className="relative h-[180px] md:h-[200px]">
                            <Image src="/images/generated/drop_shoulder_era_v2.png" alt="Drop Shoulder Era" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none text-white mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                    THE DROP<br />SHOULDER ERA
                                </h3>
                                <p className="text-[9px] md:text-[10px] text-white/40 italic mb-2 max-w-[200px]">Oversized silhouettes designed for comfort and presence.</p>
                                <Link href="/collections/drop-shoulder" className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>
                        {/* Products */}
                        <div className="grid grid-cols-4 gap-2 p-3">
                            {DROP_SHOULDER_ITEMS.map((item, i) => (
                                <Link key={i} href={item.href} className="group flex flex-col gap-1">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors">
                                        <Image src={item.image} alt={item.title} fill sizes="12vw" className="object-cover transition duration-500 group-hover:scale-105" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-white/40 group-hover:text-white/70 transition-colors italic truncate">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ═══ BOTTOM RIGHT: MUGS SHOWCASE ═══ */}
                    <div className="rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col">
                        {/* Hero */}
                        <div className="relative h-[180px] md:h-[200px]">
                            <Image src="/images/generated/mugs_hero.png" alt="Custom Mugs" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none text-white mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                    SIP IN<br />STYLE
                                </h3>
                                <Link href="/collections/mugs" className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>
                        {/* Products */}
                        <div className="grid grid-cols-2 gap-2 p-3 flex-1">
                            {MUG_ITEMS.map((item, i) => (
                                <Link key={i} href={item.href} className="group flex flex-col gap-1">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors">
                                        <Image src={item.image} alt={item.title} fill sizes="12vw" className="object-cover transition duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] text-white/40 group-hover:text-white/70 transition-colors italic">{item.title}</span>
                                        <span className="text-[9px] text-white/30 font-bold">Rs. {item.price.toLocaleString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
