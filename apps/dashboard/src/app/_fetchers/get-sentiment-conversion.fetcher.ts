import { getSentimentConversionUseCase } from 'domain-clean/dashboard/use-cases/get-sentiment-conversion.use-case'
import { FilterValue, Industry, TechnologicalMaturity } from 'domain-clean/enums'

import { getSellerIdByName } from './seller-helper'

export type DashboardFilters = {
  seller: string
  industry: string
  techMaturity: string
}

export async function getSentimentConversion(filters: DashboardFilters) {
  const sellerId =
    filters.seller === FilterValue.ALL ? undefined : await getSellerIdByName(filters.seller)

  return await getSentimentConversionUseCase({
    sellerId,
    industry: filters.industry === FilterValue.ALL ? undefined : (filters.industry as Industry),
    techMaturity:
      filters.techMaturity === FilterValue.ALL
        ? undefined
        : (filters.techMaturity as TechnologicalMaturity),
  })
}
