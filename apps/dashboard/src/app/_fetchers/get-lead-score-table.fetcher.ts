import { getLeadScoreTableUseCase } from 'domain-clean/dashboard/use-cases/get-lead-score-table.use-case'
import { FilterValue, Industry, TechnologicalMaturity } from 'domain-clean/enums'

import { getSellerIdByName } from './seller-helper'

export type DashboardFilters = {
  seller: string
  industry: string
  techMaturity: string
}

export async function getLeadScoreTable(filters: DashboardFilters) {
  const sellerId =
    filters.seller === FilterValue.ALL ? undefined : await getSellerIdByName(filters.seller)

  return await getLeadScoreTableUseCase({
    sellerId,
    industry: filters.industry === FilterValue.ALL ? undefined : (filters.industry as Industry),
    techMaturity:
      filters.techMaturity === FilterValue.ALL
        ? undefined
        : (filters.techMaturity as TechnologicalMaturity),
  })
}
