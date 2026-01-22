import { and, count, drizzleClient, eq, sql } from 'database'
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
import { meetingsTable } from '../database/schemas/meetings'

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

  async findAllWithRelations() {
    const results = await this._context.query.llmAnalysesTable.findMany({
      with: {
        meeting: {
          with: {
            salesAgent: true,
            customer: true,
          },
        },
      },
    })

    return results as unknown[]
  }

  async getAverageLeadScore() {
    const [result] = await this._context
      .select({ average: sql<number>`AVG(${llmAnalysesTable.leadScore})` })
      .from(llmAnalysesTable)

    return Number(result?.average || 0)
  }

  async getHotLeadsCount(threshold = 80) {
    const [result] = await this._context
      .select({ count: count() })
      .from(llmAnalysesTable)
      .where(sql`${llmAnalysesTable.leadScore} >= ${threshold}`)

    return result?.count || 0
  }

  async getTotalLeadsCount() {
    const [result] = await this._context
      .select({ count: count() })
      .from(llmAnalysesTable)

    return result?.count || 0
  }

  async getClosedCount() {
    const [result] = await this._context
      .select({ count: count() })
      .from(llmAnalysesTable)
      .innerJoin(meetingsTable, sql`${llmAnalysesTable.meetingId} = ${meetingsTable.id}`)
      .where(sql`${meetingsTable.closed} = true`)

    return result?.count || 0
  }

  async getHotLeadsClosedCount(threshold = 80) {
    const [result] = await this._context
      .select({ count: count() })
      .from(llmAnalysesTable)
      .innerJoin(meetingsTable, eq(llmAnalysesTable.meetingId, meetingsTable.id))
      .where(
        and(
          sql`${llmAnalysesTable.leadScore} >= ${threshold}`,
          eq(meetingsTable.closed, true),
        ),
      )

    return result?.count || 0
  }

  async getDataByBuyerSentiment() {
    const results = await this._context
      .select({
        buyerSentiment: llmAnalysesTable.buyerSentiment,
        total: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(llmAnalysesTable.buyerSentiment)

    return results
  }

  async getDataByTechMaturity() {
    const results = await this._context
      .select({
        techMaturity: llmAnalysesTable.technologicalMaturity,
        total: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(llmAnalysesTable.technologicalMaturity)

    return results
  }

  async getDataByIndustry() {
    const results = await this._context
      .select({
        industry: llmAnalysesTable.industry,
        total: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(llmAnalysesTable.industry)

    return results
  }

  async getDataByDiscoverySource() {
    const results = await this._context
      .select({
        source: llmAnalysesTable.vambeDiscoverySource,
        total: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(llmAnalysesTable.vambeDiscoverySource)

    return results
  }

  async getDataByPurchaseIntention() {
    const results = await this._context
      .select({
        intention: llmAnalysesTable.purchaseIntention,
        total: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(llmAnalysesTable.purchaseIntention)

    return results
  }

  async getObjectionsFrequency() {
    const allAnalyses = await this._context.select().from(llmAnalysesTable)

    const frequencyMap = new Map<string, number>()

    allAnalyses.forEach((analysis) => {
      const objections = analysis.purchaseObjections as string[]
      objections?.forEach((obj) => {
        frequencyMap.set(obj, (frequencyMap.get(obj) || 0) + 1)
      })
    })

    return Array.from(frequencyMap.entries()).map(([objection, frequency]) => ({
      objection,
      frequency,
    }))
  }

  async getCustomerPainsFrequency() {
    const allAnalyses = await this._context.select().from(llmAnalysesTable)

    const frequencyMap = new Map<string, number>()

    allAnalyses.forEach((analysis) => {
      const pains = analysis.customerPains as string[]
      pains?.forEach((pain) => {
        frequencyMap.set(pain, (frequencyMap.get(pain) || 0) + 1)
      })
    })

    return Array.from(frequencyMap.entries()).map(([pain, frequency]) => ({
      pain,
      frequency,
    }))
  }

  async getLeadScoreDistribution() {
    const results = await this._context
      .select({
        scoreRange: sql<string>`CASE 
          WHEN ${llmAnalysesTable.leadScore} >= 86 THEN '86-100'
          WHEN ${llmAnalysesTable.leadScore} >= 61 THEN '61-85'
          WHEN ${llmAnalysesTable.leadScore} >= 31 THEN '31-60'
          ELSE '0-30'
        END`,
        count: count(),
      })
      .from(llmAnalysesTable)
      .groupBy(sql`CASE 
        WHEN ${llmAnalysesTable.leadScore} >= 86 THEN '86-100'
        WHEN ${llmAnalysesTable.leadScore} >= 61 THEN '61-85'
        WHEN ${llmAnalysesTable.leadScore} >= 31 THEN '31-60'
        ELSE '0-30'
      END`)

    return results
  }
}
