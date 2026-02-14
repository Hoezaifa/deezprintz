import { Container } from "@/components/ui/container"
import { Truck, Clock, Map } from "lucide-react"

export default function ShippingPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <Container>
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Shipping Information</h1>
                        <p className="text-muted-foreground">
                            Details about our delivery process and policies.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-8 flex gap-6">
                            <div className="shrink-0">
                                <div className="p-4 bg-white/10 rounded-full">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Delivery Time</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Our standard delivery time is <strong>3-5 working days</strong>.
                                    However, during sale periods or public holidays, delivery may take up to 7 working days.
                                    We strive to dispatch all orders within 24 hours of confirmation.
                                </p>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-8 flex gap-6">
                            <div className="shrink-0">
                                <div className="p-4 bg-white/10 rounded-full">
                                    <Truck className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Shipping Charges</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    We offer a flat shipping rate of <strong>Rs. 200</strong> across Pakistan.
                                    Free shipping is available on orders above Rs. 5000.
                                </p>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-8 flex gap-6">
                            <div className="shrink-0">
                                <div className="p-4 bg-white/10 rounded-full">
                                    <Map className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Coverage Area</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    We deliver to all major cities and towns in Pakistan via our courier partners (TCS, Leopards, M&P).
                                    For remote areas, delivery might take a few extra days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
