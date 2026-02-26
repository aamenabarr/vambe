CREATE TYPE "public"."company_size" AS ENUM('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."discovery_source" AS ENUM('CONFERENCE', 'SEARCH_ENGINE', 'NETWORKING', 'REFERRAL', 'SOCIAL_MEDIA', 'WEBINAR', 'ARTICLE', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."industry" AS ENUM('FINANCE', 'RETAIL', 'HEALTHCARE', 'TECH', 'EDUCATION', 'LOGISTICS', 'TRAVEL', 'FASHION', 'CONSULTING', 'FOOD_BEVERAGE', 'REAL_ESTATE', 'NON_PROFIT', 'MANUFACTURING', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."integrations" AS ENUM('CRM', 'ECOMMERCE_PLATFORM', 'SCHEDULING_SYSTEM', 'ERP', 'API', 'CHAT_PLATFORM', 'TICKETING_SYSTEM', 'PROPERTY_DATABASE', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."lead_score" AS ENUM('HOT', 'WARM', 'COLD', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('PROCESSED', 'UNPROCESSED');--> statement-breakpoint
CREATE TYPE "public"."opportunities" AS ENUM('AUTOMATION', 'CX_IMPROVEMENT', 'PERSONALIZATION', 'TEAM_EFFICIENCY', 'INTERNATIONAL_EXPANSION', 'COST_REDUCTION', 'SCALABILITY', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."pain_points" AS ENUM('HIGH_WORKLOAD', 'REPETITIVE_QUERIES', 'SCALABILITY_ISSUES', 'MANUAL_INEFFICIENCY', 'SLOW_RESPONSE_TIME', 'DATA_PRIVACY', 'INTEGRATION_DIFFICULTY', 'MULTILINGUAL_SUPPORT', 'OTHER', 'UNKNOWN');--> statement-breakpoint
CREATE TABLE "lead" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sales_agent_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"meeting_date" timestamp NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"transcript" text NOT NULL,
	"lead_status" "lead_status" DEFAULT 'UNPROCESSED' NOT NULL,
	"industry" "industry",
	"company_size" "company_size",
	"main_pain_points" text,
	"discovery_source" "discovery_source",
	"integrations" text,
	"opportunities" text,
	"lead_score" "lead_score"
);
--> statement-breakpoint
CREATE TABLE "sales_agent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "sales_agent_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "lead" ADD CONSTRAINT "lead_sales_agent_id_sales_agent_id_fk" FOREIGN KEY ("sales_agent_id") REFERENCES "public"."sales_agent"("id") ON DELETE no action ON UPDATE no action;