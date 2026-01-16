'use client'

import { TrendingUp } from 'lucide-react'
import {
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Cell,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

type SentimentConversionChartProps = {
  data: Array<{
    sentiment: number
    conversion: number
    count: number
    label: string
  }>
}

const getColor = (label: string) => {
  if (label === 'Escéptico') return '#ef4444'
  if (label === 'Neutral') return '#eab308'

  return '#22c55e'
}

const getAverage = (data: Array<{ conversion: number }>) => {
  const sum = data.reduce((acc, item) => acc + item.conversion, 0)

  return sum / data.length
}

export function SentimentConversionChart({ data }: SentimentConversionChartProps) {
  const chartData = data.flatMap((item) =>
    Array.from({ length: item.count }, () => ({
      x: item.sentiment + (Math.random() - 0.5) * 0.3,
      y: item.conversion + (Math.random() - 0.5) * 5,
      label: item.label,
    })),
  )

  const avg = getAverage(data)

  const sentimentLabels = ['Escéptico', 'Neutral', 'Confiado']

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="size-5 text-blue-500" />
          Sentimiento vs. Conversión
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ¿Se necesita sentimiento positivo para cerrar?
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={chartData}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[0.5, 3.5]}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => sentimentLabels[value - 1] || ''}
              className="text-xs text-muted-foreground"
              label={{ value: 'Sentimiento', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              className="text-xs text-muted-foreground"
              label={{ value: '% Conversión', angle: -90, position: 'insideLeft' }}
            />
            <ReferenceLine
              y={avg}
              stroke="#3b82f6"
              strokeDasharray="3 3"
              label={{ value: 'Avg', position: 'right' }}
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
            <Scatter name="Conversión" data={chartData} fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.label)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
