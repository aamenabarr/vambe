import { pgEnum } from 'drizzle-orm/pg-core'

export const purchaseIntentionEnum = pgEnum('purchase_intention', [
  'LOW',
  'MEDIUM',
  'HIGH'
])
