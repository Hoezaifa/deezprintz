"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState("Verifying your email...")
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // The implicit flow often handles the session automatically via the URL structure
                // We just need to wait for the session to be established
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) throw error

                if (session) {
                    setStatus('success')
                    setMessage("Email verified successfully! You can now access your account.")
                    // Optional: Redirect after a few seconds
                    setTimeout(() => router.push('/'), 3000)
                } else {
                    // Sometimes the session might take a moment if it's being set from the hash
                    // Listen for auth state change
                    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                        if (event === 'SIGNED_IN' || session) {
                            setStatus('success')
                            setMessage("Email verified successfully! You can now access your account.")
                            setTimeout(() => router.push('/'), 3000)
                        }
                    })

                    // Fallback if nothing happens after a timeout
                    setTimeout(() => {
                        if (status === 'loading') {
                            setStatus('error')
                            setMessage("Could not verify email. The link may be invalid or expired, or you might already be verified.")
                        }
                    }, 5000)

                    return () => subscription.unsubscribe()
                }

            } catch (err: any) {
                console.error("Auth Callback Error:", err)
                setStatus('error')
                setMessage(err.message || "An error occurred during verification.")
            }
        }

        handleAuthCallback()
    }, [router, status])

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-950/50 border border-white/10 rounded-2xl p-8 text-center space-y-6 backdrop-blur-sm">

                {status === 'loading' && (
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
                        <h2 className="text-2xl font-bold text-white">Verifying...</h2>
                        <p className="text-gray-400">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h2 className="text-2xl font-bold text-white">Verified!</h2>
                        <p className="text-gray-300">{message}</p>
                        <Button
                            onClick={() => router.push('/')}
                            className="w-full bg-white text-black hover:bg-zinc-200 font-bold"
                        >
                            Continue to Home
                        </Button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center space-y-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
                        <p className="text-red-400">{message}</p>
                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/auth/login')}
                                className="flex-1 border-white/10 hover:bg-white/5"
                            >
                                Back to Login
                            </Button>
                            <Button
                                onClick={() => router.push('/auth/signup')}
                                className="flex-1 bg-white text-black hover:bg-zinc-200"
                            >
                                Sign Up Again
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
