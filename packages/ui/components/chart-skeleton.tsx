import { Skeleton } from './skeleton'

interface ChartSkeletonProps {
  height?: number
  className?: string
}

export function ChartSkeleton({ height = 300, className }: ChartSkeletonProps) {
  return (
    <div className={className}>
      <Skeleton className="mb-4 h-6 w-48" />
      <Skeleton className="w-full" style={{ height: `${height}px` }} />
    </div>
  )
}
