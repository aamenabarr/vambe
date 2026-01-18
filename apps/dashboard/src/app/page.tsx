import { getAllMetricsUseCase } from 'domain-clean/llm-analysis/use-cases/get-all-metrics.use-case'

import { Dashboard } from './_components/dashboard'

export default async function Home() {
  let data

  try {
    data = await getAllMetricsUseCase()
  } catch (error) {
    // Error fetching metrics
    data = {
      metricsCards: {
        averageLeadScore: 0,
        hotLeadsCount: 0,
        totalLeads: 0,
        closeRate: 0,
        hotLeadsCloseRate: 0,
      },
      hotLeads: [],
      salesAgentSpecialization: { buyerSentiment: [], techMaturity: [] },
      closuresOverTime: [],
      closuresBySalesAgent: [],
      buyerSentimentVsClosures: [],
      objectionsAnalysis: { frequency: [], impact: [] },
      industryClosures: [],
      discoverySources: [],
      averageLeadScoreByAgent: [],
      conversionBySource: [],
      purchaseIntentionDistribution: [],
      techMaturityVsClosures: [],
      customerPainsByIndustry: [],
      leadScoreVsCloseRate: [],
    }
  }

  return <Dashboard {...data} loading={false} />
}
