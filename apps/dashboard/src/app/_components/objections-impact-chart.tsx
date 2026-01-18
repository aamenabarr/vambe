'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface ObjectionsImpactData {
  objection: string
  frequency: number
  closeRateWith: number
  closeRateWithout: number
  impact: number
}

interface ObjectionsImpactChartProps {
  data: ObjectionsImpactData[]
  loading?: boolean
}

export function ObjectionsImpactChart({ data, loading }: ObjectionsImpactChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>
    )
  }

  const sortedData = [...data].sort((a, b) => b.impact - a.impact).slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objections que Matan Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedData} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="objection" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="impact" fill="#ef4444" name="Impacto en %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
