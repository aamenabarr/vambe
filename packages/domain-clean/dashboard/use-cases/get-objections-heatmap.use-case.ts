import { Industry, TechnologicalMaturity, PurchaseObjection } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getObjectionsHeatmapUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

  const objectionMap = new Map<PurchaseObjection, { closed: number; notClosed: number }>()

  data.forEach((item) => {
    item.llmAnalysis.purchaseObjections.forEach((objection) => {
      if (objection === PurchaseObjection.UNDEFINED) return

      if (!objectionMap.has(objection)) {
        objectionMap.set(objection, { closed: 0, notClosed: 0 })
      }

      const objectionData = objectionMap.get(objection)!
      if (item.meeting.closed) {
        objectionData.closed++
      } else {
        objectionData.notClosed++
      }
    })
  })

  return Array.from(objectionMap.entries())
    .map(([objection, data]) => {
      const total = data.closed + data.notClosed
      const rate = total > 0 ? (data.closed / total) * 100 : 0
      
      return {
        objection,
        closed: data.closed,
        notClosed: data.notClosed,
        rate,
      }
    })
    .sort((a, b) => b.rate - a.rate)
}
