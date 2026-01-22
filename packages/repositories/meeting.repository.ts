import { and, count, drizzleClient, eq, sql } from 'database'
import { Meeting as MeetingEntity } from 'domain-clean/meeting/meeting.entity'

import { Meeting, meetingsTable } from '../database/schemas'

const toDateString = (value: string | Date): string => {
  return typeof value === 'string' ? value : value.toISOString()
}

export const buildMeeting = (data: Meeting): MeetingEntity => {
  return new MeetingEntity({
    ...data,
    date: toDateString(data.date as string | Date),
    createdAt: toDateString(data.createdAt as string | Date),
    updatedAt: toDateString(data.updatedAt as string | Date),
  })
}

export class MeetingRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async create(data: {
    customerId: string
    salesAgentId: string
    date: string
    closed: boolean
    transcript: string
  }) {
    const [result] = await this._context.insert(meetingsTable).values(data).returning()

    return buildMeeting(result)
  }

  async deleteAll() {
    return await this._context.delete(meetingsTable)
  }

  async findAll() {
    const results = await this._context.select().from(meetingsTable)

    return results.map((m) => buildMeeting(m))
  }

  async findAllWithRelations() {
    const results = await this._context.query.meetingsTable.findMany({
      with: {
        salesAgent: true,
        customer: true,
        llmAnalyses: true,
      },
    })

    return results as unknown[]
  }

  async getClosedCount() {
    const [result] = await this._context
      .select({ count: count() })
      .from(meetingsTable)
      .where(sql`${meetingsTable.closed} = true`)

    return result?.count || 0
  }

  async getTotalCount() {
    const [result] = await this._context.select({ count: count() }).from(meetingsTable)

    return result?.count || 0
  }

  async getClosedByDateRange(startDate?: string, endDate?: string) {
    const conditions = [eq(meetingsTable.closed, true)]

    if (startDate) {
      conditions.push(sql`DATE(${meetingsTable.date}) >= ${startDate}`)
    }

    if (endDate) {
      conditions.push(sql`DATE(${meetingsTable.date}) <= ${endDate}`)
    }

    const results = await this._context
      .select({
        date: sql<string>`DATE(${meetingsTable.date})`,
        count: count(),
      })
      .from(meetingsTable)
      .where(and(...conditions))
      .groupBy(sql`DATE(${meetingsTable.date})`)
      .orderBy(sql`DATE(${meetingsTable.date})`)

    return results
  }

  async getClosedBySalesAgent() {
    const results = await this._context
      .select({
        salesAgentId: meetingsTable.salesAgentId,
        count: count(),
      })
      .from(meetingsTable)
      .where(eq(meetingsTable.closed, true))
      .groupBy(meetingsTable.salesAgentId)

    return results
  }
}
