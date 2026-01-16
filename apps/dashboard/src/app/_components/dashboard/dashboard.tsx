import { DashboardContent } from './dashboard-content'

type DashboardProps = {
  searchParams: {
    seller?: string
    industry?: string
    techMaturity?: string
  }
}

export default function Dashboard({ searchParams }: DashboardProps) {
  return <DashboardContent searchParams={searchParams} />
}
