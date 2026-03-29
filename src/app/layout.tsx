import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Lucca Sneakers | Tenis Premium en Tepito, CDMX',
  description: 'Tenis de calidad premium al mejor precio. +200 modelos en tendencia. Menudeo desde $650 MXN, mayoreo desde $550 MXN. Tepito, Ciudad de México.',
  keywords: ['tenis', 'sneakers', 'tepito', 'cdmx', 'mayoreo', 'nike', 'adidas', 'jordan'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-[family-name:var(--font-body)] bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  )
}
