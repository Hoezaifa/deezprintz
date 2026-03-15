import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

export function BuiltForPresenceSection() {
    return (
        <section className="py-10 bg-background relative z-10" suppressHydrationWarning>
            <Container>
                <div className="relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col md:flex-row items-center md:items-stretch min-h-[400px]">
                    {/* Left: Image */}
                    <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto">
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent md:bg-none z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent hidden md:block z-10" />
                        <Image
                            src={getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773571100/place_al0unb.webp")} // Placeholder, modify with exact image
                            alt="Built for Presence"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="relative z-20 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                        <div className="text-[#FF5900] font-bold tracking-widest mb-4">
                            - - -
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-8xl tracking-widest uppercase leading-none mb-6" style={{ fontFamily: "var(--font-bebas)" }}>
                            <span className="text-white block">BUILT FOR</span>
                            <span className="text-[#FF5900] block glow-text-orange">PRESENCE</span>
                        </h2>
                        
                        <p className="text-sm md:text-base text-muted-foreground font-medium tracking-wider mb-8 uppercase leading-relaxed max-w-md">
                            PREMIUM COTTON. OVERSIZED FIT. <br className="hidden sm:block" />
                            STATEMENT GRAPHICS.
                        </p>

                        <div className="flex">
                            <Link
                                href="/collections/t-shirts"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white uppercase tracking-widest text-sm rounded-full bg-transparent border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    EXPLORE TEES
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
