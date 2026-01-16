'use client'

import { Users } from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899']

type SellerPerformanceChartProps = {
  data: {
    categories: string[]
    sellers: Array<{ id: string; name: string; key: string }>
    data: Array<Record<string, number>>
  }
}

export function SellerPerformanceChart({ data }: SellerPerformanceChartProps) {
  const chartData = data.categories.map((category, index) => {
    const entry: Record<string, number | string> = {
      category,
    }
    data.sellers.forEach((seller) => {
      entry[seller.name] = data.data[index]?.[seller.key] || 0
    })

    return entry
  })

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="size-5 text-indigo-500" />
          Eficiencia del Vendedor por Categoría
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ¿Quién es mejor manejando cada tipo de cliente?
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
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
            {data.sellers.map((seller, index) => (
              <Radar
                key={seller.id}
                name={seller.name}
                dataKey={seller.name}
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            ))}
            <Legend
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
