import { Industry, TechnologicalMaturity, BuyerSentiment } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getSentimentConversionUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

  const sentimentGroups = new Map<
    BuyerSentiment,
    { total: number; closed: number; sentimentValue: number }
  >()

  sentimentGroups.set(BuyerSentiment.SKEPTICAL, { total: 0, closed: 0, sentimentValue: 1 })
  sentimentGroups.set(BuyerSentiment.NEUTRAL, { total: 0, closed: 0, sentimentValue: 2 })
  sentimentGroups.set(BuyerSentiment.CONFIDENT, { total: 0, closed: 0, sentimentValue: 3 })

  data.forEach((item) => {
    const sentiment = item.llmAnalysis.buyerSentiment
    if (sentiment === BuyerSentiment.UNDEFINED) return

    const group = sentimentGroups.get(sentiment)
    if (group) {
      group.total++
      if (item.meeting.closed) {
        group.closed++
      }
    }
  })

  const result: Array<{ sentiment: number; conversion: number; count: number; label: string }> = []

  sentimentGroups.forEach((group, sentiment) => {
    if (group.total > 0) {
      const conversion = (group.closed / group.total) * 100
      const label =
        sentiment === BuyerSentiment.SKEPTICAL
          ? 'Escéptico'
          : sentiment === BuyerSentiment.NEUTRAL
            ? 'Neutral'
            : 'Confiado'

      result.push({
        sentiment: group.sentimentValue,
        conversion,
        count: group.total,
        label,
      })
    }
  })

  return result
}
