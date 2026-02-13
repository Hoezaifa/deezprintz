import { motion } from "framer-motion"
import { Eye, Trash2, CheckCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderRowProps {
    order: any
    onView: (order: any) => void
    onToggleRead: (id: string, currentStatus: boolean) => void
    onDelete: (id: string) => void
}

export function OrderRow({ order, onView, onToggleRead, onDelete }: OrderRowProps) {
    const isRead = order.is_read || false

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.01, backgroundColor: isRead ? "rgba(39, 39, 42, 1)" : "rgba(24, 24, 27, 1)" }}
            transition={{ duration: 0.2 }}
            className={`
            flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer
            ${isRead ? 'bg-zinc-900/50 border-white/5 opacity-80' : 'bg-zinc-900 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}
            group
        `}>
            {/* Left Section: Info */}
            <div className="flex items-center gap-4 flex-1" onClick={() => onView(order)}>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`w-2 h-2 rounded-full ${isRead ? 'bg-zinc-700' : 'bg-orange-500'}`}
                />

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <div>
                        <p className={`font-mono text-sm ${!isRead && 'font-bold text-white'}`}>#{order.id?.slice(0, 8)}</p>
                        <p className="text-xs text-zinc-500">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>

                    <div className="hidden md:block">
                        <p className={`text-sm ${!isRead ? 'text-white font-medium' : 'text-zinc-400'}`}>{order.customer_details?.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{order.customer_details?.email}</p>
                    </div>

                    <div className="text-right md:text-left">
                        <p className="font-bold text-sm">Rs. {order.total_amount?.toLocaleString()}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${order.status === 'pending' ? 'border-yellow-500/30 text-yellow-500' : 'border-green-500/30 text-green-500'
                            }`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="hidden md:block text-right text-xs text-zinc-500">
                        {order.items?.length} Items
                    </div>
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/5 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-400 hover:text-white"
                    onClick={(e) => { e.stopPropagation(); onToggleRead(order.id, isRead); }}
                    title={isRead ? "Mark as Unread" : "Mark as Read"}
                >
                    {isRead ? <Circle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-orange-500" />}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-400 hover:text-white"
                    onClick={() => onView(order)}
                    title="View Details"
                >
                    <Eye className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this order?')) onDelete(order.id);
                    }}
                    title="Delete Order"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    )
}
