export type LeadStatus = "PROCESSED" | "UNPROCESSED";

export type Industry =
  | "FINANCE" | "RETAIL" | "HEALTHCARE" | "TECH" | "EDUCATION"
  | "LOGISTICS" | "TRAVEL" | "FASHION" | "CONSULTING" | "FOOD_BEVERAGE"
  | "REAL_ESTATE" | "NON_PROFIT" | "MANUFACTURING" | "OTHER" | "UNKNOWN";

export type CompanySize = "SMALL" | "MEDIUM" | "LARGE" | "ENTERPRISE" | "OTHER" | "UNKNOWN";

export type PainPoint =
  | "HIGH_WORKLOAD" | "REPETITIVE_QUERIES" | "SCALABILITY_ISSUES"
  | "MANUAL_INEFFICIENCY" | "SLOW_RESPONSE_TIME" | "DATA_PRIVACY"
  | "INTEGRATION_DIFFICULTY" | "MULTILINGUAL_SUPPORT" | "OTHER" | "UNKNOWN";

export type DiscoverySource =
  | "CONFERENCE" | "SEARCH_ENGINE" | "NETWORKING" | "REFERRAL"
  | "SOCIAL_MEDIA" | "WEBINAR" | "ARTICLE" | "OTHER" | "UNKNOWN";

export type Integration =
  | "CRM" | "ECOMMERCE_PLATFORM" | "SCHEDULING_SYSTEM" | "ERP" | "API"
  | "CHAT_PLATFORM" | "TICKETING_SYSTEM" | "PROPERTY_DATABASE" | "OTHER" | "UNKNOWN";

export type Opportunity =
  | "AUTOMATION" | "CX_IMPROVEMENT" | "PERSONALIZATION" | "TEAM_EFFICIENCY"
  | "INTERNATIONAL_EXPANSION" | "COST_REDUCTION" | "SCALABILITY" | "OTHER" | "UNKNOWN";

export type LeadScore = "HOT" | "WARM" | "COLD" | "OTHER" | "UNKNOWN";

export interface Lead {
  id: string;
  salesAgentId: string;
  name: string;
  email: string;
  phone: string | null;
  meetingDate: string;
  isClosed: boolean;
  transcript: string;
  leadStatus: LeadStatus;
  industry: Industry | null;
  companySize: CompanySize | null;
  mainPainPoints: PainPoint[] | null;
  discoverySource: DiscoverySource | null;
  integrations: Integration[] | null;
  opportunities: Opportunity[] | null;
  leadScore: LeadScore | null;
  salesAgent: SalesAgent;
}

export interface SalesAgent {
  id: string;
  name: string;
}

export interface ProcessingStatus {
  total: number;
  processed: number;
  pending: number;
}

export interface AIExtractionResult {
  industry: Industry;
  company_size: CompanySize;
  main_pain_points: PainPoint[];
  discovery_source: DiscoverySource;
  integrations: Integration[];
  opportunities: Opportunity[];
  lead_score: LeadScore;
}
