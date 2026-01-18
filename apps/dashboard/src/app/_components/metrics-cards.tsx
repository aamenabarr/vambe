'use client'

import { Card, CardHeader, CardTitle } from 'ui/components/card'
import { Skeleton } from 'ui/components/skeleton'

interface MetricsCardsProps {
  averageLeadScore: number
  hotLeadsCount: number
  totalLeads: number
  closeRate: number
  hotLeadsCloseRate: number
  loading?: boolean
}

export function MetricsCards({
  averageLeadScore,
  hotLeadsCount,
  totalLeads,
  closeRate,
  hotLeadsCloseRate,
  loading,
}: MetricsCardsProps) {
  if (loading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            Lead Score Promedio
          </CardTitle>
          <div className="text-2xl font-bold">{averageLeadScore}</div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Leads Calientes</CardTitle>
          <div className="text-2xl font-bold">{hotLeadsCount}</div>
          <div className="text-sm text-gray-500">de {totalLeads} leads totales</div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            Tasa de Cierre General
          </CardTitle>
          <div className="text-2xl font-bold">{closeRate}%</div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            Conversión Leads Calientes
          </CardTitle>
          <div className="text-2xl font-bold">{hotLeadsCloseRate}%</div>
        </CardHeader>
      </Card>
    </div>
  )
}
