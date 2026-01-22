import Image from 'next/image'

import { BuyerSentimentVsClosuresChart } from './buyer-sentiment-vs-closures-chart'
import { ClosuresOverTimeChart } from './closures-over-time-chart'
import { ConversionBySourceChart } from './conversion-by-source-chart'
import { CustomerPainsHeatmap } from './customer-pains-heatmap'
import { DiscoverySourcesDonutChart } from './discovery-sources-donut-chart'
import { HotLeadsTable } from './hot-leads-table'
import { IndustryClosuresChart } from './industry-closures-chart'
import { MetricsCards } from './metrics-cards'
import { ObjectionsFrequencyChart } from './objections-frequency-chart'
import { TechMaturityVsClosuresChart } from './tech-maturity-vs-closures-chart'
import { UploadCsvButton } from './upload-csv-button'

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
