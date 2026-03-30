import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { SOCIAL_LINKS, WHATSAPP_URL } from '@/lib/constants'

const QUICK_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Modelos', href: '/catalogo' },
  { label: 'Distribución', href: '/mayoreo' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]

const SOCIALS = [
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: FaTiktok, href: SOCIAL_LINKS.tiktok, label: 'TikTok' },
  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: FaWhatsapp, href: WHATSAPP_URL, label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A] py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
        {/* Col 1: Brand */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-[family-name:var(--font-display)] text-xl tracking-widest text-white">
              LUCCA
            </span>
            <span className="text-xs uppercase tracking-wider text-gold">
              SNEAKERS
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Vitrina de tenis premium en Tepito, CDMX
          </p>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Links rápidos
          </h4>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Social */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Redes sociales
          </h4>
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-mid text-gray-400 transition-colors hover:bg-gold hover:text-black"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-600">
        &copy; 2026 Lucca Sneakers. Todos los derechos reservados.
      </div>
    </footer>
  )
}
