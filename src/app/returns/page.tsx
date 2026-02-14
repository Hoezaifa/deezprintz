import { Container } from "@/components/ui/container"
import { AlertCircle } from "lucide-react"

export default function ReturnsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <Container>
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Returns & Exchange</h1>
                        <p className="text-muted-foreground">
                            Our policy ensures you get the best quality product.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-8 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Exchange Policy</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We offer a <strong>7-day exchange policy</strong> from the date of delivery. If you have received a defective item or the wrong size, please contact us immediately.
                            </p>
                            <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-2">
                                <li>Item must be unused and in original condition.</li>
                                <li>Tags and packaging must be intact.</li>
                                <li>Exchange depends on stock availability.</li>
                            </ul>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Returns & Refunds</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We generally do not offer cash refunds. However, if a product is out of stock or faulty, we may process a refund via Bank Transfer within 7 working days.
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex gap-4 items-start">
                            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-orange-200">
                                Note: Custom or personalized items are not eligible for return or exchange unless defective.
                            </p>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-bold">How to Request an Exchange?</h3>
                        <p className="text-zinc-400">
                            Simply message us on WhatsApp with your Order ID and pictures of the item.
                        </p>
                        <a
                            href="https://wa.me/923272487127"
                            target="_blank"
                            className="inline-block bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-zinc-200 transition-colors"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    )
}
