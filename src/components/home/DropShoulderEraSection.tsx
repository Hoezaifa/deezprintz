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
        <section className="py-10 bg-background relative z-10">
            <Container>
                <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a]">
                    <div className="flex flex-col md:flex-row">
                        {/* Left: Hero Image + Text Overlay */}
                        <div className="relative w-full md:w-[60%] min-h-[350px] md:min-h-[400px]">
                            <Image
                                src="/images/generated/drop_shoulder_era_v2.png"
                                alt="The Drop Shoulder Era"
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover object-center"
                                priority
                            />
                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-none" />
                            {/* Right edge fade into dark bg on desktop */}
                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent hidden md:block" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-12 z-10">
                                <h2
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] text-white mb-3 md:mb-4"
                                    style={{ fontFamily: "var(--font-bebas)" }}
                                >
                                    THE DROP<br />SHOULDER ERA
                                </h2>
                                <p className="text-xs md:text-sm text-white/60 max-w-xs mb-6 tracking-wide italic">
                                    Oversized silhouettes designed for comfort and presence.
                                </p>
                                <Link
                                    href="/collections/drop-shoulder"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-white font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                >
                                    SHOP DROP SHOULDER
                                </Link>
                            </div>
                        </div>

                        {/* Right: Product Thumbnails Grid */}
                        <div className="w-full md:w-[40%] p-4 md:p-6 bg-[#0a0a0a]">
                            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                                {FEATURED_ITEMS.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="group relative flex flex-col gap-2"
                                    >
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/5 group-hover:border-white/15 transition-colors duration-300">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 25vw, 20vw"
                                                className="object-cover transition duration-500 group-hover:scale-105 will-change-transform"
                                            />
                                        </div>
                                        <span className="text-[10px] md:text-xs text-white/50 group-hover:text-white transition-colors font-medium italic tracking-wide">
                                            {item.title}
                                        </span>
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
