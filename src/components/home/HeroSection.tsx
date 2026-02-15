"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black text-white py-10 lg:py-0">
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Typography & Info */}
                <div className="flex flex-col justify-center items-center lg:items-start z-20 w-full pl-0 lg:pl-30">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[4/3] -mt-10 lg:-mt-10"
                    >
                        <Image
                            src="/assets/hero/hero-typography.svg"
                            alt="deez PRINTS Modern Printing Solution"
                            fill
                            className="object-contain object-center lg:object-left"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Column: Floating Assets */}
                <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block overflow-visible mt-10 lg:-mt-20">
                    <FloatingElement
                        src="/assets/hero/objects-01.svg"
                        alt="Hero Objects"
                        className="top-1/2 right-0 lg:right-30 -translate-y-1/2 w-[300px] lg:w-[500px] xl:w-[650px] z-10"
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    )
}

function FloatingElement({ src, alt, className, delay }: { src: string, alt: string, className: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -15, 0]
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.5, delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: delay + 1 // Offset floating animation start
                }
            }}
            className={`absolute ${className} cursor-pointer drop-shadow-2xl`}
        >
            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
            />
        </motion.div>
    )
}
