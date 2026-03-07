import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formData, items, cartTotal, paymentMethod } = body;

        // 1. Save to Supabase Server-side (bypasses browser CORS/DNS issues entirely)
        const { data: order, error } = await supabase
            .from('orders')
            .insert({
                user_email: formData.email,
                payment_method: paymentMethod,
                total_amount: cartTotal,
                items: items,
                customer_details: formData,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase API insert error:", error);
            return NextResponse.json(
                { error: error.message || "Failed to insert into Supabase database" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });

    } catch (error: any) {
        console.error("Checkout API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal API route error" },
            { status: 500 }
        );
    }
}
