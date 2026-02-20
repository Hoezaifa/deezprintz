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

    const handleGoogleSignup = async () => {
        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                }
            })
            if (error) throw error
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

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
            // Handle Supabase specific error structure or standard error message
            const errorMessage = err?.message || err?.error_description || "An error occurred"

            if (errorMessage.toLowerCase().includes("rate limit") || err.status === 429) {
                // Don't error spam console for rate limits, just warn
                console.warn("Supabase Signup Rate Limit Hit:", errorMessage)
                setError("Security Limit Reached: Too many signup attempts. Please wait 15-60 minutes or use a different email.")
            } else if (errorMessage.toLowerCase().includes("already registered")) {
                console.warn("User already registered:", email)
                setError("This email is already registered. Please log in.")
                setTimeout(() => router.push("/auth/login"), 2000)
            } else {
                console.error("Signup Error:", err)
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

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full h-12 text-md font-bold bg-zinc-950 border-white/10 text-white hover:bg-white/5 hover:text-white flex items-center justify-center gap-3 transition-colors"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Google
            </Button>

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
