import { Container } from "@/components/ui/container"

export default function FAQPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <Container>
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
                        <p className="text-muted-foreground">
                            Everything you need to know about Deez Prints.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 space-y-2">
                                <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

const faqs = [
    {
        question: "How long does delivery take?",
        answer: "Standard delivery time is 3-5 working days across Pakistan. Orders placed before 1 PM are usually dispatched the same day."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Cash on Delivery (COD) and Bank Transfers (Meezan Bank, Easypaisa, Jazzcash, SadaPay)."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only ship within Pakistan. However, we plan to expand internationally in the future."
    },
    {
        question: "Can I cancel my order?",
        answer: "You can cancel your order before it has been dispatched. Once dispatched, the order cannot be cancelled. Please contact us on WhatsApp immediately for cancellations."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is dispatched, we will send you a tracking number via Email/SMS which you can use to track your package."
    },
    {
        question: "What is your exchange policy?",
        answer: "We offer a 7-day exchange policy for size issues or defects. Please verify the size chart before ordering. Items must be unworn and in original condition."
    }
]
