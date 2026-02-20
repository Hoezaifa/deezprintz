"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { toPng } from "html-to-image"

export default function CheckoutSuccessPage() {
    const receiptRef = useRef<HTMLDivElement>(null)

    const handleDownloadReceipt = async () => {
        if (receiptRef.current) {
            try {
                const dataUrl = await toPng(receiptRef.current, {
                    backgroundColor: "#ffffff",
                    pixelRatio: 2,
                    filter: (node) => {
                        // Keep buttons explicitly hidden based on the old prop convention we added
                        if (node.tagName?.toLowerCase() === 'button') {
                            const ignore = node.getAttribute('data-html2canvas-ignore');
                            if (ignore === 'true') return false;
                        }
                        return true;
                    }
                })

                const link = document.createElement("a")
                link.href = dataUrl
                link.download = `DeezPrints-Receipt-${new Date().getTime()}.png`
                link.click()
            } catch (err) {
                console.error("Failed to generate receipt", err);
                alert("Failed to download receipt image.");
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 py-20 flex items-center justify-center bg-zinc-50">
                <Container className="max-w-xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for your order. Your order ID is <span className="font-mono font-bold text-foreground">#DP-8821</span>
                    </p>

                    {/* Receipt Card Wrapper (shadow outside capture area) */}
                    <div className="shadow-xl rounded-2xl mb-8 border border-zinc-200">
                        <div ref={receiptRef} className="p-8 rounded-2xl text-left relative overflow-hidden" style={{ backgroundColor: "#ffffff", borderColor: "#e4e4e7", borderWidth: "1px", color: "#18181b" }}>
                            <div className="absolute top-0 left-0 w-full h-2" style={{ background: "linear-gradient(to right, #fb923c, #ea580c)" }}></div>

                            <div className="text-center mb-6 pb-6" style={{ borderBottom: "1px solid #f4f4f5" }}>
                                <h2 className="font-bold text-2xl" style={{ color: "#18181b" }}>PAYMENT RECEIPT</h2>
                                <p className="text-sm mt-1" style={{ color: "#71717a" }}>Please transfer the amount below</p>
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-lg mb-6" style={{ backgroundColor: "#fafafa", borderColor: "#f4f4f5", borderWidth: "1px" }}>
                                <span className="font-medium" style={{ color: "#71717a" }}>Total Amount</span>
                                <span className="font-bold text-2xl" style={{ color: "#16a34a" }}>PKR 468.00</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm" style={{ color: "#71717a" }}>Bank Name</span>
                                    <span className="font-bold" style={{ color: "#18181b" }}>Meezan Bank</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm" style={{ color: "#71717a" }}>Account Title</span>
                                    <span className="font-bold" style={{ color: "#18181b" }}>Deez Prints Studio</span>
                                </div>
                                <div className="pt-2">
                                    <span className="text-sm block mb-1" style={{ color: "#71717a" }}>Account Number / IBAN</span>
                                    <div className="flex items-center justify-between p-3 rounded font-mono font-bold text-sm" style={{ backgroundColor: "#f4f4f5", color: "#18181b" }}>
                                        <span>PK27 MEZN 0001 0701 0454</span>
                                        {/* Copy Button (hidden from html2canvas using data-html2canvas-ignore) */}
                                        <button
                                            data-html2canvas-ignore="true"
                                            className="h-6 w-6 ml-2 flex items-center justify-center opacity-50 hover:opacity-100"
                                            onClick={() => navigator.clipboard.writeText("PK27 MEZN 0001 0701 0454")}
                                        >
                                            <Copy className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center text-xs" style={{ color: "#a1a1aa" }}>
                                <p>Screenshot this receipt and share it on WhatsApp</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleDownloadReceipt}
                            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 text-lg gap-2"
                        >
                            <Download className="w-5 h-5" /> Download Receipt
                        </Button>

                        <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg gap-2">
                            <Share2 className="w-5 h-5" /> Send on WhatsApp
                        </Button>

                        <Link href="/">
                            <Button variant="outline" className="w-full h-12">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
