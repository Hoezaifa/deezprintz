import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, phone, orderId, total, items, paymentMethod } = await request.json();

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

    // 2. Send Alert to Admin (Process env email or hardcoded fallback for now if verified)
    // Since we are likely on free tier without domain, we can only send to the verified email.
    // Assuming the user's email 'huzaifa...' is the verified one.
    // We will send a copy to the same email as the 'to' if it matches the verified one, 
    // OR we just try to send to the admin email if provided in env var.

    // console.log("Email sent to user:", userEmail);

    return NextResponse.json(userEmail);
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
