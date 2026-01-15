import { drizzleClient } from 'database'
import { Customer as CustomerEntity } from 'domain-clean/customer/customer.entity'
import { Customer } from '../database/schemas'

export const buildCustomer = (data: Customer): CustomerEntity => {
  return new CustomerEntity(data)
}

export class CustomerRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }
}
