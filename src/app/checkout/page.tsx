"use client"

import { supabase } from "@/lib/supabase"
import { useCart } from "@/context/CartContext"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Truck, CreditCard, Banknote, Download } from "lucide-react"
import html2canvas from "html2canvas"

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart()
    const [step, setStep] = useState(1) // 1: Info, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("bank") // Default to bank since COD is disabled
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmitInfo = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
    }

    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)
    const [confirmedOrder, setConfirmedOrder] = useState<{
        total: number,
        items: typeof items,
        date: string,
        method: "cod" | "bank"
    } | null>(null)

    const handlePlaceOrder = async () => {
        setLoading(true)
        try {
            // 1. Save to Supabase
            const { data: order, error } = await supabase
                .from('orders')
                .insert({
                    user_email: formData.email,
                    payment_method: paymentMethod,
                    total_amount: cartTotal,
                    items: items,
                    customer_details: formData,
                    status: 'pending'
                })
                .select()
                .single()

            if (error) throw error

            setOrderId(order.id)

            // 2. Send Email (Fire and forget, don't block)
            fetch('/api/emails', {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    orderId: order.id,
                    total: cartTotal,
                    items: items
                })
            })

            // 3. Success
            // 3. Success
            setConfirmedOrder({
                total: cartTotal,
                items: items,
                date: new Date().toLocaleString(),
                method: paymentMethod
            })
            setStep(3)
            clearCart()

        } catch (err: any) {
            console.error("Order Error:", err)
            // Show the actual error message or code
            alert(`Failed to place order: ${err.message || err.code || "Unknown error"}`)
        } finally {
            setLoading(false)
        }
    }

    const receiptRef = useRef<HTMLDivElement>(null)

    const handleDownloadReceipt = async () => {
        if (receiptRef.current) {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                backgroundColor: "#ffffff",
                logging: false,
                useCORS: true
            })

            const image = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = `DeezPrints-Receipt-${orderId || 'Confirmed'}.png`
            link.click()
        }
    }

    if (items.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                    <Button variant="outline" onClick={() => window.location.href = '/'}>Go Shopping</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <Container>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left Column: Form / Steps */}
                    <div className="space-y-8">
                        {/* Step Indicator */}
                        <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-muted-foreground">
                            <span className={step >= 1 ? "text-white" : ""}>1. INFORMATION</span>
                            <span className="w-8 h-px bg-white/10" />
                            <span className={step >= 2 ? "text-white" : ""}>2. PAYMENT</span>
                            <span className="w-8 h-px bg-white/10" />
                            <span className={step >= 3 ? "text-primary" : ""}>3. COMPLETE</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSubmitInfo}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                                    <div className="space-y-4">
                                        <input
                                            required
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                                        />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                                        />
                                        <input
                                            required
                                            name="address"
                                            placeholder="Shipping Address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                required
                                                name="city"
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                                            />
                                            <input
                                                required
                                                name="zip"
                                                placeholder="ZIP Code"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                                        Continue to Payment
                                    </Button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">Payment Method</h2>
                                    <div className="space-y-4">
                                        {/* COD Disabled */}
                                        {/* <button
                                            onClick={() => setPaymentMethod("cod")}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${paymentMethod === "cod" ? "bg-white/10 border-white" : "bg-zinc-900/50 border-white/10 hover:border-white/30"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Truck className="w-5 h-5" />
                                                <span className="font-bold">Cash on Delivery</span>
                                            </div>
                                            {paymentMethod === "cod" && <div className="w-3 h-3 bg-white rounded-full" />}
                                        </button> */}

                                        <button
                                            onClick={() => setPaymentMethod("bank")}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${paymentMethod === "bank" ? "bg-white/10 border-white" : "bg-zinc-900/50 border-white/10 hover:border-white/30"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Banknote className="w-5 h-5" />
                                                <span className="font-bold">Bank Transfer</span>
                                            </div>
                                            {paymentMethod === "bank" && <div className="w-3 h-3 bg-white rounded-full" />}
                                        </button>

                                        {paymentMethod === "bank" && (
                                            <div className="p-4 bg-zinc-900 rounded-lg text-sm text-gray-300 space-y-3 border border-white/5">
                                                <p className="font-semibold text-white">Please transfer the total amount to:</p>

                                                <div className="space-y-1">
                                                    <p className="font-bold text-orange-500">Easypaisa / Jazzcash / Zindigi (JS Bank)</p>
                                                    <p>Account Title: <span className="text-white">MUHAMMAD HUZAIFA RIAZ</span></p>
                                                    <p>Account Number: <span className="text-white font-mono tracking-wider">03272487127</span></p>
                                                </div>

                                                <div className="w-full h-px bg-white/10 my-2" />

                                                <div className="space-y-1">
                                                    <p className="font-bold text-orange-500">Meezan Bank</p>
                                                    <p>Account Title: <span className="text-white">MUHAMMAD HUZAIFA RIAZ</span></p>
                                                    <p>Account Number: <span className="text-white font-mono tracking-wider">01890110481675</span></p>
                                                </div>

                                                <p className="mt-2 text-xs text-yellow-500">Please send screenshot of payment to WhatsApp.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={() => setStep(1)} className="w-full h-12">
                                            Back
                                        </Button>
                                        <Button onClick={handlePlaceOrder} className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                                            Place Order
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-md mx-auto py-8"
                                >
                                    {/* Digital Receipt Card */}
                                    <div ref={receiptRef} className="bg-white text-black p-8 rounded-2xl shadow-2xl relative overflow-hidden mb-8">
                                        {/* Decorative top border */}
                                        <div className="absolute top-0 left-0 w-full h-2 bg-[#f97316]" />

                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dcfce7] text-[#16a34a] mb-4">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-black">Order Confirmed!</h2>
                                            <p className="text-[#6b7280] text-sm mt-1">Thank you, {formData.name}</p>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between border-b border-[#f3f4f6] pb-2">
                                                <span className="text-[#6b7280]">Order No.</span>
                                                <span className="font-mono font-bold text-black">#{orderId?.slice(0, 8)}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#f3f4f6] pb-2">
                                                <span className="text-[#6b7280]">Date</span>
                                                <span className="font-medium text-black">{confirmedOrder?.date}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#f3f4f6] pb-2">
                                                <span className="text-[#6b7280]">Customer</span>
                                                <div className="text-right">
                                                    <span className="font-medium block text-black">{formData.name}</span>
                                                    <span className="text-xs text-[#6b7280] block">{formData.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between border-b border-[#f3f4f6] pb-2">
                                                <span className="text-[#6b7280]">Payment Method</span>
                                                <span className="font-medium capitalize text-black">{confirmedOrder?.method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-[#111827] font-bold text-lg">Total Amount</span>
                                                <span className="text-[#ea580c] font-bold text-2xl">Rs. {confirmedOrder?.total.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="bg-[#f9fafb] rounded-lg p-4 text-center text-sm text-[#4b5563]">
                                            <p className="mb-2">Please take a screenshot or download this receipt & share on whatsapp.</p>
                                            {paymentMethod === 'bank' ? (
                                                <p className="text-[#ea580c] font-bold">Transfer payment & send screenshot to WhatsApp below.</p>
                                            ) : (
                                                <p className="text-[#16a34a] font-bold">Confirm your order on WhatsApp below.</p>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleDownloadReceipt}
                                        className="w-full mb-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-12 gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Receipt
                                    </Button>

                                    {/* WhatsApp Button */}
                                    <a
                                        href={`https://wa.me/923272487127?text=${encodeURIComponent(
                                            `Hi Deez Prints, I just placed Order #${orderId?.slice(0, 8)}.\n\nName: ${formData.name}\nTotal: Rs. ${confirmedOrder?.total}\nPayment Method: ${paymentMethod === 'bank' ? 'Bank Transfer' : 'COD'}\n\n${paymentMethod === 'bank' ? 'Here is my payment screenshot:' : 'Please confirm my order.'}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 mb-4"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        <span className="text-lg">Open WhatsApp & Send Screenshot</span>
                                    </a>

                                    <Button onClick={() => window.location.href = '/collections/all'} variant="ghost" className="text-zinc-400 hover:text-white">
                                        Continue Shopping
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Order Summary */}
                    {step !== 3 && (
                        <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 h-fit sticky top-24">
                            <h3 className="font-bold text-lg mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-zinc-800 border border-white/5 flex items-center justify-center text-xs">
                                                {item.quantity}x
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{item.title}</p>
                                                <p className="text-xs text-zinc-500">{item.selectedSize}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span>Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Shipping</span>
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="flex justify-between font-bold text-xl pt-4 border-t border-white/10 mt-4">
                                    <span>Total</span>
                                    <span className="text-white">Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}
