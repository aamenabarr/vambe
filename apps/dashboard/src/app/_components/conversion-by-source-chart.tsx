'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { VAMBE_COLORS } from '../_helpers/colors'
import { translateDiscoverySource } from '../_helpers/translations'

interface ConversionBySourceData {
  source: string
  total: number
  closed: number
  closeRate: number
}

interface ConversionBySourceChartProps {
  data: ConversionBySourceData[]
}

export function ConversionBySourceChart({ data }: ConversionBySourceChartProps) {
  const sortedData = [...data].sort((a, b) => b.closeRate - a.closeRate)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Conversión por Fuente de Descubrimiento</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={sortedData.map((item) => ({
              ...item,
              source: translateDiscoverySource(item.source),
            }))}
          >
            <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="closeRate" fill={VAMBE_COLORS.purple} name="Tasa de Conversión %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
