import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { PRODUCTS } from '@/lib/products';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid or missing messages array' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const systemPrompt = `
You are a helpful, friendly, and knowledgeable AI shopping assistant for "Deez Prints", a premium e-commerce store in Pakistan.
You have access to the following product catalog:
${JSON.stringify(PRODUCTS, null, 2)}

Your Goal:
- Turning visitors into actual customers.
- Assist customers in finding products.
- Answer questions about product details (price, materials, etc.).
- Maintain a fun, "Deez Prints" specific vibe (energetic, streetwear-focused, helpful).
- If asked about prices, always mention PKR.
- If a user asks for a specific product, recommend it from the list if available.
- If a user asks for "Kanye", "Seedhe Maut", or specific artists, filter the products and suggest them.
- Do not make up products. Only use the provided list.
- If you don't know something, say you'll check with the team or ask them to contact support.
- Keep responses concise and easy to read on a chat interface.

Store Policies (General Info):
- Shipping: We ship nationwide in Pakistan.
- Returns: Easy returns within 7 days for defective items.
- Payment: Bank Transfer available.
        `;

        const result = streamText({
            model: google('gemini-flash-latest'),
            messages,
            system: systemPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error. Unable to process request.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
