import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";
import type { AIExtractionResult, Industry, CompanySize, PainPoint, DiscoverySource, Integration, Opportunity, LeadScore } from "./types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = readFileSync(
  join(process.cwd(), "src/lib/prompt.txt"),
  "utf-8"
);

const VALID_INDUSTRIES: Industry[] = ["FINANCE", "RETAIL", "HEALTHCARE", "TECH", "EDUCATION", "LOGISTICS", "TRAVEL", "FASHION", "CONSULTING", "FOOD_BEVERAGE", "REAL_ESTATE", "NON_PROFIT", "MANUFACTURING", "OTHER", "UNKNOWN"];
const VALID_COMPANY_SIZES: CompanySize[] = ["SMALL", "MEDIUM", "LARGE", "ENTERPRISE", "OTHER", "UNKNOWN"];
const VALID_PAIN_POINTS: PainPoint[] = ["HIGH_WORKLOAD", "REPETITIVE_QUERIES", "SCALABILITY_ISSUES", "MANUAL_INEFFICIENCY", "SLOW_RESPONSE_TIME", "DATA_PRIVACY", "INTEGRATION_DIFFICULTY", "MULTILINGUAL_SUPPORT", "OTHER", "UNKNOWN"];
const VALID_DISCOVERY_SOURCES: DiscoverySource[] = ["CONFERENCE", "SEARCH_ENGINE", "NETWORKING", "REFERRAL", "SOCIAL_MEDIA", "WEBINAR", "ARTICLE", "OTHER", "UNKNOWN"];
const VALID_INTEGRATIONS: Integration[] = ["CRM", "ECOMMERCE_PLATFORM", "SCHEDULING_SYSTEM", "ERP", "API", "CHAT_PLATFORM", "TICKETING_SYSTEM", "PROPERTY_DATABASE", "OTHER", "UNKNOWN"];
const VALID_OPPORTUNITIES: Opportunity[] = ["AUTOMATION", "CX_IMPROVEMENT", "PERSONALIZATION", "TEAM_EFFICIENCY", "INTERNATIONAL_EXPANSION", "COST_REDUCTION", "SCALABILITY", "OTHER", "UNKNOWN"];
const VALID_LEAD_SCORES: LeadScore[] = ["HOT", "WARM", "COLD", "OTHER", "UNKNOWN"];

function validateEnum<T extends string>(value: string, valid: T[], fallback: T): T {
  return valid.includes(value as T) ? (value as T) : fallback;
}

function validateEnumArray<T extends string>(values: string[], valid: T[], fallback: T): T[] {
  if (!Array.isArray(values) || values.length === 0) return [fallback];
  const mapped = values.map((v) => validateEnum(v, valid, fallback));
  return [...new Set(mapped)];
}

function sanitizeResult(raw: Record<string, unknown>): AIExtractionResult {
  return {
    industry: validateEnum(raw.industry as string, VALID_INDUSTRIES, "OTHER"),
    company_size: validateEnum(raw.company_size as string, VALID_COMPANY_SIZES, "OTHER"),
    main_pain_points: validateEnumArray(raw.main_pain_points as string[], VALID_PAIN_POINTS, "OTHER"),
    discovery_source: validateEnum(raw.discovery_source as string, VALID_DISCOVERY_SOURCES, "OTHER"),
    integrations: validateEnumArray(raw.integrations as string[], VALID_INTEGRATIONS, "OTHER"),
    opportunities: validateEnumArray(raw.opportunities as string[], VALID_OPPORTUNITIES, "OTHER"),
    lead_score: validateEnum(raw.lead_score as string, VALID_LEAD_SCORES, "OTHER"),
  };
}

export async function extractLeadInsights(transcript: string): Promise<AIExtractionResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    top_p: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: transcript },
    ],
  });

  const raw = JSON.parse(response.choices[0].message.content!);
  return sanitizeResult(raw);
}
