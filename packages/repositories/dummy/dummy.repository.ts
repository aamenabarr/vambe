import { drizzleClient, DrizzleTransactionScope } from 'database'
import { dummy } from 'database/schemas'
import { Dummy } from 'domain-clean/dummy/dummy.entity'
import { eq } from 'drizzle-orm'

import { DummyRepositoryInterface } from './dummy.repository.interface'

export const buildDummy = (data: typeof dummy.$inferSelect): Dummy => {
  return new Dummy({
    id: data.id,
  })
}

export class DummyRepository implements DummyRepositoryInterface {
  private _context: DrizzleTransactionScope | typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }
  async get(id: string): Promise<typeof dummy.$inferSelect | null> {
    const result = await this._context
      .select()
      .from(dummy)
      .where(eq(dummy.id, id))

    if (!result.length) {
      return null
    }

    return buildDummy(result[0])
  }
}
