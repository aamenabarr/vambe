import { pgEnum } from 'drizzle-orm/pg-core'

export const buyerProfileEnum = pgEnum('buyer_profile', [
  'UNDEFINED',
  'ANALYTICAL',
  'RELATIONAL',
  'VISIONARY'
])
