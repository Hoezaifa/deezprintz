import { Container } from "@/components/ui/container"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <Container>
                <div className="max-w-2xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white">Contact <span className="text-orange-500">Us</span></h1>
                        <p className="text-muted-foreground">
                            Have questions? We're here to help. Reach out to us.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <a
                            href="https://wa.me/923272487127"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 hover:border-orange-500/50 transition-colors group cursor-pointer"
                        >
                            <div className="p-3 bg-white/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                                <Phone className="w-6 h-6 text-white group-hover:text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">WhatsApp</h3>
                                <p className="text-sm text-zinc-400 mt-1 decoration-orange-500 underline underline-offset-4">Click to Chat</p>
                            </div>
                        </a>

                        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 hover:border-orange-500/50 transition-colors group">
                            <div className="p-3 bg-white/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                                <Mail className="w-6 h-6 text-white group-hover:text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Email</h3>
                                <p className="text-sm text-zinc-400 mt-1">deezprints69@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 hover:border-orange-500/50 transition-colors group">
                            <div className="p-3 bg-white/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                                <MapPin className="w-6 h-6 text-white group-hover:text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Location</h3>
                                <p className="text-sm text-zinc-400 mt-1">Karachi, Pakistan</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-8 space-y-6 text-center shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                        <h2 className="text-2xl font-bold text-white">Business Hours</h2>
                        <div className="space-y-2 text-zinc-400">
                            <p className="text-lg text-orange-400 font-medium">Online Store - Available 24/7</p>
                            <p className="text-sm">We respond to queries as soon as possible.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
