export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black/95 bg-[url('/assets/noise.png')]">
            <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {children}
            </div>
        </div>
    )
}
