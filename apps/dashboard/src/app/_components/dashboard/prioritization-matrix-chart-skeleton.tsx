import { Card, CardContent, CardHeader, Skeleton } from 'ui'

export function PrioritizationMatrixChartSkeleton() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[400px] w-full" />
      </CardContent>
    </Card>
  )
}
