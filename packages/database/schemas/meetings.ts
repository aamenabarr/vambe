import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { customersTable } from './customers'
import { salesAgentsTable } from './sales-agents'

export const meetingsTable = pgTable('meetings', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customersTable.id),
  salesAgentId: uuid('sales_agent_id')
    .notNull()
    .references(() => salesAgentsTable.id),
  date: timestamp('date', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull(),
  closed: boolean('closed').notNull().default(false),
  transcript: text('transcript').notNull(),
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
    .$onUpdate(() => new Date().toISOString())
})

export type Meeting = typeof meetingsTable.$inferSelect
