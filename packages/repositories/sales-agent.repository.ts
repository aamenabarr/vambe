import { drizzleClient } from 'database'
import { SalesAgent as SalesAgentEntity } from 'domain-clean/sales-agent/sales-agent.entity'
import { eq } from 'drizzle-orm'

import { SalesAgent, salesAgentsTable } from '../database/schemas'

const toDateString = (value: string | Date): string => {
  return typeof value === 'string' ? value : value.toISOString()
}

export const buildSalesAgent = (data: SalesAgent): SalesAgentEntity => {
  return new SalesAgentEntity({
    ...data,
    createdAt: toDateString(data.createdAt as string | Date),
    updatedAt: toDateString(data.updatedAt as string | Date),
  })
}

export class SalesAgentRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async create(data: { name: string }) {
    const [result] = await this._context.insert(salesAgentsTable).values(data).returning()

    return buildSalesAgent(result)
  }

  async findByName(name: string) {
    const [result] = await this._context
      .select()
      .from(salesAgentsTable)
      .where(eq(salesAgentsTable.name, name))
      .limit(1)

    return result ? buildSalesAgent(result) : null
  }

  async findOrCreate(name: string) {
    const existing = await this.findByName(name)
    if (existing) {
      return existing
    }

    return await this.create({ name })
  }

  async deleteAll() {
    return await this._context.delete(salesAgentsTable)
  }

  async findAll() {
    const results = await this._context
      .select()
      .from(salesAgentsTable)
      .orderBy(salesAgentsTable.name)

    return results.map((r) => buildSalesAgent(r))
  }
}
