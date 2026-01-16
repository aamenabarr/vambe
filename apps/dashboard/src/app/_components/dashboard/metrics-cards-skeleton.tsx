import { Card, CardContent, Skeleton } from 'ui'

export function MetricsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="border-primary/50 bg-primary transition-colors hover:border-primary/70"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
                <Skeleton className="h-8 w-20 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-32 bg-primary-foreground/20" />
              </div>
              <Skeleton className="size-10 rounded-lg bg-primary-foreground/20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
