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
        <section className="py-10 bg-background relative z-10">
            <Container>
                <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a]">
                    {/* Top: Hero Banner */}
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left: Text Content */}
                        <div className="w-full md:w-[45%] p-6 md:p-10 lg:p-14 flex flex-col justify-center order-2 md:order-1">
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] text-white mb-4 md:mb-5"
                                style={{ fontFamily: "var(--font-bebas)" }}
                            >
                                WALLS NEED<br />STATEMENTS TOO
                            </h2>
                            <Link
                                href="/collections/tapestries"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 text-white font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                            >
                                SHOP NOW →
                            </Link>
                        </div>

                        {/* Right: Room Hero Image */}
                        <div className="relative w-full md:w-[55%] h-[250px] md:h-[320px] order-1 md:order-2">
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent hidden md:block z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden z-10" />
                            <Image
                                src="/images/generated/tapestry_room_hero.png"
                                alt="Tapestry in a room"
                                fill
                                sizes="(max-width: 768px) 100vw, 55vw"
                                className="object-cover object-center rounded-tr-2xl md:rounded-tr-[2rem]"
                            />
                        </div>
                    </div>

                    {/* Bottom: Product Grid */}
                    <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {TAPESTRY_PRODUCTS.map((product, index) => (
                                <Link
                                    key={index}
                                    href={product.href}
                                    className="group flex flex-col gap-2"
                                >
                                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors duration-300">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover transition duration-500 group-hover:scale-105 will-change-transform"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs md:text-sm text-white/70 group-hover:text-white transition-colors font-medium italic">
                                            {product.title}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-white/40 font-bold tracking-wider">
                                            Rs. {product.price.toLocaleString()}
                                        </p>
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
