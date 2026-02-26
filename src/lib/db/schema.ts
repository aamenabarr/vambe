import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const leadStatusEnum = pgEnum("lead_status", ["PROCESSED", "UNPROCESSED"]);

export const industryEnum = pgEnum("industry", [
  "FINANCE", "RETAIL", "HEALTHCARE", "TECH", "EDUCATION", "LOGISTICS",
  "TRAVEL", "FASHION", "CONSULTING", "FOOD_BEVERAGE", "REAL_ESTATE",
  "NON_PROFIT", "MANUFACTURING", "OTHER", "UNKNOWN",
]);

export const companySizeEnum = pgEnum("company_size", [
  "SMALL", "MEDIUM", "LARGE", "ENTERPRISE", "OTHER", "UNKNOWN",
]);

export const painPointsEnum = pgEnum("pain_points", [
  "HIGH_WORKLOAD", "REPETITIVE_QUERIES", "SCALABILITY_ISSUES",
  "MANUAL_INEFFICIENCY", "SLOW_RESPONSE_TIME", "DATA_PRIVACY",
  "INTEGRATION_DIFFICULTY", "MULTILINGUAL_SUPPORT", "OTHER", "UNKNOWN",
]);

export const discoverySourceEnum = pgEnum("discovery_source", [
  "CONFERENCE", "SEARCH_ENGINE", "NETWORKING", "REFERRAL",
  "SOCIAL_MEDIA", "WEBINAR", "ARTICLE", "OTHER", "UNKNOWN",
]);

export const integrationsEnum = pgEnum("integrations", [
  "CRM", "ECOMMERCE_PLATFORM", "SCHEDULING_SYSTEM", "ERP", "API",
  "CHAT_PLATFORM", "TICKETING_SYSTEM", "PROPERTY_DATABASE", "OTHER", "UNKNOWN",
]);

export const opportunitiesEnum = pgEnum("opportunities", [
  "AUTOMATION", "CX_IMPROVEMENT", "PERSONALIZATION", "TEAM_EFFICIENCY",
  "INTERNATIONAL_EXPANSION", "COST_REDUCTION", "SCALABILITY", "OTHER", "UNKNOWN",
]);

export const leadScoreEnum = pgEnum("lead_score", [
  "HOT", "WARM", "COLD", "OTHER", "UNKNOWN",
]);

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
  leadStatus: leadStatusEnum("lead_status").notNull().default("UNPROCESSED"),
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
