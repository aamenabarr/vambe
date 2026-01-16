import {
  Industry,
  TechnologicalMaturity,
  BuyerSentiment,
  TechnologicalMaturity as TechMaturity,
} from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getSellerPerformanceUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const data = await llmAnalysisRepository.findWithFilters(filters)

  const sellerMap = new Map<
    string,
    Map<
      string,
      {
        total: number
        closed: number
      }
    >
  >()

  data.forEach((item) => {
    const sellerId = item.salesAgent.id

    if (!sellerMap.has(sellerId)) {
      sellerMap.set(sellerId, new Map())
    }

    const sellerCategories = sellerMap.get(sellerId)!

    const sentiment = item.llmAnalysis.buyerSentiment
    if (sentiment !== BuyerSentiment.UNDEFINED) {
      const categoryKey =
        sentiment === BuyerSentiment.SKEPTICAL
          ? 'Escépticos'
          : sentiment === BuyerSentiment.NEUTRAL
            ? 'Neutral'
            : 'Confiados'
      if (!sellerCategories.has(categoryKey)) {
        sellerCategories.set(categoryKey, { total: 0, closed: 0 })
      }
      const cat = sellerCategories.get(categoryKey)!
      cat.total++
      if (item.meeting.closed) cat.closed++
    }

    const techMaturity = item.llmAnalysis.technologicalMaturity
    if (techMaturity === TechMaturity.TECH_SAVVY) {
      const categoryKey = 'Tech Savvy'
      if (!sellerCategories.has(categoryKey)) {
        sellerCategories.set(categoryKey, { total: 0, closed: 0 })
      }
      const cat = sellerCategories.get(categoryKey)!
      cat.total++
      if (item.meeting.closed) cat.closed++
    } else if (techMaturity === TechMaturity.ANALOG) {
      const categoryKey = 'Analógicos'
      if (!sellerCategories.has(categoryKey)) {
        sellerCategories.set(categoryKey, { total: 0, closed: 0 })
      }
      const cat = sellerCategories.get(categoryKey)!
      cat.total++
      if (item.meeting.closed) cat.closed++
    }

    const purchaseIntention = item.llmAnalysis.purchaseIntention
    if (purchaseIntention === 'HIGH') {
      const categoryKey = 'Alta Intención'
      if (!sellerCategories.has(categoryKey)) {
        sellerCategories.set(categoryKey, { total: 0, closed: 0 })
      }
      const cat = sellerCategories.get(categoryKey)!
      cat.total++
      if (item.meeting.closed) cat.closed++
    }

    if (techMaturity === TechMaturity.DIGITALIZED) {
      const categoryKey = 'Pragmáticos'
      if (!sellerCategories.has(categoryKey)) {
        sellerCategories.set(categoryKey, { total: 0, closed: 0 })
      }
      const cat = sellerCategories.get(categoryKey)!
      cat.total++
      if (item.meeting.closed) cat.closed++
    }
  })

  const allCategories = [
    'Escépticos',
    'Pragmáticos',
    'Confiados',
    'Tech Savvy',
    'Analógicos',
    'Alta Intención',
  ]

  const sellers = Array.from(sellerMap.entries()).map(([sellerId, categories]) => {
    const sellerName = data.find((d) => d.salesAgent.id === sellerId)?.salesAgent.name || ''
    const sellerKey = sellerName.toLowerCase().replace(/\s+/g, '').substring(0, 5)

    const result: Record<string, number> = {}
    allCategories.forEach((category) => {
      const catData = categories.get(category)
      if (catData && catData.total > 0) {
        result[sellerKey] = (catData.closed / catData.total) * 100
      } else {
        result[sellerKey] = 0
      }
    })

    return {
      sellerId,
      sellerName,
      sellerKey,
      categories: result,
    }
  })

  const resultData = allCategories.map((category) => {
    const row: Record<string, number> = { [category]: 0 }
    sellers.forEach((seller) => {
      row[seller.sellerKey] = seller.categories[seller.sellerKey] || 0
    })

    return row
  })

  return {
    categories: allCategories,
    sellers: sellers.map((s) => ({ id: s.sellerId, name: s.sellerName, key: s.sellerKey })),
    data: resultData,
  }
}
