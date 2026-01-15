import { drizzleClient } from 'database'
import { SalesAgent as SalesAgentEntity } from 'domain-clean/sales-agent/sales-agent.entity'

import { SalesAgent, salesAgentsTable } from '../database/schemas'

export const buildSalesAgent = (data: SalesAgent): SalesAgentEntity => {  
  return new SalesAgentEntity(data)
}

export class SalesAgentRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async deleteAll() {
    return await this._context.delete(salesAgentsTable)
  }
}
