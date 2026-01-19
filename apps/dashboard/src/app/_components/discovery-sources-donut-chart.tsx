'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { CHART_COLORS } from '../_helpers/colors'
import { translateDiscoverySource } from '../_helpers/translations'

interface DiscoverySourcesData {
  source: string
  total: number
  closed: number
  closeRate: number
}

interface DiscoverySourcesDonutChartProps {
  data: DiscoverySourcesData[]
  loading?: boolean
}

export function DiscoverySourcesDonutChart({ data, loading }: DiscoverySourcesDonutChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuentes de Descubrimiento de Vambe</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.map((item) => ({
                ...item,
                source: translateDiscoverySource(item.source),
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: DiscoverySourcesData) => `${entry.source}: ${entry.total}`}
              outerRadius={80}
              fill={CHART_COLORS[0]}
              dataKey="total"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
