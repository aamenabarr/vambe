'use client'

import { Card, CardHeader, CardTitle } from 'ui/components/card'

interface MetricsCardsProps {
  averageLeadScore: number
  hotLeadsCount: number
  totalLeads: number
  closeRate: number
  hotLeadsCloseRate: number
}

export function MetricsCards({
  averageLeadScore,
  hotLeadsCount,
  totalLeads,
  closeRate,
  hotLeadsCloseRate,
}: MetricsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card className="bg-[#0033CC] text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white/80">Lead Score Promedio</CardTitle>
          <div className="text-2xl font-bold text-white">{averageLeadScore}</div>
        </CardHeader>
      </Card>

      <Card className="bg-[#0033CC] text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white/80">Leads Calientes</CardTitle>
          <div className="text-2xl font-bold text-white">{hotLeadsCount}</div>
          <div className="text-sm text-white/70">de {totalLeads} leads totales</div>
        </CardHeader>
      </Card>

      <Card className="bg-[#0033CC] text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white/80">Tasa de Cierre General</CardTitle>
          <div className="text-2xl font-bold text-white">{closeRate}%</div>
        </CardHeader>
      </Card>

      <Card className="bg-[#0033CC] text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white/80">Conversión Leads Calientes</CardTitle>
          <div className="text-2xl font-bold text-white">{hotLeadsCloseRate}%</div>
        </CardHeader>
      </Card>
    </div>
  )
}
