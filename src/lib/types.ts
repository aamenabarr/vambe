export const LeadStatus = {
  PROCESSED: "PROCESSED",
  UNPROCESSED: "UNPROCESSED",
} as const;
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const Industry = {
  FINANCE: "FINANCE",
  RETAIL: "RETAIL",
  HEALTHCARE: "HEALTHCARE",
  TECH: "TECH",
  EDUCATION: "EDUCATION",
  LOGISTICS: "LOGISTICS",
  TRAVEL: "TRAVEL",
  FASHION: "FASHION",
  CONSULTING: "CONSULTING",
  FOOD_BEVERAGE: "FOOD_BEVERAGE",
  REAL_ESTATE: "REAL_ESTATE",
  NON_PROFIT: "NON_PROFIT",
  MANUFACTURING: "MANUFACTURING",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type Industry = (typeof Industry)[keyof typeof Industry];

export const CompanySize = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
  ENTERPRISE: "ENTERPRISE",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type CompanySize = (typeof CompanySize)[keyof typeof CompanySize];

export const PainPoint = {
  HIGH_WORKLOAD: "HIGH_WORKLOAD",
  REPETITIVE_QUERIES: "REPETITIVE_QUERIES",
  SCALABILITY_ISSUES: "SCALABILITY_ISSUES",
  MANUAL_INEFFICIENCY: "MANUAL_INEFFICIENCY",
  SLOW_RESPONSE_TIME: "SLOW_RESPONSE_TIME",
  DATA_PRIVACY: "DATA_PRIVACY",
  INTEGRATION_DIFFICULTY: "INTEGRATION_DIFFICULTY",
  MULTILINGUAL_SUPPORT: "MULTILINGUAL_SUPPORT",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type PainPoint = (typeof PainPoint)[keyof typeof PainPoint];

export const DiscoverySource = {
  CONFERENCE: "CONFERENCE",
  SEARCH_ENGINE: "SEARCH_ENGINE",
  NETWORKING: "NETWORKING",
  REFERRAL: "REFERRAL",
  SOCIAL_MEDIA: "SOCIAL_MEDIA",
  WEBINAR: "WEBINAR",
  ARTICLE: "ARTICLE",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type DiscoverySource = (typeof DiscoverySource)[keyof typeof DiscoverySource];

export const Integration = {
  CRM: "CRM",
  ECOMMERCE_PLATFORM: "ECOMMERCE_PLATFORM",
  SCHEDULING_SYSTEM: "SCHEDULING_SYSTEM",
  ERP: "ERP",
  API: "API",
  CHAT_PLATFORM: "CHAT_PLATFORM",
  TICKETING_SYSTEM: "TICKETING_SYSTEM",
  PROPERTY_DATABASE: "PROPERTY_DATABASE",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type Integration = (typeof Integration)[keyof typeof Integration];

export const Opportunity = {
  AUTOMATION: "AUTOMATION",
  CX_IMPROVEMENT: "CX_IMPROVEMENT",
  PERSONALIZATION: "PERSONALIZATION",
  TEAM_EFFICIENCY: "TEAM_EFFICIENCY",
  INTERNATIONAL_EXPANSION: "INTERNATIONAL_EXPANSION",
  COST_REDUCTION: "COST_REDUCTION",
  SCALABILITY: "SCALABILITY",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type Opportunity = (typeof Opportunity)[keyof typeof Opportunity];

export const LeadScore = {
  HOT: "HOT",
  WARM: "WARM",
  COLD: "COLD",
  OTHER: "OTHER",
  UNKNOWN: "UNKNOWN",
} as const;
export type LeadScore = (typeof LeadScore)[keyof typeof LeadScore];

export const LEAD_STATUSES = Object.values(LeadStatus);
export const INDUSTRIES = Object.values(Industry);
export const COMPANY_SIZES = Object.values(CompanySize);
export const PAIN_POINTS = Object.values(PainPoint);
export const DISCOVERY_SOURCES = Object.values(DiscoverySource);
export const INTEGRATIONS = Object.values(Integration);
export const OPPORTUNITIES = Object.values(Opportunity);
export const LEAD_SCORES = Object.values(LeadScore);

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
