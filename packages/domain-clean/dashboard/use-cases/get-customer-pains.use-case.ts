import { Industry, TechnologicalMaturity, CustomerPain } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getCustomerPainsUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

  const closedData = data.filter((item) => item.meeting.closed)

  const painMap = new Map<CustomerPain, number>()

  closedData.forEach((item) => {
    item.llmAnalysis.customerPains.forEach((pain) => {
      if (pain !== CustomerPain.UNDEFINED && pain !== CustomerPain.OTHER) {
        painMap.set(pain, (painMap.get(pain) || 0) + 1)
      }
    })
  })

  const pains = Array.from(painMap.entries())
    .map(([pain, count]) => ({
      pain,
      count,
      weight: Math.min(100, (count / closedData.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)

  return {
    pains,
    topPhrases: [] as Array<{ phrase: string; count: number; closed: boolean }>,
  }
}
