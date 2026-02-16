"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CATEGORIES = [
    { label: "T-Shirts", value: "t-shirts", dbCategory: "t-shirts", hasColors: true, subcategories: ["regular", "drop-shoulder", "acid-wash", "graphic"] },
    { label: "Hoodies", value: "hoodies", dbCategory: "hoodies", hasColors: true, subcategories: ["original", "zip-up", "pullover"] },
    { label: "Jerseys", value: "jerseys", dbCategory: "jerseys", hasColors: false }, // User said jerseys might have variants but usually unique via ID/Title. Stick to no colors for now unless requested.
    { label: "Mugs", value: "mugs", dbCategory: "accessories", subcategoryValue: "mugs", hasColors: false },
    { label: "Flags", value: "flags", dbCategory: "accessories", subcategoryValue: "flags", hasColors: false },
    { label: "Tapestries", value: "tapestries", dbCategory: "accessories", subcategoryValue: "tapestries", hasColors: false },
    { label: "V- Neck", value: "v-neck", dbCategory: "t-shirts", subcategoryValue: "v-neck", hasColors: true }, // Example if needed, but sticking to user request
    { label: "Wristbands", value: "wristbands", dbCategory: "accessories", subcategoryValue: "wristbands", hasColors: false },
    { label: "Badges", value: "badges", dbCategory: "accessories", subcategoryValue: "badges", hasColors: false },
    { label: "Wallet Cards", value: "wallet-cards", dbCategory: "accessories", subcategoryValue: "wallet-cards", hasColors: false },
    { label: "Keychains", value: "keychains", dbCategory: "accessories", subcategoryValue: "keychains", hasColors: false },
    { label: "Magnets", value: "magnets", dbCategory: "accessories", subcategoryValue: "magnets", hasColors: false },
    { label: "Notebooks", value: "notebooks", dbCategory: "accessories", subcategoryValue: "notebooks", hasColors: false },
    { label: "Gift Boxes", value: "gift-boxes", dbCategory: "accessories", subcategoryValue: "gift-boxes", hasColors: false },
]

// Types matching the DB schema
export interface Product {
    id: string
    title: string
    price: number
    image: string
    category: string
    subcategory?: string
    artist?: string
    rating: number
    colors?: string[]
}

export function ProductManager() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        title: "",
        price: 0,
        image: "",
        category: "",
        subcategory: "",
        artist: "",
        rating: 5,
        colors: []
    })

    const [selectedType, setSelectedType] = useState("")

    const getTypeFromProduct = (product: Partial<Product>) => {
        return CATEGORIES.find(c =>
            c.dbCategory === product.category &&
            (c.subcategoryValue ? c.subcategoryValue === product.subcategory : true)
        )?.value || ""
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setProducts(data)
        if (error) console.error("Error fetching products:", error)
        setLoading(false)
    }

    const handleSeed = async () => {
        if (!confirm("This will add all default products to the database. Continue?")) return
        setLoading(true)
        try {
            // Import dynamically to avoid server/client issues if needed, but standard import is fine here if file is pure JS/TS
            const { PRODUCTS } = await import('@/lib/products')

            const productsToInsert = PRODUCTS.map(p => {
                // Remove the string ID to let Supabase generate UUIDs
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...rest } = p
                return rest
            })

            const { error } = await supabase.from('products').insert(productsToInsert)
            if (error) throw error

            alert("Products seeded successfully!")
            fetchProducts()
        } catch (error: any) {
            console.error("Seeding error:", error)
            alert(`Failed to seed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            if (editingProduct) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', editingProduct.id)
                if (error) throw error
            } else {
                // Create
                const { error } = await supabase
                    .from('products')
                    .insert([formData])
                if (error) throw error
            }
            fetchProducts()
            setIsDialogOpen(false)
            resetForm()
        } catch (error) {
            console.error("Error saving product:", error)
            alert(`Failed to save product: ${(error as any).message || error}`)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)
            if (error) throw error
            setProducts(products.filter(p => p.id !== id))
        } catch (error) {
            console.error("Error deleting product:", error)
            alert("Failed to delete product")
        }
    }

    const startEdit = (product: Product) => {
        setEditingProduct(product)
        setFormData(product)
        setSelectedType(getTypeFromProduct(product))
        setIsDialogOpen(true)
    }

    const resetForm = () => {
        setEditingProduct(null)
        setSelectedType("")
        setFormData({
            title: "",
            price: 0,
            image: "",
            category: "",
            subcategory: "",
            artist: "",
            rating: 5,
            colors: []
        })
    }

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSeed} className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
                        Seed Defaults
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) resetForm()
                    }}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price (PKR)</Label>
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Product Type</Label>
                                        <Select
                                            value={selectedType}
                                            onValueChange={(value) => {
                                                setSelectedType(value)
                                                const category = CATEGORIES.find(c => c.value === value)
                                                if (category) {
                                                    setFormData({
                                                        ...formData,
                                                        category: category.dbCategory,
                                                        subcategory: category.subcategoryValue || category.subcategories?.[0] || "",
                                                        colors: category.hasColors ? formData.colors : []
                                                    })
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Conditional Subcategory */}
                                    {(() => {
                                        const selectedCategory = CATEGORIES.find(c => c.value === selectedType)
                                        if (selectedCategory?.subcategories) {
                                            return (
                                                <div className="space-y-2">
                                                    <Label>Subcategory / Fit</Label>
                                                    <Select
                                                        value={formData.subcategory}
                                                        onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                                                    >
                                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                            <SelectValue placeholder="Select Fit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {selectedCategory.subcategories.map((sub) => (
                                                                <SelectItem key={sub} value={sub}>
                                                                    {sub.charAt(0).toUpperCase() + sub.slice(1).replace('-', ' ')}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className="space-y-2">
                                                <Label>Subcategory (Auto)</Label>
                                                <Input
                                                    value={formData.subcategory || "None"}
                                                    disabled
                                                    className="bg-zinc-800 border-zinc-700 opacity-50 cursor-not-allowed"
                                                />
                                            </div>
                                        )
                                    })()}
                                </div>

                                {/* Conditional Colors */}
                                {(() => {
                                    const selectedCategory = CATEGORIES.find(c => c.value === selectedType)
                                    if (selectedCategory?.hasColors) {
                                        return (
                                            <div className="space-y-2">
                                                <Label>Colors (Comma separated)</Label>
                                                <Input
                                                    value={formData.colors?.join(", ") || ""}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        colors: e.target.value.split(",").map(c => c.trim()).filter(Boolean)
                                                    })}
                                                    placeholder="e.g. Black, White, Navy"
                                                    className="bg-zinc-800 border-zinc-700"
                                                />
                                                <p className="text-xs text-zinc-500">Available for Hoodies, T-Shirts, etc.</p>
                                            </div>
                                        )
                                    }
                                    return null
                                })()}

                                <div className="space-y-2">
                                    <Label>Image URL (or Path)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="/assets/products/..."
                                            className="bg-zinc-800 border-zinc-700 flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-500">For now, manually paste the path or URL. Drag & Drop upload coming soon.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Artist / Brand</Label>
                                        <Input
                                            value={formData.artist || ""}
                                            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Rating (0-5)</Label>
                                        <Input
                                            type="number"
                                            max={5}
                                            min={0}
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>

                                <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold mt-4">
                                    {editingProduct ? "Update Product" : "Create Product"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {
                loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                    </div>
                ) : (
                    <div className="rounded-md border border-white/10 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-zinc-900">
                                <TableRow className="border-white/10 hover:bg-zinc-900">
                                    <TableHead className="text-zinc-400">Image</TableHead>
                                    <TableHead className="text-zinc-400">Title</TableHead>
                                    <TableHead className="text-zinc-400">Category</TableHead>
                                    <TableHead className="text-zinc-400">Price</TableHead>
                                    <TableHead className="text-right text-zinc-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="border-white/10 hover:bg-zinc-800/50">
                                        <TableCell>
                                            <div className="h-10 w-10 relative rounded overflow-hidden bg-zinc-800">
                                                {product.image && (
                                                    <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-white">{product.title}</TableCell>
                                        <TableCell className="text-zinc-400">
                                            {product.category}
                                            {product.subcategory && <span className="text-xs ml-2 opacity-50">({product.subcategory})</span>}
                                        </TableCell>
                                        <TableCell className="text-white">Rs. {product.price.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => startEdit(product)}>
                                                    <Pencil className="h-4 w-4 text-blue-400" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )
            }
        </div >
    )
}
