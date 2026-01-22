import { getAllMetricsUseCase } from 'domain-clean/llm-analysis/use-cases/get-all-metrics.use-case'

import { Dashboard } from './_components/dashboard'

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
