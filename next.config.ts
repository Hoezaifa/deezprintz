const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https:;
    style-src 'self' 'unsafe-inline' https:;
    img-src 'self' data: blob: https:;
    font-src 'self' https:;
    connect-src 'self' https:;
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
`.replace(/\n/g, '');

const nextConfig: any = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
