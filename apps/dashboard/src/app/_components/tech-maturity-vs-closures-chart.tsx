'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'

import { VAMBE_COLORS } from '../_helpers/colors'
import { translateTechMaturity } from '../_helpers/translations'

interface TechMaturityVsClosuresData {
  tech: string
  closed: number
  notClosed: number
  total: number
}

interface TechMaturityVsClosuresChartProps {
  data: TechMaturityVsClosuresData[]
}

export function TechMaturityVsClosuresChart({ data }: TechMaturityVsClosuresChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tech Maturity vs Cierres</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data.map((item) => ({
              ...item,
              tech: translateTechMaturity(item.tech),
            }))}
          >
            <XAxis dataKey="tech" />
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
