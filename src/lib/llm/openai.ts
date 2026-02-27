import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";
import type { AIExtractionResult } from "../types";
import {
  INDUSTRIES,
  COMPANY_SIZES,
  PAIN_POINTS,
  DISCOVERY_SOURCES,
  INTEGRATIONS,
  OPPORTUNITIES,
  LEAD_SCORES,
  Industry,
  CompanySize,
  PainPoint,
  DiscoverySource,
  Integration,
  Opportunity,
  LeadScore,
} from "../types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transcriptionAnalysisPrompt = readFileSync(
  join(process.cwd(), "src/lib/llm/transcription-analysis-prompt.txt"),
  "utf-8"
);

const leadReassignmentPrompt = readFileSync(
  join(process.cwd(), "src/lib/llm/lead-reassignment-prompt.txt"),
  "utf-8"
);

function validateEnum<T extends string>(value: string, valid: readonly T[], fallback: T): T {
  return valid.includes(value as T) ? (value as T) : fallback;
}

function validateEnumArray<T extends string>(values: string[], valid: readonly T[], fallback: T): T[] {
  if (!Array.isArray(values) || values.length === 0) return [fallback];
  const mapped = values.map((v) => validateEnum(v, valid, fallback));
  return [...new Set(mapped)];
}

function sanitizeResult(raw: Record<string, unknown>): AIExtractionResult {
  return {
    industry: validateEnum(raw.industry as string, INDUSTRIES, Industry.OTHER),
    company_size: validateEnum(raw.company_size as string, COMPANY_SIZES, CompanySize.OTHER),
    main_pain_points: validateEnumArray(raw.main_pain_points as string[], PAIN_POINTS, PainPoint.OTHER),
    discovery_source: validateEnum(raw.discovery_source as string, DISCOVERY_SOURCES, DiscoverySource.OTHER),
    integrations: validateEnumArray(raw.integrations as string[], INTEGRATIONS, Integration.OTHER),
    opportunities: validateEnumArray(raw.opportunities as string[], OPPORTUNITIES, Opportunity.OTHER),
    lead_score: validateEnum(raw.lead_score as string, LEAD_SCORES, LeadScore.OTHER),
  };
}

export async function sendLLMPrompt(
  message: string,
  prompt: string
): Promise<Record<string, unknown>> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    top_p: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: message },
    ],
  });
  return JSON.parse(response.choices[0].message.content!) as Record<string, unknown>;
}

export async function extractLeadInsights(transcript: string): Promise<AIExtractionResult> {
  const raw = await sendLLMPrompt(transcript, transcriptionAnalysisPrompt);
  return sanitizeResult(raw);
}

export async function reassignLeadWithLLM(message: string): Promise<string> {
  const raw = await sendLLMPrompt(message, leadReassignmentPrompt);
  return raw.vendor_id as string;
}
