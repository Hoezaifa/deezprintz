"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"

const TAPESTRY_PRODUCTS = [
    {
        title: "Berserk Eclipse Tapestry",
        price: 1000,
        image: "/images/generated/tapestry_berserk.png",
        href: "/products/tapestry-berserk-eclipse"
    },
    {
        title: "Cyber City Night Tapestry",
        price: 2000,
        image: "/images/generated/tapestry_cybercity.png",
        href: "/products/tapestry-cyber-city"
    },
    {
        title: "Manga Panel Tapestry",
        price: 2100,
        image: "/images/generated/tapestry_manga.png",
        href: "/products/tapestry-manga-panel"
    },
    {
        title: "Demon Sigil Wall Art",
        price: 2000,
        image: "/images/generated/tapestry_demon_sigil.png",
        href: "/products/tapestry-demon-sigil"
    },
]

export function TapestryShowcaseSection() {
    return (
        <section className="py-4 md:py-10 bg-background relative z-10">
            <Container>
                <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a]">

                    {/* ── MOBILE: Compact card with overlaid text ── */}
                    <div className="md:hidden relative">
                        {/* Hero image with text overlay */}
                        <div className="relative h-[220px]">
                            <Image
                                src="/images/generated/tapestry_room_hero.png"
                                alt="Tapestry in a room"
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h2 className="text-3xl font-bold uppercase leading-[0.95] text-white mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                    WALLS NEED<br />STATEMENTS TOO
                                </h2>
                                <Link href="/collections/tapestries" className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>

                        {/* Horizontal scroll products */}
                        <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
                            {TAPESTRY_PRODUCTS.map((product, i) => (
                                <Link key={i} href={product.href} className="group shrink-0 w-[130px] flex flex-col gap-1.5">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5">
                                        <Image src={product.image} alt={product.title} fill sizes="130px" className="object-cover" />
                                    </div>
                                    <p className="text-[10px] text-white/50 italic truncate">{product.title}</p>
                                    <p className="text-[9px] text-white/30 font-bold">Rs. {product.price.toLocaleString()}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── DESKTOP: Original layout ── */}
                    <div className="hidden md:block">
                        <div className="flex flex-row items-center">
                            <div className="w-[45%] p-10 lg:p-14 flex flex-col justify-center">
                                <h2
                                    className="text-5xl lg:text-6xl font-bold uppercase leading-[0.95] text-white mb-5"
                                    style={{ fontFamily: "var(--font-bebas)" }}
                                >
                                    WALLS NEED<br />STATEMENTS TOO
                                </h2>
                                <Link
                                    href="/collections/tapestries"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                                >
                                    SHOP NOW →
                                </Link>
                            </div>
                            <div className="relative w-[55%] h-[320px]">
                                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                                <Image src="/images/generated/tapestry_room_hero.png" alt="Tapestry in a room" fill sizes="55vw" className="object-cover object-center rounded-tr-[2rem]" />
                            </div>
                        </div>
                        <div className="px-8 pb-8 pt-2">
                            <div className="grid grid-cols-4 gap-4">
                                {TAPESTRY_PRODUCTS.map((product, i) => (
                                    <Link key={i} href={product.href} className="group flex flex-col gap-2">
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors duration-300">
                                            <Image src={product.image} alt={product.title} fill sizes="25vw" className="object-cover transition duration-500 group-hover:scale-105 will-change-transform" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm text-white/70 group-hover:text-white transition-colors font-medium italic">{product.title}</p>
                                            <p className="text-xs text-white/40 font-bold tracking-wider">Rs. {product.price.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
