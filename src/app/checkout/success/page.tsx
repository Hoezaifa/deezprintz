"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import html2canvas from "html2canvas"

export default function CheckoutSuccessPage() {
    const receiptRef = useRef<HTMLDivElement>(null)

    const handleDownloadReceipt = async () => {
        if (receiptRef.current) {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2, // Higher resolution
                backgroundColor: "#ffffff",
                logging: false,
                useCORS: true
            })

            const image = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = `DeezPrints-Receipt-${new Date().getTime()}.png`
            link.click()
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

                    {/* Receipt Card to be captured */}
                    <div ref={receiptRef} className="bg-white p-8 rounded-2xl shadow-xl text-left mb-8 border border-zinc-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

                        <div className="text-center mb-6 border-b border-zinc-100 pb-6">
                            <h2 className="font-bold text-2xl text-zinc-900">PAYMENT RECEIPT</h2>
                            <p className="text-zinc-500 text-sm mt-1">Please transfer the amount below</p>
                        </div>

                        <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-lg mb-6 border border-zinc-100">
                            <span className="text-zinc-500 font-medium">Total Amount</span>
                            <span className="font-bold text-2xl text-green-600">PKR 468.00</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500 text-sm">Bank Name</span>
                                <span className="font-bold text-zinc-900">Meezan Bank</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500 text-sm">Account Title</span>
                                <span className="font-bold text-zinc-900">Deez Prints Studio</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-zinc-500 text-sm block mb-1">Account Number / IBAN</span>
                                <div className="flex items-center justify-between bg-zinc-100 p-3 rounded font-mono font-bold text-sm">
                                    <span>PK27 MEZN 0001 0701 0454</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 ml-2" onClick={() => navigator.clipboard.writeText("PK27 MEZN 0001 0701 0454")}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-xs text-zinc-400">
                            <p>Screenshot this receipt and share it on WhatsApp</p>
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
