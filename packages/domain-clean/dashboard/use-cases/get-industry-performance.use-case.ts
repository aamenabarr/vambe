import { Industry, TechnologicalMaturity } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getIndustryPerformanceUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

    const industryMap = new Map<Industry, { leads: number; closed: number; revenue: number }>()

    data.forEach((item) => {
      const industry = item.llmAnalysis.industry
      if (industry === Industry.UNDEFINED) return

      if (!industryMap.has(industry)) {
        industryMap.set(industry, { leads: 0, closed: 0, revenue: 0 })
      }

      const industryData = industryMap.get(industry)!
      industryData.leads++
      if (item.meeting.closed) {
        industryData.closed++
      }
      industryData.revenue += item.llmAnalysis.leadScore * 1000
    })

    return Array.from(industryMap.entries())
      .map(([industry, data]) => ({
        industry,
        leads: data.leads,
        closeRate: data.leads > 0 ? (data.closed / data.leads) * 100 : 0,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.closeRate - a.closeRate)
}
