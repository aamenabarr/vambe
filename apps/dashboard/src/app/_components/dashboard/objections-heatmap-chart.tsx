'use client'

import { AlertTriangle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'

type ObjectionsHeatmapChartProps = {
  data: Array<{
    objection: string
    rate: number
    closed: number
    notClosed: number
  }>
}

const getColor = (rate: number) => {
  if (rate < 30) return 'bg-red-500'
  if (rate <= 50) return 'bg-yellow-500'

  return 'bg-green-500'
}

export function ObjectionsHeatmapChart({ data }: ObjectionsHeatmapChartProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="size-5 text-orange-500" />
          Heatmap de Objeciones vs. Cierre
        </CardTitle>
        <p className="text-sm text-muted-foreground">¿Qué objeciones matan más ventas?</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.objection} className="flex items-center gap-4">
              <div className="w-32 text-sm text-foreground">{item.objection}</div>
              <div className="flex items-center gap-2">
                <div
                  className={`${getColor(item.rate)} flex h-8 w-12 items-center justify-center rounded text-sm font-semibold text-white`}
                >
                  {item.closed}
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-600 text-sm font-semibold text-white">
                  {item.notClosed}
                </div>
                <div className="w-20 text-sm text-muted-foreground">
                  {item.rate.toFixed(0)}% cierre
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-red-500" />
              <span className="text-muted-foreground">Rojo: &lt;30% (Asesina)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-yellow-500" />
              <span className="text-muted-foreground">Amarillo: 30-50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-green-500" />
              <span className="text-muted-foreground">Verde: &gt;50%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
