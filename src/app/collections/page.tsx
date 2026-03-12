import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

const REST_COLLECTIONS = [
    { title: "HOODIES", href: "/collections/hoodies", image: getCloudinaryUrl("/assets/collections/hoodies.jpg") },
    { title: "MUGS", href: "/collections/mugs", image: getCloudinaryUrl("/assets/collections/mugs.png") },
    { title: "TAPESTRIES", href: "/collections/tapestries", image: getCloudinaryUrl("/assets/collections/tapestries.jpg") },
    { title: "WRISTBANDS", href: "/collections/wristbands", image: getCloudinaryUrl("/assets/collections/wristbands.jpg") },
    { title: "BADGES", href: "/collections/badges", image: getCloudinaryUrl("/assets/collections/badges.jpg") },
    { title: "WALLET CARDS", href: "/collections/wallet-cards", image: getCloudinaryUrl("/assets/collections/wallet-cards.jpg") },
    { title: "KEYCHAINS", href: "/collections/keychains", image: getCloudinaryUrl("/assets/collections/keychains.jpg") },
    { title: "MAGNETS", href: "/collections/magnets", image: getCloudinaryUrl("/assets/collections/magnets.jpg") },
    { title: "NOTEBOOKS", href: "/collections/notebooks", image: getCloudinaryUrl("/assets/collections/notebooks.jpg") },
    { title: "CORPORATE GIFT BOXES", href: "/collections/gift-boxes", image: getCloudinaryUrl("/assets/collections/gift-boxes.jpg") },
]

export default function CollectionsPage() {
    return (
        <main className="min-h-screen pt-20 pb-20 bg-background text-foreground">
            <Container>
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <h1 className="text-5xl font-bold tracking-tighter text-white glow-text">MORE COLLECTIONS</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Explore all our premium collections, designed for the streets.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" suppressHydrationWarning>
                    {REST_COLLECTIONS.map((collection, index) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className="group relative flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-secondary/20 border border-white/5 hover:border-white/10 transition-colors duration-300 hover:bg-secondary/30"
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
            </Container>
        </main>
    );
}
