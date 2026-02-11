"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            router.push("/")
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tighter">Welcome Back</h1>
                <p className="text-gray-400">Enter your credentials to access your account</p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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

                <div className="flex justify-end">
                    <Link href="/auth/forgot-password" className="text-sm text-orange-500 hover:text-orange-400">
                        Forgot password?
                    </Link>
                </div>

                <Button disabled={loading} className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-white hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
