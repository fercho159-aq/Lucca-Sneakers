'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement-dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('announcement-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 z-60 w-full bg-[#FF3C3C] text-white">
      <div className="relative flex items-center justify-center py-1.5 px-8">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="inline-block animate-marquee text-xs font-medium tracking-wide">
            🔥 NUEVOS MODELOS CADA SEMANA &middot; MAYOREO DESDE $550 &middot; ENVIOS A TODO MEXICO 🔥
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔥 NUEVOS MODELOS CADA SEMANA &middot; MAYOREO DESDE $550 &middot; ENVIOS A TODO MEXICO 🔥
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔥 NUEVOS MODELOS CADA SEMANA &middot; MAYOREO DESDE $550 &middot; ENVIOS A TODO MEXICO 🔥
          </p>
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 transition-colors hover:bg-white/20 cursor-pointer"
          aria-label="Cerrar anuncio"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
