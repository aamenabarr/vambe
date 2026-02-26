export const INDUSTRY_LABELS: Record<string, string> = {
  FINANCE: "Finanzas",
  RETAIL: "Comercio minorista",
  HEALTHCARE: "Salud",
  TECH: "Tecnología",
  EDUCATION: "Educación",
  LOGISTICS: "Logística",
  TRAVEL: "Turismo",
  FASHION: "Moda",
  CONSULTING: "Consultoría",
  FOOD_BEVERAGE: "Alimentos y bebidas",
  REAL_ESTATE: "Bienes raíces",
  NON_PROFIT: "Sin fines de lucro",
  MANUFACTURING: "Manufactura",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const COMPANY_SIZE_LABELS: Record<string, string> = {
  SMALL: "Pequeña",
  MEDIUM: "Mediana",
  LARGE: "Grande",
  ENTERPRISE: "Corporativa",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const PAIN_POINT_LABELS: Record<string, string> = {
  HIGH_WORKLOAD: "Alta carga de trabajo",
  REPETITIVE_QUERIES: "Consultas repetitivas",
  SCALABILITY_ISSUES: "Problemas de escalabilidad",
  MANUAL_INEFFICIENCY: "Ineficiencia manual",
  SLOW_RESPONSE_TIME: "Tiempo de respuesta lento",
  DATA_PRIVACY: "Privacidad de datos",
  INTEGRATION_DIFFICULTY: "Dificultad de integración",
  MULTILINGUAL_SUPPORT: "Soporte multilingüe",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const DISCOVERY_SOURCE_LABELS: Record<string, string> = {
  CONFERENCE: "Conferencia",
  SEARCH_ENGINE: "Motor de búsqueda",
  NETWORKING: "Networking",
  REFERRAL: "Referencia",
  SOCIAL_MEDIA: "Redes sociales",
  WEBINAR: "Webinar",
  ARTICLE: "Artículo",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const INTEGRATION_LABELS: Record<string, string> = {
  CRM: "CRM",
  ECOMMERCE_PLATFORM: "Plataforma e-commerce",
  SCHEDULING_SYSTEM: "Sistema de agendamiento",
  ERP: "ERP",
  API: "API",
  CHAT_PLATFORM: "Plataforma de chat",
  TICKETING_SYSTEM: "Sistema de tickets",
  PROPERTY_DATABASE: "Base de datos inmobiliaria",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const OPPORTUNITY_LABELS: Record<string, string> = {
  AUTOMATION: "Automatización",
  CX_IMPROVEMENT: "Mejora de experiencia",
  PERSONALIZATION: "Personalización",
  TEAM_EFFICIENCY: "Eficiencia del equipo",
  INTERNATIONAL_EXPANSION: "Expansión internacional",
  COST_REDUCTION: "Reducción de costos",
  SCALABILITY: "Escalabilidad",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const LEAD_SCORE_LABELS: Record<string, string> = {
  HOT: "Caliente",
  WARM: "Tibio",
  COLD: "Frío",
  OTHER: "Otro",
  UNKNOWN: "Desconocido",
};

export const LEAD_STATUS_LABELS: Record<string, string> = {
  PROCESSED: "Procesado",
  UNPROCESSED: "Sin procesar",
};

export function t(dictionaries: Record<string, string>, key: string): string {
  return dictionaries[key] || key;
}

const ALL_LABELS: Record<string, string> = {
  ...INDUSTRY_LABELS,
  ...COMPANY_SIZE_LABELS,
  ...PAIN_POINT_LABELS,
  ...DISCOVERY_SOURCE_LABELS,
  ...INTEGRATION_LABELS,
  ...OPPORTUNITY_LABELS,
  ...LEAD_SCORE_LABELS,
  ...LEAD_STATUS_LABELS,
};

export function tLabel(value: string): string {
  return ALL_LABELS[value] || value;
}
