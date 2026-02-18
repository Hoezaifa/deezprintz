"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"

const COLLECTIONS = [
    { title: "T-SHIRTS", href: "/collections/t-shirts", image: "/assets/collections/tshirt.jpg" },
    { title: "DROP SHOULDER", href: "/collections/drop-shoulder", image: "/assets/collections/dropshoulder.jpg" },
    { title: "HOODIES", href: "/collections/hoodies", image: "/assets/collections/hoodies.jpg" },
    { title: "MUGS", href: "/collections/mugs", image: "/assets/collections/mugs.jpg" },
    { title: "TAPESTRIES", href: "/collections/tapestries", image: "/assets/collections/tapestries.jpg" },
    { title: "WRISTBANDS", href: "/collections/wristbands", image: "/assets/collections/wristbands.jpg" },
    { title: "BADGES", href: "/collections/badges", image: "/assets/collections/badges.jpg" },
    { title: "WALLET CARDS", href: "/collections/wallet-cards", image: "/assets/collections/wallet-cards.jpg" },
    { title: "KEYCHAINS", href: "/collections/keychains", image: "/assets/collections/keychains.jpg" },
    { title: "MAGNETS", href: "/collections/magnets", image: "/assets/collections/magnets.jpg" },
    { title: "NOTEBOOKS", href: "/collections/notebooks", image: "/assets/collections/notebooks.jpg" },
    { title: "CORPORATE GIFT BOXES", href: "/collections/gift-boxes", image: "/assets/collections/gift-boxes.jpg" },
]

export function CollectionsSection() {
    return (
        <section className="py-20 bg-background relative z-10">
            <Container>
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-white glow-text">COLLECTIONS</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-8" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" suppressHydrationWarning>
                    {COLLECTIONS.map((collection, index) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className="group relative flex flex-col gap-4 p-4 rounded-3xl bg-secondary/20 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-secondary/30"
                        >
                            {/* Image Container with Glow */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-1 pointer-events-none text-center">
                                <h3 className="font-bold text-lg leading-tight text-white group-hover:text-primary transition-colors uppercase tracking-widest">
                                    {collection.title}
                                </h3>
                                <p className="text-xs text-muted-foreground group-hover:text-white transition-colors">
                                    View Collection
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
