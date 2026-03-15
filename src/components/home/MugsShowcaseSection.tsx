"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"

const MUG_PRODUCTS = [
    {
        title: "Manga Panel Mug",
        price: 2000,
        image: "/images/generated/mug_manga_panel.png",
        href: "/products/mug-manga-panel"
    },
    {
        title: "Trust The Process Mug",
        price: 1000,
        image: "/images/generated/mug_trust_process.png",
        href: "/products/mug-trust-process"
    },
    {
        title: "Rap Quote Mug",
        price: 1800,
        image: "/images/generated/mug_rap_quote.png",
        href: "/products/mug-rap-quote"
    },
    {
        title: "Street Typography Mug",
        price: 1000,
        image: "/images/generated/mug_street_typo.png",
        href: "/products/mug-street-typo"
    },
]

export function MugsShowcaseSection() {
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
                                START YOUR<br />DAY LOUD
                            </h2>
                            <Link
                                href="/collections/mugs"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 text-white font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                            >
                                SHOP NOW →
                            </Link>
                        </div>

                        {/* Right: Hero Image */}
                        <div className="relative w-full md:w-[55%] h-[250px] md:h-[320px] order-1 md:order-2">
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent hidden md:block z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden z-10" />
                            <Image
                                src="/images/generated/mugs_hero_v2.png"
                                alt="Custom printed mugs"
                                fill
                                sizes="(max-width: 768px) 100vw, 55vw"
                                className="object-cover object-center rounded-tr-2xl md:rounded-tr-[2rem]"
                            />
                        </div>
                    </div>

                    {/* Bottom: Product Grid */}
                    <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {MUG_PRODUCTS.map((product, index) => (
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
