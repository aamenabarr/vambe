import { getBuyerSentimentVsClosuresUseCase } from './get-buyer-sentiment-vs-closures.use-case'
import { getClosuresOverTimeUseCase } from './get-closures-over-time.use-case'
import { getCustomerPainsByIndustryUseCase } from './get-customer-pains-by-industry.use-case'
import { getDiscoverySourcesUseCase } from './get-discovery-sources.use-case'
import { getHotLeadsUseCase } from './get-hot-leads.use-case'
import { getIndustryClosuresUseCase } from './get-industry-closures.use-case'
import { getMetricsCardsUseCase } from './get-metrics-cards.use-case'
import { getObjectionsAnalysisUseCase } from './get-objections-analysis.use-case'
import { getTechMaturityVsClosuresUseCase } from './get-tech-maturity-vs-closures.use-case'

export const getAllMetricsUseCase = async () => {
  const [
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
  ] = await Promise.all([
    getMetricsCardsUseCase(),
    getHotLeadsUseCase(),
    getClosuresOverTimeUseCase(),
    getBuyerSentimentVsClosuresUseCase(),
    getObjectionsAnalysisUseCase(),
    getIndustryClosuresUseCase(),
    getDiscoverySourcesUseCase(),
    getDiscoverySourcesUseCase(),
    getTechMaturityVsClosuresUseCase(),
    getCustomerPainsByIndustryUseCase(),
  ])

  return {
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
  }
}
