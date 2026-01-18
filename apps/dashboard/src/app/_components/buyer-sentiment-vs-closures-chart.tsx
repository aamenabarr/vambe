'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

interface BuyerSentimentVsClosuresData {
  sentiment: string
  closed: number
  notClosed: number
  total: number
}

interface BuyerSentimentVsClosuresChartProps {
  data: BuyerSentimentVsClosuresData[]
  loading?: boolean
}

export function BuyerSentimentVsClosuresChart({
  data,
  loading,
}: BuyerSentimentVsClosuresChartProps) {
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
        <CardTitle>Buyer Sentiment vs Cierres</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="sentiment" />
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
