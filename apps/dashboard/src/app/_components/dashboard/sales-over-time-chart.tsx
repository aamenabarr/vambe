'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

type SalesOverTimeChartProps = {
  data: Array<{
    month: string
    reuniones: number
    cierres: number
    tasaCierre: number
  }>
}

export function SalesOverTimeChart({ data }: SalesOverTimeChartProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          Ventas en el Tiempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="reuniones"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Reuniones"
            />
            <Line
              type="monotone"
              dataKey="cierres"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              name="Cierres"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
