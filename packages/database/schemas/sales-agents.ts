import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const salesAgentsTable = pgTable('sales_agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
})

export type SalesAgent = typeof salesAgentsTable.$inferSelect
