import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { email, name, phone, orderId, total, items, paymentMethod } = body;

    // Validate required fields exist
    if (!email || !name || !orderId || typeof total !== 'number' || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }

    // 1. Send Confirmation to User
    const userEmail = await resend.emails.send({
      from: 'Deez Prints <onboarding@resend.dev>',
      to: [email],
      subject: `Order Confirmation #${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Thanks for your order, ${name}!</h1>
            <p>Your order <strong>#${orderId}</strong> has been received.</p>
            
            <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin-top: 0;">Total: Rs. ${total.toLocaleString()}</h2>
                
                <h3>Items:</h3>
                <ul style="padding-left: 20px;">
                  ${items.map((item: any) => `
                    <li>
                      ${item.quantity}x ${item.title} (${item.selectedSize}) - Rs. ${(item.price * item.quantity).toLocaleString()}
                    </li>
                  `).join('')}
                </ul>
            </div>

            <div style="border-left: 4px solid #F97316; padding-left: 20px; margin: 30px 0;">
                <h3>⚠️ Action Required</h3>
                <p><strong>If you chose Bank Transfer:</strong></p>
                <ol>
                    <li>Please transfer <strong>Rs. ${total.toLocaleString()}</strong> to one of our accounts (details on website).</li>
                    <li>Take a screenshot of the payment receipt.</li>
                    <li>Send the screenshot to our WhatsApp below.</li>
                </ol>
                <p><strong>If you chose Cash on Delivery:</strong></p>
                <p>Please click the button below to confirm your order details on WhatsApp.</p>
            </div>

            <a href="https://wa.me/923272487127" style="display: inline-block; background-color: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Open WhatsApp to Confirm Order / Send Screenshot
            </a>
            
            <p style="margin-top:20px;"><strong>Contact Info Provided:</strong><br/>Phone: ${phone}<br/>Email: ${email}</p>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                If the button above doesn't work, message us at: <strong>+92 327 2487127</strong>
            </p>
        </div>
      `,
    });

    return NextResponse.json(userEmail);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
