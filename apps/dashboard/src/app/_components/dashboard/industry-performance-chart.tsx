'use client'

import { Building2 } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#06b6d4']

type IndustryPerformanceChartProps = {
  data: Array<{
    industry: string
    closeRate: number
    leads: number
    revenue: number
  }>
}

export function IndustryPerformanceChart({ data }: IndustryPerformanceChartProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="size-5 text-purple-500" />
          Product-Market Fit por Industria
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Sectores con mayor interés y mejores tasas de cierre
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 60]} className="text-xs text-muted-foreground" />
            <YAxis
              type="category"
              dataKey="industry"
              width={120}
              className="text-xs text-muted-foreground"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number | undefined) =>
                value !== undefined ? `${Number(value.toFixed(1))}%` : ''
              }
            />
            <Bar dataKey="closeRate" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
