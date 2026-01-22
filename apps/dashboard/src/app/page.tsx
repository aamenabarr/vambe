import { getAllMetricsUseCase } from 'domain-clean/llm-analysis/use-cases/get-all-metrics.use-case'
import dynamic from 'next/dynamic'

// Deshabilita SSR para el Dashboard completo
const Dashboard = dynamic(
  () => import('./_components/dashboard').then(mod => ({ default: mod.Dashboard })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1121]">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          <p className="text-lg text-white">Cargando dashboard...</p>
        </div>
      </div>
    )
  }
)

export default async function Home() {
  let data

  try {
    data = await getAllMetricsUseCase()
  } catch (error) {
    data = {
      metricsCards: {
        averageLeadScore: 0,
        hotLeadsCount: 0,
        totalLeads: 0,
        closeRate: 0,
        hotLeadsCloseRate: 0,
      },
      hotLeads: [],
      closuresOverTime: [],
      buyerSentimentVsClosures: [],
      objectionsAnalysis: { frequency: [] },
      industryClosures: [],
      discoverySources: [],
      conversionBySource: [],
      techMaturityVsClosures: [],
      customerPainsByIndustry: [],
    }
  }

  return <Dashboard {...data} />
}
