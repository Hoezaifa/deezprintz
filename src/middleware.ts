import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
    'https://deezprints.store',
    'https://www.deezprints.store',
    'http://localhost:3000', // Remove or comment out for strict production only
];

// Simple in-memory rate limiting (Note: In standard Vercel Edge deployments without KV, memory is not shared across lambda instances. 
// This provides basic protection per edge instance. For robust limits, consider Vercel KV).
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute per IP

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;

    // 1. CORS Configuration
    const origin = request.headers.get('origin') ?? '';
    const isApiRoute = path.startsWith('/api/');

    if (isApiRoute) {
        if (ALLOWED_ORIGINS.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        } else if (origin) {
            // Reject unauthorized origins explicitly
            return new NextResponse('Forbidden API Origin', { status: 403 });
        }
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }

    // 2. Rate Limiting for sensitive routes
    const isSensitiveRoute = isApiRoute || path.startsWith('/checkout') || path.startsWith('/auth');

    if (isSensitiveRoute) {
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

        let ipData = rateLimitMap.get(ip);
        const now = Date.now();

        if (!ipData) {
            ipData = { count: 0, timestamp: now };
        }

        // Reset window if passed
        if (now - ipData.timestamp > RATE_LIMIT_WINDOW) {
            ipData.count = 0;
            ipData.timestamp = now;
        }

        ipData.count++;
        rateLimitMap.set(ip, ipData);

        // Periodically clean up map to prevent memory leaks in edge cache
        if (rateLimitMap.size > 10000) {
            rateLimitMap.clear();
        }

        if (ipData.count > MAX_REQUESTS) {
            return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': '60'
                }
            });
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
