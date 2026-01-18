import { getAverageLeadScoreByAgentUseCase } from './get-average-lead-score-by-agent.use-case'
import { getBuyerSentimentVsClosuresUseCase } from './get-buyer-sentiment-vs-closures.use-case'
import { getClosuresBySalesAgentUseCase } from './get-closures-by-sales-agent.use-case'
import { getClosuresOverTimeUseCase } from './get-closures-over-time.use-case'
import { getCustomerPainsByIndustryUseCase } from './get-customer-pains-by-industry.use-case'
import { getDiscoverySourcesUseCase } from './get-discovery-sources.use-case'
import { getHotLeadsUseCase } from './get-hot-leads.use-case'
import { getIndustryClosuresUseCase } from './get-industry-closures.use-case'
import { getLeadScoreVsCloseRateUseCase } from './get-lead-score-vs-close-rate.use-case'
import { getMetricsCardsUseCase } from './get-metrics-cards.use-case'
import { getObjectionsAnalysisUseCase } from './get-objections-analysis.use-case'
import { getPurchaseIntentionDistributionUseCase } from './get-purchase-intention-distribution.use-case'
import { getSalesAgentSpecializationUseCase } from './get-sales-agent-specialization.use-case'
import { getTechMaturityVsClosuresUseCase } from './get-tech-maturity-vs-closures.use-case'

export const getAllMetricsUseCase = async () => {
  const [
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
  ] = await Promise.all([
    getMetricsCardsUseCase(),
    getHotLeadsUseCase(),
    getSalesAgentSpecializationUseCase(),
    getClosuresOverTimeUseCase(),
    getClosuresBySalesAgentUseCase(),
    getBuyerSentimentVsClosuresUseCase(),
    getObjectionsAnalysisUseCase(),
    getIndustryClosuresUseCase(),
    getDiscoverySourcesUseCase(),
    getAverageLeadScoreByAgentUseCase(),
    getDiscoverySourcesUseCase(),
    getPurchaseIntentionDistributionUseCase(),
    getTechMaturityVsClosuresUseCase(),
    getCustomerPainsByIndustryUseCase(),
    getLeadScoreVsCloseRateUseCase(),
  ])

  return {
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
  }
}
