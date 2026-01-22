'use client'

import { Upload } from 'lucide-react'
import Image from 'next/image'

import { Button } from 'ui/components/button'

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
  loading?: boolean
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
  loading,
}: DashboardProps) {
  const handleUploadClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/process-csv', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          window.location.reload()
        }
      } catch (error) {
        // Error uploading CSV
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-[#0A1121] flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0A1121]/80 backdrop-blur-xl border-b border-[#1E3A8A]/40 p-4">
        <Image src="/logo.png" alt="Vambe" width={120} height={40} />
        <Button
          onClick={handleUploadClick}
          icon={<Upload className="size-4" />}
          className="bg-white text-[#0033CC] hover:bg-gray-100"
        >
          Subir CSV
        </Button>
      </header>

      <main className="flex-1 p-6">
        <MetricsCards {...metricsCards} loading={loading} />

        <div className="space-y-6">
          <HotLeadsTable leads={hotLeads || []} loading={loading} />

          <ClosuresOverTimeChart data={closuresOverTime || []} loading={loading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BuyerSentimentVsClosuresChart
              data={buyerSentimentVsClosures || []}
              loading={loading}
            />
            <ObjectionsFrequencyChart
              data={objectionsAnalysis?.frequency || []}
              loading={loading}
            />
          </div>

          <IndustryClosuresChart data={industryClosures || []} loading={loading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DiscoverySourcesDonutChart data={discoverySources || []} loading={loading} />
            <ConversionBySourceChart data={conversionBySource || []} loading={loading} />
          </div>

          <TechMaturityVsClosuresChart data={techMaturityVsClosures || []} loading={loading} />

          <CustomerPainsHeatmap data={customerPainsByIndustry || []} loading={loading} />
        </div>
      </main>
    </div>
  )
}
