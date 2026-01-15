import { z } from 'zod'
import {
  BuyerProfile,
  BuyerSentiment,
  CustomerPain,
  Industry,
  PurchaseIntention,
  PurchaseObjection,
  TechnologicalMaturity,
} from '../enums'

export const LlmAnalysisSchema = z.object({
  id: z.string().uuid(),
  meetingId: z.string().uuid(),
  leadScore: z.number().int(),
  purchaseIntention: z.nativeEnum(PurchaseIntention),
  technologicalMaturity: z.nativeEnum(TechnologicalMaturity),
  buyerProfile: z.nativeEnum(BuyerProfile),
  buyerSentiment: z.nativeEnum(BuyerSentiment),
  customerPains: z.array(z.nativeEnum(CustomerPain)),
  purchaseObjections: z.array(z.nativeEnum(PurchaseObjection)),
  industry: z.nativeEnum(Industry),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class LlmAnalysis {
  private readonly _data: z.infer<typeof LlmAnalysisSchema>

  constructor(data: z.infer<typeof LlmAnalysisSchema>) {
    const validatedData = LlmAnalysisSchema.parse(data)
    this._data = validatedData
  }

  get id() {
    return this._data.id
  }

  get meetingId() {
    return this._data.meetingId
  }

  get leadScore() {
    return this._data.leadScore
  }

  get purchaseIntention() {
    return this._data.purchaseIntention
  }

  get technologicalMaturity() {
    return this._data.technologicalMaturity
  }

  get buyerProfile() {
    return this._data.buyerProfile
  }

  get buyerSentiment() {
    return this._data.buyerSentiment
  }

  get customerPains() {
    return this._data.customerPains
  }

  get purchaseObjections() {
    return this._data.purchaseObjections
  }

  get industry() {
    return this._data.industry
  }

  get createdAt() {
    return this._data.createdAt
  }

  get updatedAt() {
    return this._data.updatedAt
  }

  toObject() {
    return this._data
  }
}
