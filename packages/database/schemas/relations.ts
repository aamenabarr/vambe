import { relations } from 'drizzle-orm'

import { customersTable } from './customers'
import { llmAnalysesTable } from './llm-analyses'
import { meetingsTable } from './meetings'
import { salesAgentsTable } from './sales-agents'

export const customersRelations = relations(customersTable, ({ many }) => ({
  meetings: many(meetingsTable),
}))

export const salesAgentsRelations = relations(salesAgentsTable, ({ many }) => ({
  meetings: many(meetingsTable),
}))

export const meetingsRelations = relations(meetingsTable, ({ one, many }) => ({
  customer: one(customersTable, {
    fields: [meetingsTable.customerId],
    references: [customersTable.id],
  }),
  salesAgent: one(salesAgentsTable, {
    fields: [meetingsTable.salesAgentId],
    references: [salesAgentsTable.id],
  }),
  llmAnalyses: many(llmAnalysesTable),
}))

export const llmAnalysesRelations = relations(llmAnalysesTable, ({ one }) => ({
  meeting: one(meetingsTable, {
    fields: [llmAnalysesTable.meetingId],
    references: [meetingsTable.id],
  }),
}))
