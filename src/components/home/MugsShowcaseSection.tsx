"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

const MUG_PRODUCTS = [
    {
        title: "Manga Panel Mug",
        price: 2000,
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"),
        href: "/products/mug-manga-panel"
    },
    {
        title: "Trust The Process Mug",
        price: 1000,
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"),
        href: "/products/mug-trust-process"
    },
    {
        title: "Rap Quote Mug",
        price: 1800,
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"),
        href: "/products/mug-rap-quote"
    },
    {
        title: "Street Typography Mug",
        price: 1000,
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"),
        href: "/products/mug-street-typo"
    },
]

export function MugsShowcaseSection() {
    return (
        <section className="py-10 md:py-16 bg-background relative z-10">
            <Container>
                <div className="relative w-full flex flex-col gap-8 md:gap-12">

                    {/* ── MOBILE: Compact with overlaid text ── */}
                    <div className="md:hidden relative">
                        <div className="relative h-[280px] rounded-2xl overflow-hidden mb-6">
                            <Image
                                src={getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp")}
                                alt="Custom printed mugs"
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h2 className="text-3xl font-bold uppercase leading-[0.95] text-white mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                                    START YOUR<br />DAY LOUD
                                </h2>
                                <Link prefetch={true} href="/collections/mugs" className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>

                        {/* Horizontal scroll products */}
                        <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
                            {MUG_PRODUCTS.map((product, i) => (
                                <Link prefetch={true} key={i} href={product.href} className="group shrink-0 w-[130px] flex flex-col gap-1.5">
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
                                    START YOUR<br />DAY LOUD
                                </h2>
                                <Link
                                    prefetch={true}
                                    href="/collections/mugs"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                                >
                                    SHOP NOW →
                                </Link>
                            </div>
                            <div className="relative w-[55%] h-[320px]">
                                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                                <Image src={getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp")} alt="Custom printed mugs" fill sizes="55vw" className="object-cover object-center rounded-2xl" />
                            </div>
                        </div>
                        <div className="px-8 pb-8 pt-2">
                            <div className="grid grid-cols-4 gap-4">
                                {MUG_PRODUCTS.map((product, i) => (
                                    <Link prefetch={true} key={i} href={product.href} className="group flex flex-col gap-2">
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
