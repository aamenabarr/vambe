import { Industry, TechnologicalMaturity, VambeDiscoverySource } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getDiscoverySourceUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

    const sourceMap = new Map<VambeDiscoverySource, number>()

    data.forEach((item) => {
      const source = item.llmAnalysis.vambeDiscoverySource
      if (source === VambeDiscoverySource.UNDEFINED) return

      sourceMap.set(source, (sourceMap.get(source) || 0) + 1)
    })

    const total = data.length

    return Array.from(sourceMap.entries())
      .map(([source, count]) => ({
        source,
        value: total > 0 ? (count / total) * 100 : 0,
        count,
      }))
      .sort((a, b) => b.value - a.value)
}
