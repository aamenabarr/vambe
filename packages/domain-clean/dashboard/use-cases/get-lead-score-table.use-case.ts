import { Industry, TechnologicalMaturity } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getLeadScoreTableUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findForLeadScoreTable({
    ...filters,
    limit: 50,
  })

  return data.map((item) => ({
    id: item.llmAnalysis.id,
    customerName: item.customer.name,
    customerEmail: item.customer.email,
    sellerName: item.salesAgent.name,
    score: item.llmAnalysis.leadScore,
    purchaseIntention: item.llmAnalysis.purchaseIntention,
    buyerSentiment: item.llmAnalysis.buyerSentiment,
    industry: item.llmAnalysis.industry,
    value: item.llmAnalysis.leadScore * 1000,
    closed: item.meeting.closed,
  }))
}
