import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 py-20 flex items-center justify-center">
                <Container className="max-w-xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for your order. Your order ID is <span className="font-mono font-bold text-foreground">#DP-8821</span>
                    </p>

                    <div className="bg-secondary/50 p-6 rounded-lg text-left mb-8 border border-dashed border-primary/30">
                        <h3 className="font-bold text-lg mb-4 text-center">Payment Instructions</h3>
                        <p className="text-sm text-center mb-6">
                            Please transfer the total amount of <span className="font-bold">PKR 468.00</span> to the account below and send a screenshot to our WhatsApp.
                        </p>

                        <div className="space-y-4 bg-white p-4 rounded border">
                            <div>
                                <span className="text-xs text-muted-foreground block">Bank Name</span>
                                <span className="font-semibold">Meezan Bank</span>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground block">Account Title</span>
                                <span className="font-semibold">Deez Prints Studio</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xs text-muted-foreground block">Account Number / IBAN</span>
                                    <span className="font-mono font-bold">PK27 MEZN 0001 0701 0454 5845</span>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                            Send Receipt on WhatsApp
                        </Button>
                        <Link href="/">
                            <Button variant="outline" className="w-full">
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
