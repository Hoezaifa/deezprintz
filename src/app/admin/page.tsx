"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { OrderRow } from "@/components/admin/OrderRow"
import { OrderSlip } from "@/components/admin/OrderSlip"
import { AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders()
            // Poll for new orders every 30 seconds
            const interval = setInterval(fetchOrders, 30000)
            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "admin@deez.com" && password === "123123123") {
            setIsAuthenticated(true)
        } else {
            alert("Invalid credentials")
        }
    }

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Supabase error:", error)
                // If table doesn't exist or other error, fallback to mock data for demo if needed
                // But for now, let's just show empty or handle gracefully
            }

            // Add is_read field locally if it doesn't exist in DB yet (for backward compat)
            const enhancedOrders = data?.map(o => ({
                ...o,
                is_read: o.is_read ?? false // Default to unread (false) if field missing
            })) || []

            setOrders(enhancedOrders)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleRead = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        setOrders(orders.map(o => o.id === id ? { ...o, is_read: !currentStatus } : o))

        try {
            const { error } = await supabase
                .from('orders')
                .update({ is_read: !currentStatus })
                .eq('id', id)

            if (error) {
                console.error("Supabase Error Details:", error)
                throw error
            }
        } catch (err: any) {
            console.error("Failed to update read status:", err)
            // Revert on error
            setOrders(orders.map(o => o.id === id ? { ...o, is_read: currentStatus } : o))

            // Check if it's a known schema error (though specific message might vary)
            if (err.message?.includes('column') || err.message?.includes('is_read') || JSON.stringify(err).includes('is_read')) {
                alert("Error: Database outdated. Please run the SQL script to add 'is_read' column.")
            } else {
                alert(`Failed to update status. Error: ${err.message || JSON.stringify(err) || 'Unknown error'}`)
            }
        }
    }

    const handleDelete = async (id: string) => {
        // Optimistic update
        const backup = [...orders]
        setOrders(orders.filter(o => o.id !== id))

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (err) {
            console.error("Failed to delete order", err)
            setOrders(backup)
            alert("Failed to delete order")
        }
    }

    const groupOrdersByDate = (orders: any[]) => {
        const groups: { [key: string]: any[] } = {}

        orders.forEach(order => {
            const date = new Date(order.created_at)
            const today = new Date()
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)

            let dateKey = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

            if (date.toDateString() === today.toDateString()) {
                dateKey = "Today"
            } else if (date.toDateString() === yesterday.toDateString()) {
                dateKey = "Yesterday"
            }

            if (!groups[dateKey]) {
                groups[dateKey] = []
            }
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
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-800 border border-white/10 rounded px-4 py-2 text-white focus:border-white/30 outline-none"
                                    placeholder="admin@deez.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-800 border border-white/10 rounded px-4 py-2 text-white focus:border-white/30 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold">
                                Login
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Order Dashboard</h1>
                        <p className="text-zinc-500 text-sm">Manage and track your incoming orders</p>
                    </div>
                    <div className="flex gap-4">
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
                        <Button
                            variant="outline"
                            onClick={fetchOrders}
                            className="bg-transparent border-white/20 hover:bg-zinc-900 text-white"
                        >
                            Refresh
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setIsAuthenticated(false)}
                        >
                            Logout
                        </Button>
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

            {/* Order Slip Modal */}
            {selectedOrder && (
                <OrderSlip
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    )
}
