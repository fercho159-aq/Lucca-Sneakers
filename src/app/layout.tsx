import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import { DEFAULT_METADATA, getOrganizationJsonLd, getWebsiteJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
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
  ...DEFAULT_METADATA,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-[family-name:var(--font-body)] bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        <JsonLd data={getOrganizationJsonLd()} />
        <JsonLd data={getWebsiteJsonLd()} />
        {children}
      </body>
    </html>
  )
}
