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

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase API fetch error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, is_read } = await req.json();
        const { error } = await supabase
            .from('orders')
            .update({ is_read })
            .eq('id', id);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
