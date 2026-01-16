'use client'

import { Search } from 'lucide-react'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

const COLORS = ['#3b82f6', '#0ea5e9', '#22c55e', '#f59e0b', '#ec4899', '#6b7280']

type DiscoverySourceChartProps = {
  data: Array<{
    name: string
    value: number
    count: number
  }>
}

export function DiscoverySourceChart({ data }: DiscoverySourceChartProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Search className="size-5 text-green-500" />
          Fuentes de Descubrimiento
        </CardTitle>
        <p className="text-sm text-muted-foreground">¿Cómo nos encuentran los leads?</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) {
                  return null
                }

                const data = payload[0].payload

                return (
                  <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="font-medium text-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.value}% ({data.count} leads)
                    </p>
                  </div>
                )
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
