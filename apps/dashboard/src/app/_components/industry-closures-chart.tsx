'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'

import { VAMBE_COLORS } from '../_helpers/colors'
import { translateIndustry } from '../_helpers/translations'

interface IndustryClosuresData {
  industry: string
  total: number
  closed: number
  closeRate: number
}

interface IndustryClosuresChartProps {
  data: IndustryClosuresData[]
}

export function IndustryClosuresChart({ data }: IndustryClosuresChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasas de Cierre por Industria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data.map((item) => ({
              ...item,
              industry: translateIndustry(item.industry),
            }))}
          >
            <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="closeRate" fill={VAMBE_COLORS.primary} name="Tasa de Cierre %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
