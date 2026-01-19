'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { VAMBE_COLORS } from '../_helpers/colors'

interface AverageLeadScoreByAgentData {
  salesAgentName: string
  averageLeadScore: number
}

interface AverageLeadScoreByAgentChartProps {
  data: AverageLeadScoreByAgentData[]
  loading?: boolean
}

export function AverageLeadScoreByAgentChart({
  data,
  loading,
}: AverageLeadScoreByAgentChartProps) {
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
        <CardTitle>Lead Score Promedio por Sales Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="salesAgentName" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="averageLeadScore" fill={VAMBE_COLORS.secondary} name="Score Promedio" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
