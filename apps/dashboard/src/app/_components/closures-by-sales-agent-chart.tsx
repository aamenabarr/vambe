'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface ClosuresBySalesAgentData {
  salesAgentName: string
  closed: number
  total: number
  closeRate: number
  averageLeadScore: number
}

interface ClosuresBySalesAgentChartProps {
  data: ClosuresBySalesAgentData[]
  loading?: boolean
}

export function ClosuresBySalesAgentChart({ data, loading }: ClosuresBySalesAgentChartProps) {
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
        <CardTitle>Cierres por Sales Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="salesAgentName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="closed" fill="#3b82f6" name="Cierres" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
