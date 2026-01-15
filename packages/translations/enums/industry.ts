import { Industry } from 'domain-clean/enums'

export const industryTranslation: Record<Industry, string> = {
  [Industry.UNDEFINED]: 'Indefinido',
  [Industry.RETAIL_ECOMMERCE]: 'Retail/E-commerce',
  [Industry.HEALTHCARE]: 'Salud',
  [Industry.TECHNOLOGY]: 'Tecnología',
  [Industry.PROFESSIONAL_SERVICES]: 'Servicios profesionales',
  [Industry.FINANCE]: 'Finanzas',
  [Industry.EDUCATION]: 'Educación',
  [Industry.HOSPITALITY]: 'Hotelería y turismo',
  [Industry.LOGISTICS_TRANSPORT]: 'Logística y transporte',
  [Industry.MANUFACTURING_PRODUCTION]: 'Manufactura y producción',
  [Industry.WELLNESS_LIFESTYLE]: 'Bienestar y estilo de vida',
  [Industry.AGRICULTURE]: 'Agricultura',
  [Industry.ENERGY]: 'Energía',
  [Industry.NGO_SOCIAL]: 'ONG/Social',
  [Industry.OTHER]: 'Otro',
}
