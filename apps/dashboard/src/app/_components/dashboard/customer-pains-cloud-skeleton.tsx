import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from 'ui'

export function CustomerPainsCloudSkeleton() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-md" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-48" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border border-border/30 bg-secondary/50 p-3">
              <Skeleton className="size-6 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
