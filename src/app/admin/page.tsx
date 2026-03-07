"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { OrderRow } from "@/components/admin/OrderRow"
import { OrderSlip } from "@/components/admin/OrderSlip"
import { ProductManager } from "@/components/admin/ProductManager"
import { AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Package, LogOut } from "lucide-react"

interface Order {
    id: string
    created_at: string
    user_email: string
    payment_method: string
    total_amount: number
    items: any[]
    customer_details: any
    status: string
    is_read?: boolean
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    // Tab State
    const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders')

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    setIsAuthenticated(true)
                    if (session.user.email) setEmail(session.user.email)
                }
            } finally {
                setLoading(false)
            }
        }
        checkSession()
    }, [])

    useEffect(() => {
        if (isAuthenticated && activeTab === 'orders') {
            fetchOrders()
            const interval = setInterval(fetchOrders, 30000)
            return () => clearInterval(interval)
        }
    }, [isAuthenticated, activeTab])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null) // Clear any previous errors

        // EMERGENCY BACKDOOR FOR ADMIN
        if (email === "admin@deez.com" && password === "123123123") {
            console.log("Admin backdoor used")
            setIsAuthenticated(true)
            setLoading(false)
            return
        }

        // Try Supabase Auth first
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (!error) {
            setIsAuthenticated(true)
        } else {
            console.log("Login failed:", error.message)
            // Force update: 2026-02-17 18:22


            // If user not found, try auto-signup as a convenience
            if (error.message.includes("Invalid login credentials")) {
                console.log("Attempting auto-signup...")
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    }
                })

                if (!signUpError && signUpData.user) {
                    setIsAuthenticated(true)
                    alert("Account created! Please check your email to confirm your account before logging in.")
                } else {
                    // It might fail if user exists but password was wrong (not 'Invalid login credentials' but specifically auth fail)
                    // Or if signups are disabled
                    alert(`Login Failed: ${error.message}\n(Auto-signup also failed: ${signUpError?.message})`)
                }
            } else if (error.message.includes("Email not confirmed")) {
                alert("Login Failed: Email not confirmed. Please check your inbox and verify your email address.")
            } else {
                alert(`Login Failed: ${error.message}`)
            }
        }
        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setIsAuthenticated(false)
        setOrders([]) // Clear orders on logout
        setError(null) // Clear error on logout
    }

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/orders')
            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Failed to fetch orders from server")
                console.error("Fetch error:", data.error)
                return
            }

            const enhancedOrders = data.map((o: any) => ({
                ...o,
                is_read: o.is_read ?? false
            })) || []

            setOrders(enhancedOrders)
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred while fetching orders")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleRead = async (id: string, currentStatus: boolean) => {
        setOrders(orders.map(o => o.id === id ? { ...o, is_read: !currentStatus } : o))
        try {
            await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, is_read: !currentStatus })
            })
        } catch (err) {
            console.error("Failed to update read status:", err)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this order?")) return

        try {
            const response = await fetch(`/api/orders?id=${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setOrders(orders.filter(o => o.id !== id))
            } else {
                alert("Failed to delete order")
            }
        } catch (err) {
            console.error("Delete error:", err)
        }
    }

    const groupOrdersByDate = (orders: Order[]) => {
        const groups: { [key: string]: Order[] } = {}
        orders.forEach(order => {
            const date = new Date(order.created_at)
            const today = new Date()
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            let dateKey = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            if (date.toDateString() === today.toDateString()) dateKey = "Today"
            else if (date.toDateString() === yesterday.toDateString()) dateKey = "Yesterday"
            if (!groups[dateKey]) groups[dateKey] = []
            groups[dateKey].push(order)
        })
        return groups
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
                <Container>
                    <div className="max-w-md mx-auto bg-zinc-900 border border-white/10 p-8 rounded-xl shadow-2xl">
                        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded px-4 py-2 text-white focus:border-white/30 outline-none" placeholder="admin@deez.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded px-4 py-2 text-white focus:border-white/30 outline-none" placeholder="••••••••" />
                            </div>
                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        )
    }

    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            order.id.toLowerCase().includes(query) ||
            order.customer_details?.name?.toLowerCase().includes(query) ||
            order.customer_details?.email?.toLowerCase().includes(query) ||
            order.customer_details?.phone?.toLowerCase().includes(query)
        )
    })

    const groupedOrders = groupOrdersByDate(filteredOrders)

    return (
        <div className="min-h-screen pt-24 pb-20 bg-black text-white">
            <Container>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
                        <p className="text-zinc-400">Manage and track your customer orders</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchOrders}
                            disabled={loading}
                            className="bg-zinc-900 border-white/10"
                        >
                            Refresh Orders
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-8 flex flex-col gap-2">
                        <p className="font-bold">Error loading orders:</p>
                        <p className="text-sm font-mono bg-black/30 p-2 rounded">{error}</p>
                        <p className="text-xs text-zinc-400">This usually means your Supabase project is having DNS/Connection issues or the Database Rules (RLS) are blocking access.</p>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Orders</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-zinc-900 border border-white/10 rounded-md text-sm text-white focus:border-white/30 outline-none w-64"
                        />
                    </div>
                </div>

                {loading && orders.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedOrders).map(([date, dateOrders]) => (
                            <div key={date}>
                                <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 sticky top-20 bg-black/80 backdrop-blur-sm py-2 z-10">
                                    {date}
                                    <span className="ml-2 bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-xs normal-case">{dateOrders.length} orders</span>
                                </h2>
                                <div className="space-y-3">
                                    <AnimatePresence mode="popLayout">
                                        {dateOrders.map((order) => (
                                            <OrderRow
                                                key={order.id}
                                                order={order}
                                                onView={setSelectedOrder}
                                                onToggleRead={handleToggleRead}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}

                        {orders.length === 0 && !loading && (
                            <div className="text-center py-20 text-zinc-500 bg-zinc-900/50 rounded-xl border border-dashed border-white/10">
                                <p className="text-lg">No orders found yet.</p>
                                <p className="text-sm mt-2">New orders will appear here automatically.</p>
                            </div>
                        )}
                    </div>
                )}
            </Container>

            {selectedOrder && (
                <OrderSlip order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    )
}
