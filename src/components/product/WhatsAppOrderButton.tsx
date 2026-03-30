'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { generateProductInquiryURL } from '@/lib/whatsapp'

interface WhatsAppOrderButtonProps {
  productName: string
  selectedSize: string | null
  disabled?: boolean
}

export default function WhatsAppOrderButton({
  productName,
  selectedSize,
  disabled,
}: WhatsAppOrderButtonProps) {
  const handleClick = () => {
    if (disabled || !selectedSize) return
    const url = generateProductInquiryURL(productName, selectedSize)
    window.open(url, '_blank')
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-bold text-white transition-all cursor-pointer ${
          disabled
            ? 'bg-[#25D366]/50 cursor-not-allowed'
            : 'bg-[#25D366] hover:brightness-110 active:scale-[0.98]'
        }`}
      >
        <FaWhatsapp className="h-5 w-5" />
        CONSULTAR POR WHATSAPP
      </button>
      {disabled && (
        <p className="mt-1.5 text-center text-xs text-gray-400">
          Selecciona una talla
        </p>
      )}
    </div>
  )
}
