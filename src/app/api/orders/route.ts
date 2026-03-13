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

        // 2. Send Telegram Notification
        try {
            const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
            const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

            if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
                let itemsList = items.map((item: any) => 
                    `- ${item.title} (Size: ${item.selectedSize}) x${item.quantity}`
                ).join('\n');

                const message = `🛒 *NEW ORDER*

*Order ID:* ${order.id}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*City:* ${formData.city}

*Products:*
${itemsList}

*Total:* Rs ${cartTotal.toLocaleString()}

*WhatsApp:*
[Chat with Customer](https://wa.me/${formData.phone.replace(/[^0-9]/g, '')})`;

                const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
                
                // Fire and forget, don't await so it doesn't block the response
                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                }).catch(err => console.error("Telegram exact fetch error:", err));
            } else {
                console.warn("Telegram credentials not found in environment variables.");
            }
        } catch (err) {
            console.error("Telegram notification construction failed", err);
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
