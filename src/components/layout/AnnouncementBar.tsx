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

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--announcement-height',
      isVisible ? '32px' : '0px'
    )
    return () => {
      document.documentElement.style.setProperty('--announcement-height', '0px')
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('announcement-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 z-[60] w-full bg-[#FF3C3C] text-white h-8">
      <div className="relative flex h-full items-center justify-center overflow-hidden px-8">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="inline-block animate-marquee text-xs font-medium tracking-wide">
            🔥 NUEVA COLECCION DISPONIBLE &middot; DESCUBRE LOS ULTIMOS MODELOS &middot; VISITANOS EN TEPITO 🔥
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔥 NUEVA COLECCION DISPONIBLE &middot; DESCUBRE LOS ULTIMOS MODELOS &middot; VISITANOS EN TEPITO 🔥
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔥 NUEVA COLECCION DISPONIBLE &middot; DESCUBRE LOS ULTIMOS MODELOS &middot; VISITANOS EN TEPITO 🔥
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
