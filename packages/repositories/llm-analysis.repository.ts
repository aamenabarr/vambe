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
import { buildCustomer } from './customer.repository'
import { buildMeeting } from './meeting.repository'
import { buildSalesAgent } from './sales-agent.repository'

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
    createdAt:
      typeof data.createdAt === 'string' ? data.createdAt : (data.createdAt as Date).toISOString(),
    updatedAt:
      typeof data.updatedAt === 'string' ? data.updatedAt : (data.updatedAt as Date).toISOString(),
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
    const [result] = await this._context
      .insert(llmAnalysesTable)
      .values({
        meetingId: data.meetingId,
        leadScore: data.leadScore,
        purchaseIntention: data.purchaseIntention,
        technologicalMaturity: data.technologicalMaturity,
        vambeDiscoverySource: data.vambeDiscoverySource,
        buyerSentiment: data.buyerSentiment,
        customerPains: data.customerPains,
        purchaseObjections: data.purchaseObjections,
        industry: data.industry,
      })
      .returning()

    return buildLlmAnalysis(result)
  }

  async deleteAll() {
    return await this._context.delete(llmAnalysesTable)
  }


  async findWithFilters(filters: {
    sellerId?: string
    industry?: Industry
    techMaturity?: TechnologicalMaturity
    dateFrom?: string
    dateTo?: string
  }) {
    let meetingIds: string[] | undefined

    if (filters.sellerId) {
      const meetings = await this._context.query.meetingsTable.findMany({
        where: (meeting, { eq }) => eq(meeting.salesAgentId, filters.sellerId!),
        columns: { id: true },
      })
      meetingIds = meetings.map((m) => m.id)
      if (meetingIds.length === 0) {
        return []
      }
    }

    const results = await this._context.query.llmAnalysesTable.findMany({
      where: (llmAnalysis, { eq, gte, lte, and, inArray: inArrayFn }) => {
        const conditions = []

        if (meetingIds) {
          conditions.push(inArrayFn(llmAnalysis.meetingId, meetingIds))
        }

        if (filters.industry) {
          conditions.push(eq(llmAnalysis.industry, filters.industry))
        }

        if (filters.techMaturity) {
          conditions.push(eq(llmAnalysis.technologicalMaturity, filters.techMaturity))
        }

        if (filters.dateFrom) {
          conditions.push(gte(llmAnalysis.createdAt, filters.dateFrom))
        }

        if (filters.dateTo) {
          conditions.push(lte(llmAnalysis.createdAt, filters.dateTo))
        }

        return conditions.length > 0 ? and(...conditions) : undefined
      },
      with: {
        meeting: {
          with: {
            customer: true,
            salesAgent: true,
          },
        },
      },
    })

    return results.map((r) => ({
      llmAnalysis: buildLlmAnalysis(r),
      meeting: buildMeeting(r.meeting),
      customer: buildCustomer(r.meeting.customer),
      salesAgent: buildSalesAgent(r.meeting.salesAgent),
    }))
  }

  async findForLeadScoreTable(filters: {
    sellerId?: string
    industry?: Industry
    techMaturity?: TechnologicalMaturity
    dateFrom?: string
    dateTo?: string
    limit?: number
  }) {
    let meetingIds: string[] | undefined

    if (filters.sellerId) {
      const meetings = await this._context.query.meetingsTable.findMany({
        where: (meeting, { eq }) => eq(meeting.salesAgentId, filters.sellerId!),
        columns: { id: true },
      })
      meetingIds = meetings.map((m) => m.id)
      if (meetingIds.length === 0) {
        return []
      }
    }

    const results = await this._context.query.llmAnalysesTable.findMany({
      where: (llmAnalysis, { eq, gte, lte, and, inArray: inArrayFn }) => {
        const conditions = []

        if (meetingIds) {
          conditions.push(inArrayFn(llmAnalysis.meetingId, meetingIds))
        }

        if (filters.industry) {
          conditions.push(eq(llmAnalysis.industry, filters.industry))
        }

        if (filters.techMaturity) {
          conditions.push(eq(llmAnalysis.technologicalMaturity, filters.techMaturity))
        }

        if (filters.dateFrom) {
          conditions.push(gte(llmAnalysis.createdAt, filters.dateFrom))
        }

        if (filters.dateTo) {
          conditions.push(lte(llmAnalysis.createdAt, filters.dateTo))
        }

        return conditions.length > 0 ? and(...conditions) : undefined
      },
      with: {
        meeting: {
          with: {
            customer: true,
            salesAgent: true,
          },
        },
      },
      orderBy: (llmAnalysis, { desc }) => [desc(llmAnalysis.leadScore)],
      limit: filters.limit,
    })

    return results.map((r) => ({
      llmAnalysis: buildLlmAnalysis(r),
      meeting: buildMeeting(r.meeting),
      customer: buildCustomer(r.meeting.customer),
      salesAgent: buildSalesAgent(r.meeting.salesAgent),
    }))
  }
}
