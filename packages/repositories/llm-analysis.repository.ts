import { drizzleClient } from 'database'
import {
  PurchaseIntention,
  TechnologicalMaturity,
  Industry,
  CustomerPain,
  PurchaseObjection,
  VambeDiscoverySource,
  BuyerSentiment,
} from 'domain-clean/enums'
import { LlmAnalysis as LlmAnalysisEntity } from 'domain-clean/llm-analysis/llm-analysis.entity'

import { LlmAnalysis, llmAnalysesTable } from '../database/schemas'

const toDateString = (value: string | Date): string => {
  return typeof value === 'string' ? value : value.toISOString()
}

export const buildLlmAnalysis = (data: LlmAnalysis): LlmAnalysisEntity => {
  return new LlmAnalysisEntity({
    ...data,
    purchaseIntention: data.purchaseIntention as PurchaseIntention,
    technologicalMaturity: data.technologicalMaturity as TechnologicalMaturity,
    industry: data.industry as Industry,
    customerPains: data.customerPains as CustomerPain[],
    purchaseObjections: data.purchaseObjections as PurchaseObjection[],
    vambeDiscoverySource: data.vambeDiscoverySource as VambeDiscoverySource,
    buyerSentiment: data.buyerSentiment as BuyerSentiment,
    createdAt: toDateString(data.createdAt as string | Date),
    updatedAt: toDateString(data.updatedAt as string | Date),
  })
}

export class LlmAnalysisRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async create(data: {
    meetingId: string
    leadScore: number
    purchaseIntention: PurchaseIntention
    technologicalMaturity: TechnologicalMaturity
    vambeDiscoverySource: VambeDiscoverySource
    buyerSentiment: BuyerSentiment
    customerPains: CustomerPain[]
    purchaseObjections: PurchaseObjection[]
    industry: Industry
  }) {
    const [result] = await this._context.insert(llmAnalysesTable).values(data).returning()

    return buildLlmAnalysis(result)
  }

  async deleteAll() {
    return await this._context.delete(llmAnalysesTable)
  }
}
