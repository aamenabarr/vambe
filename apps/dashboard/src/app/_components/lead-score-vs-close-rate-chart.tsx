'use client'

import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface LeadScoreVsCloseRateData {
  scoreRange: string
  total: number
  closed: number
  closeRate: number
}

interface LeadScoreVsCloseRateChartProps {
  data: LeadScoreVsCloseRateData[]
  loading?: boolean
}

export function LeadScoreVsCloseRateChart({
  data,
  loading,
}: LeadScoreVsCloseRateChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>
    )
  }

  const scatterData = data.map((item) => {
    const [min] = item.scoreRange.split('-').map(Number)

    return {
      score: min + 15,
      closeRate: item.closeRate,
      range: item.scoreRange,
      total: item.total,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Score vs Tasa de Cierre</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={scatterData}>
            <XAxis dataKey="score" name="Score" />
            <YAxis dataKey="closeRate" name="Tasa de Cierre %" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({
                active,
                payload,
              }: {
                active?: boolean
                payload?: Array<{ payload: { range: string; score: number; closeRate: number; total: number } }>
              }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload

                  return (
                    <div className="rounded-lg border bg-white p-2 shadow-md">
                      <p className="font-semibold">{data.range}</p>
                      <p>Score: {data.score}</p>
                      <p>Tasa de Cierre: {data.closeRate}%</p>
                      <p>Total: {data.total}</p>
                    </div>
                  )
                }
                
                return null
              }}
            />

            <Scatter dataKey="closeRate" fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
