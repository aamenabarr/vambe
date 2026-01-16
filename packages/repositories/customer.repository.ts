import { drizzleClient } from 'database'
import { Customer as CustomerEntity } from 'domain-clean/customer/customer.entity'
import { eq } from 'drizzle-orm'

import { Customer, customersTable } from '../database/schemas'

export const buildCustomer = (data: Customer): CustomerEntity => {
  return new CustomerEntity({
    ...data,
    createdAt:
      typeof data.createdAt === 'string' ? data.createdAt : (data.createdAt as Date).toISOString(),
    updatedAt:
      typeof data.updatedAt === 'string' ? data.updatedAt : (data.updatedAt as Date).toISOString(),
  })
}

export class CustomerRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async create(data: { name: string; email: string; phone: string }) {
    const [result] = await this._context
      .insert(customersTable)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
      .returning()

    return buildCustomer(result)
  }

  async findByEmail(email: string) {
    const [result] = await this._context
      .select()
      .from(customersTable)
      .where(eq(customersTable.email, email))
      .limit(1)

    return result ? buildCustomer(result) : null
  }

  async findOrCreate(data: { name: string; email: string; phone: string }) {
    const existing = await this.findByEmail(data.email)
    if (existing) {
      return existing
    }

    return await this.create(data)
  }

  async deleteAll() {
    return await this._context.delete(customersTable)
  }
}
