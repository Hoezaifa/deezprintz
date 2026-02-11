"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Container } from "@/components/ui/container"

export default function AdminPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setOrders(data || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-black text-white">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Order Dashboard</h1>
                    <button
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-white text-black rounded hover:bg-zinc-200"
                    >
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-zinc-900 border border-white/10 p-6 rounded-xl">
                                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-orange-500 font-bold">#{order.id.slice(0, 8)}</span>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400">
                                            {new Date(order.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl">Rs. {order.total_amount?.toLocaleString()}</p>
                                        <p className="text-sm capitalize text-zinc-400">{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                                    {/* Customer Info */}
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Customer</h3>
                                        <p className="font-bold">{order.customer_details?.name}</p>
                                        <p className="text-zinc-300">{order.customer_details?.email}</p>
                                        <p className="text-zinc-300">{order.customer_details?.phone}</p>
                                        <p className="text-zinc-400 text-sm mt-1">
                                            {order.customer_details?.address}, {order.customer_details?.city}
                                        </p>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Items</h3>
                                        <div className="space-y-2">
                                            {order.items?.map((item: any, i: number) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span>{item.quantity}x {item.title} ({item.selectedSize})</span>
                                                    <span className="text-zinc-500">Rs. {item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {orders.length === 0 && (
                            <div className="text-center py-20 text-zinc-500">
                                No orders found.
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    )
}
