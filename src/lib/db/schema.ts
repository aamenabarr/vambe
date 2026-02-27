import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  LeadStatus,
  Industry,
  CompanySize,
  PainPoint,
  DiscoverySource,
  Integration,
  Opportunity,
  LeadScore,
} from "@/lib/types";

export const leadStatusEnum = pgEnum("lead_status", LeadStatus);
export const industryEnum = pgEnum("industry", Industry);
export const companySizeEnum = pgEnum("company_size", CompanySize);
export const painPointsEnum = pgEnum("pain_points", PainPoint);
export const discoverySourceEnum = pgEnum("discovery_source", DiscoverySource);
export const integrationsEnum = pgEnum("integrations", Integration);
export const opportunitiesEnum = pgEnum("opportunities", Opportunity);
export const leadScoreEnum = pgEnum("lead_score", LeadScore);

export const salesAgent = pgTable("sales_agent", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

export const lead = pgTable("lead", {
  id: uuid("id").primaryKey().defaultRandom(),
  salesAgentId: uuid("sales_agent_id").notNull().references(() => salesAgent.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  meetingDate: timestamp("meeting_date").notNull(),
  isClosed: boolean("is_closed").notNull().default(false),
  transcript: text("transcript").notNull(),
  leadStatus: leadStatusEnum("lead_status").notNull().default(LeadStatus.UNPROCESSED),
  industry: industryEnum("industry"),
  companySize: companySizeEnum("company_size"),
  mainPainPoints: text("main_pain_points"),
  discoverySource: discoverySourceEnum("discovery_source"),
  integrations: text("integrations"),
  opportunities: text("opportunities"),
  leadScore: leadScoreEnum("lead_score"),
});

export const salesAgentRelations = relations(salesAgent, ({ many }) => ({
  leads: many(lead),
}));

export const leadRelations = relations(lead, ({ one }) => ({
  salesAgent: one(salesAgent, {
    fields: [lead.salesAgentId],
    references: [salesAgent.id],
  }),
}));
