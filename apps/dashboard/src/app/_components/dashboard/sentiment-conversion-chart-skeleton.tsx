import { Card, CardContent, CardHeader, Skeleton } from 'ui'

export function SentimentConversionChartSkeleton() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}
