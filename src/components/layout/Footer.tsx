import { Container } from "@/components/ui/container"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 py-12 text-muted-foreground relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-xl tracking-tight text-white glow-text">Deez</span>
                            <span className="font-bold text-xl tracking-tight text-muted-foreground">Prints.</span>
                        </div>
                        <p className="text-sm">
                            Redefining street fashion with high-fidelity prints and premium cuts.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4 tracking-widest uppercase text-xs">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/collections/t-shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
                            <li><Link href="/collections/hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
                            <li><Link href="/collections/jerseys" className="hover:text-white transition-colors">Jerseys</Link></li>
                            <li><Link href="/collections/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-white mb-4 tracking-widest uppercase text-xs">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                        </ul>
                    </div>

                    {/* Social / Newsletter */}
                    <div>
                        <h3 className="font-bold text-white mb-4 tracking-widest uppercase text-xs">Stay Connected</h3>
                        <div className="flex gap-4 mb-6">
                            <Link href="https://www.instagram.com/deez_prints/" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"><Instagram className="h-4 w-4" /></Link>
                            <Link href="https://www.facebook.com/profile.php?id=61556303432172" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"><Facebook className="h-4 w-4" /></Link>
                            {/* <Link href="#" className="p-2 bg-secondary/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"><Twitter className="h-4 w-4" /></Link> */}
                        </div>
                        <p className="text-xs text-zinc-500">
                            &copy; {new Date().getFullYear()} Deez Prints. Est. 2026.
                        </p>
                        <p className="text-[10px] text-zinc-800 mt-2">
                            v1.2 - Collections & Analytics
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
