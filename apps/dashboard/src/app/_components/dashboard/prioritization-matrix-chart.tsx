'use client'

import { Target } from 'lucide-react'
import { Scatter, ScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

const getColor = (skepticism: string) => {
  if (skepticism === 'high') return 'hsl(0, 84%, 60%)'
  if (skepticism === 'medium') return 'hsl(38, 92%, 50%)'

  return 'hsl(142, 71%, 45%)'
}

type PrioritizationMatrixChartProps = {
  data: Array<{
    intention: number
    icpFit: number
    score: number
    name: string
    skepticism: string
    value: number
  }>
}

export function PrioritizationMatrixChart({ data }: PrioritizationMatrixChartProps) {
  const chartData = data.map((item) => ({
    x: item.intention,
    y: item.icpFit,
    value: item.value,
    name: item.name,
    skepticism: item.skepticism,
    score: item.score,
  }))

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="size-5 text-red-500" />
          Matriz de Priorización
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={chartData}>
            <XAxis
              type="number"
              dataKey="x"
              name="Intención"
              domain={[0, 100]}
              className="text-xs text-muted-foreground"
              label={{ value: 'Intención de Compra', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="ICP Fit"
              domain={[0, 100]}
              className="text-xs text-muted-foreground"
              label={{ value: 'ICP Fit', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null
                const data = payload[0].payload

                return (
                  <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="font-medium text-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Intención: {data.x}% | ICP Fit: {data.y}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Score: {data.score} | Valor: ${(data.value / 1000).toFixed(0)}K
                    </p>
                  </div>
                )
              }}
            />
            <Scatter name="Leads" data={chartData} fill="hsl(var(--primary))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.skepticism)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
