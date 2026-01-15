import { drizzleClient } from 'database'
import {
  PurchaseIntention,
  TechnologicalMaturity,
  Industry,
  CustomerPain,
  PurchaseObjection,
  BuyerProfile,
  BuyerSentiment,
} from 'domain-clean/enums'
import { LlmAnalysis as LlmAnalysisEntity } from 'domain-clean/llm-analysis/llm-analysis.entity'

import { LlmAnalysis, llmAnalysesTable } from '../database/schemas'

export const buildLlmAnalysis = (data: LlmAnalysis): LlmAnalysisEntity => {
  return new LlmAnalysisEntity({
    ...data,
    purchaseIntention: data.purchaseIntention as PurchaseIntention,
    technologicalMaturity: data.technologicalMaturity as TechnologicalMaturity,
    industry: data.industry as Industry,
    customerPains: data.customerPains as CustomerPain[],
    purchaseObjections: data.purchaseObjections as PurchaseObjection[],
    buyerProfile: data.buyerProfile as BuyerProfile,
    buyerSentiment: data.buyerSentiment as BuyerSentiment,
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

  async deleteAll() {
    return await this._context.delete(llmAnalysesTable)
  }
}
