'use client'

import { Upload } from 'lucide-react'

import { Button } from 'ui/components/button'

import { AverageLeadScoreByAgentChart } from './average-lead-score-by-agent-chart'
import { BuyerSentimentVsClosuresChart } from './buyer-sentiment-vs-closures-chart'
import { ClosuresBySalesAgentChart } from './closures-by-sales-agent-chart'
import { ClosuresOverTimeChart } from './closures-over-time-chart'
import { ConversionBySourceChart } from './conversion-by-source-chart'
import { CustomerPainsHeatmap } from './customer-pains-heatmap'
import { DiscoverySourcesDonutChart } from './discovery-sources-donut-chart'
import { HotLeadsTable } from './hot-leads-table'
import { IndustryClosuresChart } from './industry-closures-chart'
import { LeadScoreVsCloseRateChart } from './lead-score-vs-close-rate-chart'
import { MetricsCards } from './metrics-cards'
import { ObjectionsFrequencyChart } from './objections-frequency-chart'
import { ObjectionsImpactChart } from './objections-impact-chart'
import { PurchaseIntentionDistributionChart } from './purchase-intention-distribution-chart'
import { RadarChartSpecialization } from './radar-chart-specialization'
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

interface SpecializationData {
  salesAgentName: string
  data: Array<{
    sentiment?: string
    tech?: string
    closeRate: number
    total: number
    closed: number
  }>
}

interface ClosuresOverTimeData {
  date: string
  count: number
}

interface ClosuresBySalesAgentData {
  salesAgentName: string
  closed: number
  total: number
  closeRate: number
  averageLeadScore: number
}

interface BuyerSentimentVsClosuresData {
  sentiment: string
  closed: number
  notClosed: number
  total: number
}

interface ObjectionsAnalysisData {
  frequency: Array<{ objection: string; frequency: number }>
  impact: Array<{
    objection: string
    frequency: number
    closeRateWith: number
    closeRateWithout: number
    impact: number
  }>
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

interface AverageLeadScoreByAgentData {
  salesAgentName: string
  averageLeadScore: number
}

interface PurchaseIntentionDistributionData {
  intention: string
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

interface LeadScoreVsCloseRateData {
  scoreRange: string
  total: number
  closed: number
  closeRate: number
}

interface DashboardProps {
  metricsCards: MetricsCardsData
  hotLeads: HotLead[]
  salesAgentSpecialization: {
    buyerSentiment: SpecializationData[]
    techMaturity: SpecializationData[]
  }
  closuresOverTime: ClosuresOverTimeData[]
  closuresBySalesAgent: ClosuresBySalesAgentData[]
  buyerSentimentVsClosures: BuyerSentimentVsClosuresData[]
  objectionsAnalysis: ObjectionsAnalysisData
  industryClosures: IndustryClosuresData[]
  discoverySources: DiscoverySourcesData[]
  averageLeadScoreByAgent: AverageLeadScoreByAgentData[]
  conversionBySource: DiscoverySourcesData[]
  purchaseIntentionDistribution: PurchaseIntentionDistributionData[]
  techMaturityVsClosures: TechMaturityVsClosuresData[]
  customerPainsByIndustry: CustomerPainsByIndustryData[]
  leadScoreVsCloseRate: LeadScoreVsCloseRateData[]
  loading?: boolean
}

export function Dashboard({
  metricsCards,
  hotLeads,
  salesAgentSpecialization,
  closuresOverTime,
  closuresBySalesAgent,
  buyerSentimentVsClosures,
  objectionsAnalysis,
  industryClosures,
  discoverySources,
  averageLeadScoreByAgent,
  conversionBySource,
  purchaseIntentionDistribution,
  techMaturityVsClosures,
  customerPainsByIndustry,
  leadScoreVsCloseRate,
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
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-white p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Vambe Dashboard</span>
        </div>
        <Button onClick={handleUploadClick} icon={<Upload className="size-4" />}>
          Subir CSV
        </Button>
      </header>

      <main className="flex-1 bg-gray-50 p-6">
        <MetricsCards {...metricsCards} loading={loading} />

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RadarChartSpecialization
              data={salesAgentSpecialization?.buyerSentiment || []}
              type="buyerSentiment"
              loading={loading}
            />
            <RadarChartSpecialization
              data={salesAgentSpecialization?.techMaturity || []}
              type="techMaturity"
              loading={loading}
            />
          </div>

          <HotLeadsTable leads={hotLeads || []} loading={loading} />

          <ClosuresOverTimeChart data={closuresOverTime || []} loading={loading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ClosuresBySalesAgentChart data={closuresBySalesAgent || []} loading={loading} />
            <BuyerSentimentVsClosuresChart
              data={buyerSentimentVsClosures || []}
              loading={loading}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ObjectionsFrequencyChart
              data={objectionsAnalysis?.frequency || []}
              loading={loading}
            />
            <ObjectionsImpactChart data={objectionsAnalysis?.impact || []} loading={loading} />
          </div>

          <IndustryClosuresChart data={industryClosures || []} loading={loading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DiscoverySourcesDonutChart data={discoverySources || []} loading={loading} />
            <ConversionBySourceChart data={conversionBySource || []} loading={loading} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AverageLeadScoreByAgentChart
              data={averageLeadScoreByAgent || []}
              loading={loading}
            />
            <PurchaseIntentionDistributionChart
              data={purchaseIntentionDistribution || []}
              loading={loading}
            />
          </div>

          <TechMaturityVsClosuresChart data={techMaturityVsClosures || []} loading={loading} />

          <CustomerPainsHeatmap data={customerPainsByIndustry || []} loading={loading} />

          <LeadScoreVsCloseRateChart data={leadScoreVsCloseRate || []} loading={loading} />
        </div>
      </main>
    </div>
  )
}
