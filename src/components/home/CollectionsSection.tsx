"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

const COLLECTIONS = [
    { title: "TEES", href: "/collections/t-shirts", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderb_srlaq3.webp") },
    { title: "DROP SHOULDER", href: "/collections/drop-shoulder", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp") },
    { title: "ACID WASH TEES", href: "/collections/acid-wash", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085752/BerserkAcidB_pow8mm.webp") },
]

export function CollectionsSection() {
    return (
        <section className="py-20 bg-background relative z-10">
            <Container>
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">COLLECTIONS</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-8" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-12">
                    {COLLECTIONS.map((collection, index) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className={`group relative flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-secondary/20 border border-white/5 hover:border-white/10 transition-colors duration-300 hover:bg-secondary/30 ${
                                index === 2 ? "col-span-2 md:col-span-1 w-[calc(50%-0.375rem)] md:w-full mx-auto" : "w-full"
                            }`}
                        >
                            {/* Image Container with Glow */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition duration-500 group-hover:scale-110 group-hover:-rotate-3 will-change-transform"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-1 pointer-events-none text-center">
                                <h3 className="font-bold text-sm sm:text-lg leading-tight text-white group-hover:text-primary transition-colors uppercase tracking-widest">
                                    {collection.title}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-white transition-colors">
                                    View Collection
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Shop All Button */}
                <div className="flex justify-center mt-8">
                    <Link
                        href="/collections"
                        className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white uppercase tracking-widest overflow-hidden rounded-full bg-secondary/30 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 transition-colors duration-300">Shop All</span>
                        <div className="absolute inset-0 border border-white/20 rounded-full group-hover:opacity-0 transition-opacity" />
                    </Link>
                </div>
            </Container>
        </section>
    )
}
