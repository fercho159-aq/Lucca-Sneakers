'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales incorrectas')
      } else {
        router.push('/admin')
      }
    } catch {
      setError('Error al iniciar sesion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest text-white">
            LUCCA ADMIN
          </h1>
          <div className="mt-2 mx-auto h-1 w-12 bg-[var(--color-gold)]" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#1A1A1A] border border-white/5 p-6"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-2.5 text-sm text-[#EF4444]">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
              placeholder="admin@lucca.com"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm text-gray-400">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-6 py-3 font-bold text-black transition-all hover:bg-[var(--color-gold-dark)] cursor-pointer disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Iniciando...' : 'Iniciar Sesion'}
          </button>
        </form>
      </div>
    </div>
  )
}
