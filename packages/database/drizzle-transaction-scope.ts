import { ExtractTablesWithRelations } from 'drizzle-orm'
import { NeonHttpQueryResultHKT } from 'drizzle-orm/neon-http'
import { PgTransaction } from 'drizzle-orm/pg-core'

import * as schema from './schemas'

export type DrizzleTransactionScope = PgTransaction<
  NeonHttpQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>
