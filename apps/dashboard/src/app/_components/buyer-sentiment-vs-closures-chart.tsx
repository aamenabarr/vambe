'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { VAMBE_COLORS } from '../_helpers/colors'
import { translateBuyerSentiment } from '../_helpers/translations'

interface BuyerSentimentVsClosuresData {
  sentiment: string
  closed: number
  notClosed: number
  total: number
}

interface BuyerSentimentVsClosuresChartProps {
  data: BuyerSentimentVsClosuresData[]
}

export function BuyerSentimentVsClosuresChart({ data }: BuyerSentimentVsClosuresChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buyer Sentiment vs Cierres</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data.map((item) => ({
              ...item,
              sentiment: translateBuyerSentiment(item.sentiment),
            }))}
          >
            <XAxis dataKey="sentiment" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="closed" stackId="a" fill={VAMBE_COLORS.secondary} name="Cerrados" />
            <Bar dataKey="notClosed" stackId="a" fill={VAMBE_COLORS.danger} name="No Cerrados" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
