"use client"

import { motion } from "framer-motion"
import Image from "next/image"


export function HeroSection() {
    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-20">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full mix-blend-overlay" />
            </div>

            {/* Content Container */}
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                {/* Left Item (Jersey 1) */}
                <motion.div
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    animate={{ opacity: 1, x: 0, rotate: -5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group hidden lg:block"
                >
                    <div className="absolute inset-0 bg-orange-500/20 blur-[60px] group-hover:bg-orange-500/30 transition-all duration-500" />
                    <div className="relative z-10 w-[400px] h-[400px] filter drop-shadow-2xl hover:scale-105 transition-transform duration-500">
                        <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/50 border border-white/5 overflow-hidden rounded-2xl border-orange-500/20">

                            <div className="relative z-10 w-full h-full">
                                <Image
                                    src="/assets/hero/left-jersey.png"
                                    alt="Left Jersey"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Center Item (Main Hoodie) */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex flex-col items-center text-center"
                >
                    {/* Glowing Centerpiece */}
                    <div className="relative w-full aspect-square max-w-[500px]">
                        <div className="absolute inset-0 bg-white/10 blur-[80px] animate-pulse" />
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full h-full"
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/50 border border-white/5 overflow-hidden rounded-3xl border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">

                                <div className="relative z-10 w-full h-full">
                                    <Image
                                        src="/assets/hero/center-hoodie.png"
                                        alt="Center Hoodie"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Item (Jersey 2) */}
                <motion.div
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative group hidden lg:block"
                >
                    <div className="absolute inset-0 bg-zinc-500/20 blur-[60px] group-hover:bg-zinc-500/30 transition-all duration-500" />
                    <div className="relative z-10 w-[400px] h-[400px] filter drop-shadow-2xl hover:scale-105 transition-transform duration-500">
                        <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/50 border border-white/5 overflow-hidden rounded-2xl border-zinc-500/20">

                            <div className="relative z-10 w-full h-full">
                                <Image
                                    src="/assets/hero/right-jersey.png"
                                    alt="Right Jersey"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
