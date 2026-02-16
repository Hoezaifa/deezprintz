import Image from "next/image"
import { HeroFloatingObjects } from "./HeroFloatingObjects"
import { getCloudinaryUrl } from "@/lib/cloudinary"

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black text-white py-10 lg:py-0">
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Typography & Info */}
                <div className="flex flex-col justify-center items-center lg:items-start z-20 w-full pl-0 lg:pl-30">
                    <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[4/3] -mt-10 lg:-mt-10">
                        <Image
                            src={getCloudinaryUrl("assets/hero/hero-typography.svg")}
                            alt="deez PRINTS Modern Printing Solution"
                            fill
                            className="object-contain object-center lg:object-left"
                            priority
                            // Optimize for LCP: eager loading, high priority
                            fetchPriority="high"
                            unoptimized
                        />
                    </div>
                </div>

                {/* Right Column: Floating Assets (Client Component with lazy load logic) */}
                <HeroFloatingObjects />
            </div>
        </section>
    )
}
