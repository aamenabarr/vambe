import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import {
  purchaseIntentionEnum,
  technologicalMaturityEnum,
  vambeDiscoverySourceEnum,
  customerPainEnum,
  purchaseObjectionEnum,
  industryEnum,
  buyerSentimentEnum,
} from './enums'
import { meetingsTable } from './meetings'

export const llmAnalysesTable = pgTable('llm_analyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  meetingId: uuid('meeting_id')
    .notNull()
    .references(() => meetingsTable.id),
  leadScore: integer('lead_score').notNull(),
  purchaseIntention: purchaseIntentionEnum('purchase_intention').notNull(),
  technologicalMaturity: technologicalMaturityEnum('technological_maturity').notNull(),
  vambeDiscoverySource: vambeDiscoverySourceEnum('vambe_discovery_source').notNull(),
  buyerSentiment: buyerSentimentEnum('buyer_sentiment').notNull(),
  customerPains: customerPainEnum('customer_pains').array().notNull(),
  purchaseObjections: purchaseObjectionEnum('purchase_objections').array().notNull(),
  industry: industryEnum('industry').notNull(),
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

export type LlmAnalysis = typeof llmAnalysesTable.$inferSelect
