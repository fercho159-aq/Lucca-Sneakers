import { cn } from '@/lib/utils'

type Variant = 'new' | 'hot' | 'wholesale'

interface BadgeProps {
  variant: Variant
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  new: 'bg-gold text-black',
  hot: 'bg-[#EF4444] text-white',
  wholesale: 'bg-whatsapp text-white',
}

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider',
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  )
}
