import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top bar */}
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <span className="font-[family-name:var(--font-display)] text-xl tracking-widest text-white">
            LUCCA ADMIN
          </span>
          <Link
            href="/"
            className="text-sm text-gray-400 transition-colors hover:text-gold"
          >
            Volver al sitio &rarr;
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
