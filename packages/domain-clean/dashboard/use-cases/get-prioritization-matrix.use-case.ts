import { Industry, TechnologicalMaturity, BuyerSentiment } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

const calculateIcpFit = (industry: Industry, techMaturity: string): number => {
  let fit = 50

  if (industry === Industry.TECHNOLOGY || industry === Industry.RETAIL_ECOMMERCE) {
    fit += 20
  }

  if (techMaturity === 'TECH_SAVVY') {
    fit += 20
  } else if (techMaturity === 'DIGITALIZED') {
    fit += 10
  }

  return Math.min(100, fit)
}

export const getPrioritizationMatrixUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

  return data.map((item) => {
    const purchaseIntention = item.llmAnalysis.purchaseIntention
    const intentionScore =
      purchaseIntention === 'HIGH' ? 85 : purchaseIntention === 'MEDIUM' ? 60 : 35

    const icpFit = calculateIcpFit(item.llmAnalysis.industry, item.llmAnalysis.technologicalMaturity)

    const buyerSentiment = item.llmAnalysis.buyerSentiment
    const skepticism =
      buyerSentiment === BuyerSentiment.SKEPTICAL
        ? 'high'
        : buyerSentiment === BuyerSentiment.NEUTRAL
          ? 'medium'
          : 'low'

    const value = item.llmAnalysis.leadScore * 1000

    return {
      intention: intentionScore,
      icpFit,
      score: item.llmAnalysis.leadScore,
      name: item.customer.name,
      skepticism,
      value,
    }
  })
}
