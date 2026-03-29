'use client'

import StatsCounter from '@/components/ui/StatsCounter'

const STATS_DATA = [
  { value: '200+', label: 'Modelos Disponibles' },
  { value: '15', label: 'Modelos Nuevos por Semana' },
  { value: '500+', label: 'Clientes Mayoreo' },
  { value: '5+', label: 'Años de Experiencia' },
]

export default function StatsBar() {
  return (
    <section className="bg-[#1A1A1A] py-16">
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS_DATA.map((stat) => (
          <StatsCounter key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  )
}
