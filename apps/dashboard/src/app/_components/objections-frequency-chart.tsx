'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { VAMBE_COLORS } from '../_helpers/colors'
import { translateObjection } from '../_helpers/translations'

interface ObjectionsFrequencyData {
  objection: string
  frequency: number
}

interface ObjectionsFrequencyChartProps {
  data: ObjectionsFrequencyData[]
  loading?: boolean
}

export function ObjectionsFrequencyChart({ data, loading }: ObjectionsFrequencyChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>
    )
  }

  const sortedData = [...data].sort((a, b) => b.frequency - a.frequency).slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frecuencia de Objeciones</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={sortedData.map((item) => ({
              ...item,
              objection: translateObjection(item.objection),
            }))}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis dataKey="objection" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="frequency" fill={VAMBE_COLORS.accent} name="Frecuencia" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
