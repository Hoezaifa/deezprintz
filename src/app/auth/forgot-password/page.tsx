"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            })

            if (error) throw error

            setMessage("Check your email for the password reset link.")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tighter">Reset Password</h1>
                <p className="text-gray-400">Enter your email to receive a reset link</p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            {message && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm text-center">
                    {message}
                </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 outline-none transition-colors"
                        placeholder="name@example.com"
                    />
                </div>

                <Button disabled={loading} className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                    {loading ? "Sending Link..." : "Send Reset Link"}
                </Button>
            </form>

            <div className="text-center text-sm">
                <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                    Back to Login
                </Link>
            </div>
        </div>
    )
}
