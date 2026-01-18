'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface IndustryClosuresData {
  industry: string
  total: number
  closed: number
  closeRate: number
}

interface IndustryClosuresChartProps {
  data: IndustryClosuresData[]
  loading?: boolean
}

export function IndustryClosuresChart({ data, loading }: IndustryClosuresChartProps) {
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
        <CardTitle>Tasas de Cierre por Industria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="closeRate" fill="#3b82f6" name="Tasa de Cierre %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
