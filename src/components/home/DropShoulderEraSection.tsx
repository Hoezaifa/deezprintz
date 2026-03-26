"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

const FEATURED_ITEMS = [
    {
        title: "Drop Shoulder",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883554/berserkdropf_bed9qx.webp"),
        href: "/products/tshirt-drop-1"
    },
    {
        title: "Drop Shoulder",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp"),
        href: "/products/tshirt-drop-4"
    },
    {
        title: "Breakout Tee",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/breakb_zkkch0.webp"),
        href: "/products/breakout-tee"
    },
    {
        title: "Scarlet Bloom Tee",
        image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772652301/Gemini_Generated_Image_ox19ckox19ckox19_sfssfg.png"),
        href: "/products/kanye-yeezus-shirt"
    },
]

export function DropShoulderEraSection() {
    return (
        <section className="py-10 md:py-16 bg-background relative z-10">
            <Container>
                <div className="relative w-full flex flex-col gap-8 md:gap-12">

                    {/* ── MOBILE: Compact hero with horizontal product scroll ── */}
                    <div className="md:hidden relative">
                        <div className="relative h-[320px] rounded-2xl overflow-hidden mb-6">
                            <Image
                                src="/images/generated/drop_shoulder_era_v2.png"
                                alt="The Drop Shoulder Era"
                                fill
                                sizes="100vw"
                                className="object-cover object-center"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-5 z-10">
                                <h2 className="text-3xl font-bold uppercase leading-[0.95] text-white mb-1.5" style={{ fontFamily: "var(--font-bebas)" }}>
                                    THE DROP<br />SHOULDER ERA
                                </h2>
                                <p className="text-[10px] text-white/40 italic mb-3 max-w-[200px]">Oversized silhouettes designed for comfort and presence.</p>
                                <Link
                                    prefetch={true}
                                    href="/collections/drop-shoulder"
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    SHOP NOW →
                                </Link>
                            </div>
                        </div>

                        {/* Horizontal scroll products */}
                        <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
                            {FEATURED_ITEMS.map((item, i) => (
                                <Link prefetch={true} key={i} href={item.href} className="group shrink-0 w-[120px] flex flex-col gap-1.5">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5">
                                        <Image src={item.image} alt={item.title} fill sizes="120px" className="object-cover" />
                                    </div>
                                    <p className="text-[10px] text-white/50 italic truncate">{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── DESKTOP: Original side-by-side layout ── */}
                    <div className="hidden md:flex flex-row">
                        <div className="relative w-[60%] min-h-[400px]">
                            <Image
                                src="/images/generated/drop_shoulder_era_v2.png"
                                alt="The Drop Shoulder Era"
                                fill
                                sizes="60vw"
                                className="object-cover object-center"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />

                            <div className="absolute bottom-0 left-0 p-10 lg:p-12 z-10">
                                <h2 className="text-5xl lg:text-6xl font-bold uppercase leading-[0.95] text-white mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
                                    THE DROP<br />SHOULDER ERA
                                </h2>
                                <p className="text-sm text-white/60 max-w-xs mb-6 tracking-wide italic">
                                    Oversized silhouettes designed for comfort and presence.
                                </p>
                                <Link
                                    prefetch={true}
                                    href="/collections/drop-shoulder"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                >
                                    SHOP DROP SHOULDER
                                </Link>
                            </div>
                        </div>

                        <div className="w-[40%] p-6 bg-transparent">
                            <div className="grid grid-cols-2 gap-4 h-full">
                                {FEATURED_ITEMS.map((item, i) => (
                                    <Link prefetch={true} key={i} href={item.href} className="group relative flex flex-col gap-2">
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors duration-300">
                                            <Image src={item.image} alt={item.title} fill sizes="20vw" className="object-cover transition duration-500 group-hover:scale-105 will-change-transform" />
                                        </div>
                                        <span className="text-xs text-white/50 group-hover:text-white transition-colors font-medium italic tracking-wide">{item.title}</span>
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
