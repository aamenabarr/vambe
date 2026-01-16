import Dashboard from './_components/dashboard/dashboard'

type HomeProps = {
  searchParams: {
    seller?: string
    industry?: string
    techMaturity?: string
  }
}

export default function Home({ searchParams }: HomeProps) {
  return <Dashboard searchParams={searchParams} />
}
