'use client'

import { cn } from '@/lib/utils'

interface Variant {
  id: string
  size: string
  stock: number
}

interface SizeSelectorProps {
  variants: Variant[]
  selectedSize: string | null
  onSelect: (size: string, variantId: string) => void
}

export default function SizeSelector({ variants, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
        Talla
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {variants.map((variant) => {
          const isSelected = selectedSize === variant.size
          const isDisabled = variant.stock === 0

          return (
            <button
              key={variant.id}
              onClick={() => !isDisabled && onSelect(variant.size, variant.id)}
              disabled={isDisabled}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm font-medium transition-all cursor-pointer',
                'bg-[#2A2A2A] border border-white/10 text-white',
                isSelected && 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]',
                isDisabled && 'opacity-30 line-through cursor-not-allowed'
              )}
            >
              {variant.size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
