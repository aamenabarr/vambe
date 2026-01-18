'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface TechMaturityVsClosuresData {
  tech: string
  closed: number
  notClosed: number
  total: number
}

interface TechMaturityVsClosuresChartProps {
  data: TechMaturityVsClosuresData[]
  loading?: boolean
}

export function TechMaturityVsClosuresChart({
  data,
  loading,
}: TechMaturityVsClosuresChartProps) {
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
        <CardTitle>Tech Maturity vs Cierres</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="tech" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="closed" stackId="a" fill="#10b981" name="Cerrados" />
            <Bar dataKey="notClosed" stackId="a" fill="#ef4444" name="No Cerrados" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
