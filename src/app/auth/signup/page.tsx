"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            })

            if (error) throw error

            // Show success dialog instead of alert
            setShowSuccessDialog(true)

        } catch (err: any) {
            console.error("Signup Error:", err)
            // Handle Supabase specific error structure or standard error message
            const errorMessage = err?.message || err?.error_description || "An error occurred"

            if (errorMessage.toLowerCase().includes("rate limit") || err.status === 429) {
                setError("Security Limit Reached: Too many signup attempts. Please wait a while or try a different email.")
            } else if (errorMessage.toLowerCase().includes("already registered")) {
                setError("This email is already registered. Please log in.")
                setTimeout(() => router.push("/auth/login"), 2000)
            } else {
                setError(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCloseDialog = () => {
        setShowSuccessDialog(false)
        router.push("/auth/login")
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tighter">Create Account</h1>
                <p className="text-gray-400">Join Deez Prints today</p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 outline-none transition-colors"
                        placeholder="John Doe"
                    />
                </div>
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
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 outline-none transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <Button disabled={loading} className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                    {loading ? "Create Account" : "Sign Up"}
                </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-white hover:underline">
                    Log in
                </Link>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={handleCloseDialog}>
                <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                            <div className="space-y-1">
                                <DialogTitle className="text-xl">Account Created!</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Welcome to Deez Prints.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-gray-300">
                            We've sent a verification link to <strong>{email}</strong>.
                            <br /><br />
                            Please check your email to activate your account.
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            className="w-full bg-white text-black hover:bg-zinc-200"
                            onClick={handleCloseDialog}
                        >
                            Okay, Got it
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
