import { cn } from "@/lib/utils"
import Image from "next/image"

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black py-10 lg:py-0">
            {/* Background Repeating Text – decorative only, hidden from crawlers & screen readers */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.075] pointer-events-none overflow-hidden select-none"
                aria-hidden="true"
                role="presentation"
                style={{ fontFamily: "var(--font-bebas)" }}>
                {[...Array(7)].map((_, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div key={i} className="relative w-full flex whitespace-nowrap text-[8rem] md:text-[14rem] lg:text-[20rem] font-bold leading-[0.85] tracking-tight text-white">
                            {/* Moving element with w-max to prevent wrapping, and shrink-0 to maintain full width */}
                            <div className="flex shrink-0 w-max animate-marquee"
                                style={{ animationDirection: isEven ? 'normal' : 'reverse' }}>
                                {/* Generate 16 exact copies. 50% translation means it slides by exactly 8 copies. As long as 8 copies are wider than the screen, the loop will clearly be seamless. */}
                                {[...Array(16)].map((_, j) => (
                                    <div key={j} className="inline pr-4 md:pr-8">IMPACT. DETAIL. PRESENCE.</div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Foreground Content */}
            <div className="container relative z-10 flex flex-col items-center justify-center text-center">
                {/* Scale down to 75% of previous size: max-w-[600px] -> max-w-[450px], max-w-[800px] -> max-w-[600px] */}
                <div className="relative w-full max-w-[450px] lg:max-w-[600px] aspect-[4/3] -mt-10 lg:-mt-10">
                    <Image
                        src="/assets/hero/hero-typography.svg"
                        alt="deez PRINTS Modern Printing Solution"
                        fill
                        priority
                        unoptimized
                        fetchPriority="high"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    )
}
