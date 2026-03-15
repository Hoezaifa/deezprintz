"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

const COLLECTIONS = [
    { title: "T-SHIRTS", description: "Relaxed oversized silhouettes with premium prints.", href: "/collections/t-shirts", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderb_srlaq3.webp") },
    { title: "DROP SHOULDER", description: "Relaxed oversized silhouettes with heavyweight feel.", href: "/collections/drop-shoulder", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp") },
    { title: "ACID WASH", description: "Vintage textures with bold graphic identity.", href: "/collections/acid-wash", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085752/BerserkAcidB_pow8mm.webp") },
    { title: "HOODIES", description: "Vintage textures with bold graphic hoodies.", href: "/collections/hoodies", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1771268359/deez-prints/assets/products/hoodies/kanye-west-hoodie-v1.jpg") },
    { title: "TAPESTRIES", description: "Vintage textures with bold oversized silhouettes.", href: "/collections/tapestries", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773597161/tapestry_hr14wa.webp") },
    { title: "MUGS", description: "Vintage textures with bold graphic identity.", href: "/collections/mugs", image: getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp") },
]

export function CollectionsSection() {
    return (
        <section className="py-10 md:py-20 bg-background relative z-10">
            <Container>
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">FEATURED COLLECTIONS</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-8" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-12">
                    {COLLECTIONS.map((collection) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className="group relative flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-secondary/20 border border-white/5 hover:border-white/10 transition-colors duration-300 hover:bg-secondary/30 w-full"
                        >
                            {/* Image Container with Glow */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover transition duration-500 group-hover:scale-110 group-hover:-rotate-3 will-change-transform"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-1 pointer-events-none">
                                <h3 className="font-bold text-sm sm:text-lg leading-tight text-white group-hover:text-primary transition-colors uppercase tracking-widest">
                                    {collection.title}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                                    {collection.description}
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-white transition-colors font-semibold">
                                    View Collection →
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
