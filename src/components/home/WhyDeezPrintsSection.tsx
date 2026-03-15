import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getCloudinaryUrl } from "@/lib/cloudinary"

export function WhyDeezPrintsSection() {
    return (
        <section className="py-10 bg-background relative z-10" suppressHydrationWarning>
            <Container>
                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-4 md:mb-8">
                    <div className="h-px w-16 md:w-32 bg-white/20" />
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#FF5900] uppercase text-center glow-text-orange" style={{ fontFamily: "var(--font-bebas)" }}>
                        <span className="text-white">WHY DEEZ </span>PRINTS
                    </h2>
                    <div className="h-px w-16 md:w-32 bg-white/20" />
                </div>

                {/* Features Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mb-8 md:mb-12">
                    {/* Feature 1 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                <line x1="9" y1="9" x2="9.01" y2="9"/>
                                <line x1="15" y1="9" x2="15.01" y2="9"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                240 GSM COTTON
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Premium Feel
                            </span>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m14.5 4-5 5a2 2 0 0 0-2.8 2.8l3 3a2 2 0 0 0 2.8-2.8l5-5"/>
                                <path d="m5 16-1 4 4-1"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                HIGH DETAIL PRINTS
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Long Lasting
                            </span>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.38 3.46 16 2a8.86 8.86 0 0 1-5 0l-4.38 1.46A2 2 0 0 0 5 5.36v.92c0 .92.37 1.8.18 2.65L4.4 11H2m18 0h-2.4l-.78 2.07c-.19.85.18 1.73.18 2.65v.92c0 1.43-1.04 2.66-2.45 2.86L10 20.3V22h4v-1.7l4.63-.8c1.4-.2 2.45-1.43 2.45-2.86v-.92c0-.92-.37-1.8-.18-2.65L21.6 11Z"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                OVERSIZED FIT
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Drop Shoulder
                            </span>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-center gap-4 group justify-center lg:justify-start lg:px-4">
                        <div className="shrink-0 flex items-center justify-center relative w-12 h-12">
                            <svg className="w-10 h-10 text-[#FF5900] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-bold text-white uppercase tracking-widest leading-tight">
                                LIMITED DROPS
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide mt-1">
                                Every Season
                            </span>
                        </div>
                    </div>
                </div>

                {/* Banner Banner */}
                <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] min-h-[300px] md:h-[280px] group flex flex-col md:flex-row">
                    
                    {/* Background Overlay Component for Mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:hidden z-10" />

                    {/* Background Image Container */}
                    <div className="absolute inset-0 md:left-1/3 md:right-0 overflow-hidden pt-8 md:pt-0">
                        <Image
                            src={getCloudinaryUrl("https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773572385/acidddd_dqm3v8.webp")} // Acid wash tee image
                            alt="Acid Wash Collection"
                            fill
                            className="object-cover md:object-contain object-right md:object-right-bottom group-hover:scale-105 transition-transform duration-700 opacity-60 md:opacity-80"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        {/* Gradient Fades for Image on Desktop (Smooth transition) */}
                        <div className="hidden md:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10" />
                        <div className="hidden md:block absolute inset-y-0 left-48 w-32 bg-gradient-to-r from-[#0a0a0a]/90 to-transparent z-10" />
                        
                        <div className="hidden md:block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
                    </div>

                    {/* Content Section */}
                    <div className="relative z-20 h-full flex flex-col justify-end md:justify-center p-8 lg:p-12 w-full md:max-w-xl md:bg-[#0a0a0a]/50 md:backdrop-blur-[2px]">
                        <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 md:mb-4 opacity-70">
                            NEW DROP
                        </span>
                        
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-2 md:mb-3 flex flex-wrap gap-2">
                            <span>ACID WASH</span> 
                            <span className="font-light text-white/90">COLLECTION</span>
                        </h3>
                        
                        <p className="text-xs md:text-sm lg:text-base font-normal tracking-wide text-white/60 mb-8 max-w-sm">
                            Vintage Texture. Heavy Cotton.
                        </p>
                        
                        <div>
                            <Link 
                                href="/collections/acid-wash"
                                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-transparent text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit"
                            >
                                SHOP NOW
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                    <path d="m6 9 6 6 6-6"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
