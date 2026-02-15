import { X, Printer, MapPin, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderSlipProps {
    order: any
    onClose: () => void
}

export function OrderSlip({ order, onClose }: OrderSlipProps) {
    if (!order) return null

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto pt-10 md:pt-20">
            <div className="bg-white text-black w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative mb-20">
                {/* Header */}
                <div className="bg-zinc-100 p-4 flex justify-between items-center border-b no-print">
                    <h2 className="font-bold text-lg">Order Details</h2>
                    <div className="flex gap-2">
                        <Button variant="default" size="sm" onClick={handlePrint} className="gap-2 bg-black text-white hover:bg-zinc-800">
                            <Printer className="w-4 h-4" />
                            Print
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Printable Content */}
                <div className="p-8 print:p-0" id="order-slip">
                    {/* Slip Header */}
                    <div className="flex justify-between items-start mb-8 border-b pb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">DEEZ PRINTS</h1>
                            <p className="text-zinc-500 text-sm">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-zinc-500 text-sm">{new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}</p>
                        </div>
                        <div className="text-right">
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                }`}>
                                {order.status.toUpperCase()}
                            </div>
                            <p className="text-zinc-600 font-medium">
                                {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Customer Info */}
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <User className="w-3 h-3" /> Customer
                            </h3>
                            <div className="bg-zinc-50 p-4 rounded-lg">
                                <p className="font-bold text-lg mb-1">{order.customer_details?.name}</p>
                                <div className="space-y-1 text-zinc-600 text-sm">
                                    <p className="flex items-center gap-2">
                                        <Mail className="w-3 h-3" /> {order.customer_details?.email}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> {order.customer_details?.phone}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Shipping Address
                            </h3>
                            <div className="bg-zinc-50 p-4 rounded-lg text-sm text-zinc-700">
                                <p>{order.customer_details?.address}</p>
                                <p>{order.customer_details?.city}</p>
                                {/* Add postal code or other details if available */}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Items Ordered</h3>
                        <table className="w-full text-sm">
                            <thead className="bg-zinc-100 border-b border-zinc-200">
                                <tr>
                                    <th className="text-left py-2 px-3 font-medium text-zinc-600">Item</th>
                                    <th className="text-center py-2 px-3 font-medium text-zinc-600">Size</th>
                                    <th className="text-center py-2 px-3 font-medium text-zinc-600">Qty</th>
                                    <th className="text-right py-2 px-3 font-medium text-zinc-600">Price</th>
                                    <th className="text-right py-2 px-3 font-medium text-zinc-600">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {order.items?.map((item: any, i: number) => (
                                    <tr key={i}>
                                        <td className="py-3 px-3">
                                            <p className="font-medium text-zinc-900">{item.title || item.name}</p>
                                        </td>
                                        <td className="py-3 px-3 text-center text-zinc-600">{item.selectedSize || '-'}</td>
                                        <td className="py-3 px-3 text-center text-zinc-600">{item.quantity}</td>
                                        <td className="py-3 px-3 text-right text-zinc-600">Rs. {item.price.toLocaleString()}</td>
                                        <td className="py-3 px-3 text-right font-medium text-zinc-900">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-t border-zinc-200">
                                <tr>
                                    <td colSpan={4} className="py-4 px-3 text-right font-bold text-zinc-600">Total Amount</td>
                                    <td className="py-4 px-3 text-right font-bold text-lg">Rs. {order.total_amount?.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-zinc-400 pt-8 border-t border-dashed">
                        <p>Thank you for shopping with Deez Prints!</p>
                        <p>For any queries, please contact support.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
