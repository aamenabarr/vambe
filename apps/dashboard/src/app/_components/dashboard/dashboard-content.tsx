import { FilterValue } from 'domain-clean/enums'
import { Suspense } from 'react'
import { industryTranslation } from 'translations/enums/industry'
import { purchaseObjectionTranslation } from 'translations/enums/purchase-objection'
import { vambeDiscoverySourceTranslation } from 'translations/enums/vambe-discovery-source'

import { getDiscoverySource } from '../../_fetchers/get-discovery-source.fetcher'
import { getIndustryPerformance } from '../../_fetchers/get-industry-performance.fetcher'
import { getObjectionsHeatmap } from '../../_fetchers/get-objections-heatmap.fetcher'
import { getPrioritizationMatrix } from '../../_fetchers/get-prioritization-matrix.fetcher'
import { getSalesAgents } from '../../_fetchers/get-sales-agents.fetcher'
import { getSalesOverTime } from '../../_fetchers/get-sales-over-time.fetcher'
import { getSellerPerformance } from '../../_fetchers/get-seller-performance.fetcher'
import { getSentimentConversion } from '../../_fetchers/get-sentiment-conversion.fetcher'
import { CustomerPainsCloud } from './customer-pains-cloud'
import { CustomerPainsCloudSkeleton } from './customer-pains-cloud-skeleton'
import { DiscoverySourceChart } from './discovery-source-chart'
import { DiscoverySourceChartSkeleton } from './discovery-source-chart-skeleton'
import { FiltersBar } from './filters-bar'
import { Header } from './header'
import { IndustryPerformanceChart } from './industry-performance-chart'
import { IndustryPerformanceChartSkeleton } from './industry-performance-chart-skeleton'
import { LeadScoreTable } from './lead-score-table'
import { LeadScoreTableSkeleton } from './lead-score-table-skeleton'
import { MetricsCards } from './metrics-cards'
import { MetricsCardsSkeleton } from './metrics-cards-skeleton'
import { ObjectionsHeatmapChart } from './objections-heatmap-chart'
import { ObjectionsHeatmapChartSkeleton } from './objections-heatmap-chart-skeleton'
import { PrioritizationMatrixChart } from './prioritization-matrix-chart'
import { PrioritizationMatrixChartSkeleton } from './prioritization-matrix-chart-skeleton'
import { SalesOverTimeChart } from './sales-over-time-chart'
import { SalesOverTimeChartSkeleton } from './sales-over-time-chart-skeleton'
import { SellerPerformanceChart } from './seller-performance-chart'
import { SellerPerformanceChartSkeleton } from './seller-performance-chart-skeleton'
import { SentimentConversionChart } from './sentiment-conversion-chart'
import { SentimentConversionChartSkeleton } from './sentiment-conversion-chart-skeleton'

type DashboardContentProps = {
  searchParams: {
    seller?: string
    industry?: string
    techMaturity?: string
  }
}

export async function DashboardContent({ searchParams }: DashboardContentProps) {
  const filters = {
    seller: searchParams.seller || FilterValue.ALL,
    industry: searchParams.industry || FilterValue.ALL,
    techMaturity: searchParams.techMaturity || FilterValue.ALL,
  }

  const salesAgents = await getSalesAgents()

  return (
    <div className="min-h-screen bg-[#0A1121]">
      <Header />
      <main className="container mx-auto space-y-6 px-4 py-6">
        <FiltersBar initialSeller={filters.seller} salesAgents={salesAgents} />
        <Suspense fallback={<MetricsCardsSkeleton />}>
          <MetricsCards filters={filters} />
        </Suspense>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<SalesOverTimeChartSkeleton />}>
            <SalesOverTimeChartData filters={filters} />
          </Suspense>
          <Suspense fallback={<SentimentConversionChartSkeleton />}>
            <SentimentConversionChartData filters={filters} />
          </Suspense>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<LeadScoreTableSkeleton />}>
              <LeadScoreTable filters={filters} />
            </Suspense>
          </div>
          <Suspense fallback={<CustomerPainsCloudSkeleton />}>
            <CustomerPainsCloud filters={filters} />
          </Suspense>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<ObjectionsHeatmapChartSkeleton />}>
            <ObjectionsHeatmapChartData filters={filters} />
          </Suspense>
          <Suspense fallback={<IndustryPerformanceChartSkeleton />}>
            <IndustryPerformanceChartData filters={filters} />
          </Suspense>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<DiscoverySourceChartSkeleton />}>
            <DiscoverySourceChartData filters={filters} />
          </Suspense>
          <Suspense fallback={<SellerPerformanceChartSkeleton />}>
            <SellerPerformanceChartData filters={filters} />
          </Suspense>
        </div>
        <Suspense fallback={<PrioritizationMatrixChartSkeleton />}>
          <PrioritizationMatrixChartData filters={filters} />
        </Suspense>
      </main>
    </div>
  )
}

async function SalesOverTimeChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getSalesOverTime(filters)

  return <SalesOverTimeChart data={data} />
}

async function SentimentConversionChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getSentimentConversion(filters)

  return <SentimentConversionChart data={data} />
}

async function ObjectionsHeatmapChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getObjectionsHeatmap(filters)
  const chartData = data.map((item) => ({
    objection: purchaseObjectionTranslation[item.objection],
    rate: Number(item.rate.toFixed(1)),
    closed: item.closed,
    notClosed: item.notClosed,
  }))

  return <ObjectionsHeatmapChart data={chartData} />
}

async function IndustryPerformanceChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getIndustryPerformance(filters)
  const chartData = data.map((item) => ({
    industry: industryTranslation[item.industry],
    closeRate: Number(item.closeRate.toFixed(1)),
    leads: item.leads,
    revenue: item.revenue,
  }))

  return <IndustryPerformanceChart data={chartData} />
}

async function DiscoverySourceChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getDiscoverySource(filters)
  const chartData = data.map((item) => ({
    name: vambeDiscoverySourceTranslation[item.source],
    value: Number(item.value.toFixed(1)),
    count: item.count,
  }))

  return <DiscoverySourceChart data={chartData} />
}

async function SellerPerformanceChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getSellerPerformance(filters)

  return <SellerPerformanceChart data={data} />
}

async function PrioritizationMatrixChartData({
  filters,
}: {
  filters: { seller: string; industry: string; techMaturity: string }
}) {
  const data = await getPrioritizationMatrix(filters)

  return <PrioritizationMatrixChart data={data} />
}
