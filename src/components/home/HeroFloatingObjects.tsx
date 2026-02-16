"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getCloudinaryUrl } from "@/lib/cloudinary"

export function HeroFloatingObjects() {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkDesktop = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                setIsDesktop(true)
            } else {
                setIsDesktop(false)
            }
        }

        // Check initially
        checkDesktop()

        // Add listener
        const mediaQuery = window.matchMedia("(min-width: 1024px)")
        mediaQuery.addEventListener("change", checkDesktop)

        return () => mediaQuery.removeEventListener("change", checkDesktop)
    }, [])

    if (!isDesktop) return null

    return (
        <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block overflow-visible mt-10 lg:-mt-20">
            <FloatingElement
                src={getCloudinaryUrl("assets/hero/objects-01.svg")}
                alt="Hero Objects"
                className="top-1/2 right-0 lg:right-30 -translate-y-1/2 w-[300px] lg:w-[500px] xl:w-[650px] z-10"
                delay={0.2}
            />
        </div>
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
                priority={false}
            />
        </motion.div>
    )
}
