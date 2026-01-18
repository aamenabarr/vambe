'use client'

import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card'
import { ChartSkeleton } from 'ui/components/chart-skeleton'
import { cn } from 'ui/lib/utils'

interface PainFrequency {
  pain: string
  frequency: number
}

interface CustomerPainsByIndustryData {
  industry: string
  pains: PainFrequency[]
}

interface CustomerPainsHeatmapProps {
  data: CustomerPainsByIndustryData[]
  loading?: boolean
}

function getIntensityColor(frequency: number, maxFrequency: number) {
  if (frequency === 0) return 'bg-gray-50'

  const intensity = frequency / maxFrequency
  if (intensity > 0.7) return 'bg-red-600'
  if (intensity > 0.4) return 'bg-orange-500'
  if (intensity > 0.2) return 'bg-yellow-400'
  
  return 'bg-yellow-200'
}

export function CustomerPainsHeatmap({ data, loading }: CustomerPainsHeatmapProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>
    )
  }

  const allPains = new Set<string>()
  data.forEach((item) => {
    item.pains.forEach((pain) => {
      allPains.add(pain.pain)
    })
  })

  const painArray = Array.from(allPains)
  const maxFrequency = Math.max(
    ...data.flatMap((item) => item.pains.map((p) => p.frequency)),
    1,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Pains por Industria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left text-sm font-medium">Industria</th>
                {painArray.map((pain) => (
                  <th key={pain} className="border p-2 text-center text-xs font-medium">
                    {pain}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const painMap = new Map(item.pains.map((p) => [p.pain, p.frequency]))

                return (
                  <tr key={item.industry}>
                    <td className="border p-2 text-sm font-medium">{item.industry}</td>
                    {painArray.map((pain) => {
                      const frequency = painMap.get(pain) || 0

                      return (
                        <td
                          key={pain}
                          className={cn(
                            'border p-2 text-center text-xs',
                            getIntensityColor(frequency, maxFrequency),
                            frequency > 0 && 'text-white font-semibold',
                          )}
                        >
                          {frequency}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
