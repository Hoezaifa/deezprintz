"use client"

import { Shirt } from "lucide-react"
// Note: Lucide might not have Hoodie, checking... Lucide has 'Shirt'. I'll use Shirt for now or custom SVG.

export function StreetwearPlaceholder({ type = "shirt", className }: { type?: "shirt" | "hoodie" | "jersey", className?: string }) {
    return (
        <div className={`relative flex items-center justify-center bg-zinc-900/50 border border-white/5 overflow-hidden ${className}`}>
            {/* Grid Background */}
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            {/* Crosshairs */}
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />

            {/* Content */}
            <div className="relative z-10 opacity-20">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="w-32 h-32"
                >
                    {type === 'hoodie' ? (
                        <path d="M12 3v2c0 2-3 2-3 2s-3-2-3-4V3h6zm0 0v2c0 2 3 2 3 2s3-2 3-4V3h-6z M6 5v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5" />
                    ) : (
                        <path d="M20.38 3.4a2 2 0 0 0-1.2-1.1 1.993 1.993 0 0 0-1.6 0l-5.6 2.3-5.6-2.3a1.993 1.993 0 0 0-1.6 0 2 2 0 0 0-1.2 1.1l-1 5a2 2 0 0 0 .5 1.9c.2.2.5.4.8.5l1.3.5V20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V11.3l1.3-.5c.3-.1.6-.3.8-.5.3-.5.5-1.1.5-1.9l-1-5z" />
                    )}
                </svg>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] items-center flex gap-2 text-white/30 font-mono tracking-widest">
                <span>FIG_01</span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span>{type.toUpperCase()}</span>
            </div>
        </div>
    )
}
