import dynamic from 'next/dynamic'
import Image from 'next/image'

import { HotLeadsTable } from './hot-leads-table'
import { MetricsCards } from './metrics-cards'
import { UploadCsvButton } from './upload-csv-button'

const BuyerSentimentVsClosuresChart = dynamic(
  () => import('./buyer-sentiment-vs-closures-chart').then(mod => ({ default: mod.BuyerSentimentVsClosuresChart })),
  { ssr: false }
)

const ClosuresOverTimeChart = dynamic(
  () => import('./closures-over-time-chart').then(mod => ({ default: mod.ClosuresOverTimeChart })),
  { ssr: false }
)

const ConversionBySourceChart = dynamic(
  () => import('./conversion-by-source-chart').then(mod => ({ default: mod.ConversionBySourceChart })),
  { ssr: false }
)

const CustomerPainsHeatmap = dynamic(
  () => import('./customer-pains-heatmap').then(mod => ({ default: mod.CustomerPainsHeatmap })),
  { ssr: false }
)

const DiscoverySourcesDonutChart = dynamic(
  () => import('./discovery-sources-donut-chart').then(mod => ({ default: mod.DiscoverySourcesDonutChart })),
  { ssr: false }
)

const IndustryClosuresChart = dynamic(
  () => import('./industry-closures-chart').then(mod => ({ default: mod.IndustryClosuresChart })),
  { ssr: false }
)

const ObjectionsFrequencyChart = dynamic(
  () => import('./objections-frequency-chart').then(mod => ({ default: mod.ObjectionsFrequencyChart })),
  { ssr: false }
)

const TechMaturityVsClosuresChart = dynamic(
  () => import('./tech-maturity-vs-closures-chart').then(mod => ({ default: mod.TechMaturityVsClosuresChart })),
  { ssr: false }
)

interface MetricsCardsData {
  averageLeadScore: number
  hotLeadsCount: number
  totalLeads: number
  closeRate: number
  hotLeadsCloseRate: number
}

interface HotLead {
  id: string
  customerName: string
  customerEmail: string
  salesAgentName: string
  leadScore: number
  status: string
  buyerSentiment: string
  industry: string
  purchaseIntention: string
}

interface ClosuresOverTimeData {
  date: string
  count: number
}

interface BuyerSentimentVsClosuresData {
  sentiment: string
  closed: number
  notClosed: number
  total: number
}

interface ObjectionsAnalysisData {
  frequency: Array<{ objection: string; frequency: number }>
}

interface IndustryClosuresData {
  industry: string
  total: number
  closed: number
  closeRate: number
}

interface DiscoverySourcesData {
  source: string
  total: number
  closed: number
  closeRate: number
}

interface TechMaturityVsClosuresData {
  tech: string
  closed: number
  notClosed: number
  total: number
}

interface CustomerPainsByIndustryData {
  industry: string
  pains: Array<{ pain: string; frequency: number }>
}

interface DashboardProps {
  metricsCards: MetricsCardsData
  hotLeads: HotLead[]
  closuresOverTime: ClosuresOverTimeData[]
  buyerSentimentVsClosures: BuyerSentimentVsClosuresData[]
  objectionsAnalysis: ObjectionsAnalysisData
  industryClosures: IndustryClosuresData[]
  discoverySources: DiscoverySourcesData[]
  conversionBySource: DiscoverySourcesData[]
  techMaturityVsClosures: TechMaturityVsClosuresData[]
  customerPainsByIndustry: CustomerPainsByIndustryData[]
}

export function Dashboard({
  metricsCards,
  hotLeads,
  closuresOverTime,
  buyerSentimentVsClosures,
  objectionsAnalysis,
  industryClosures,
  discoverySources,
  conversionBySource,
  techMaturityVsClosures,
  customerPainsByIndustry,
}: DashboardProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A1121]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1E3A8A]/40 bg-[#0A1121]/80 p-4 backdrop-blur-xl">
        <Image src="/logo.png" alt="Vambe" width={120} height={40} />
        <UploadCsvButton />
      </header>

      <main className="flex-1 p-6">
        <MetricsCards {...metricsCards} />

        <div className="space-y-6">
          <HotLeadsTable leads={hotLeads || []} />

          <ClosuresOverTimeChart data={closuresOverTime || []} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BuyerSentimentVsClosuresChart data={buyerSentimentVsClosures || []} />
            <ObjectionsFrequencyChart data={objectionsAnalysis?.frequency || []} />
          </div>

          <IndustryClosuresChart data={industryClosures || []} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DiscoverySourcesDonutChart data={discoverySources || []} />
            <ConversionBySourceChart data={conversionBySource || []} />
          </div>

          <TechMaturityVsClosuresChart data={techMaturityVsClosures || []} />

          <CustomerPainsHeatmap data={customerPainsByIndustry || []} />
        </div>
      </main>
    </div>
  )
}
