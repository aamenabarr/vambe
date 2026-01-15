import { pgEnum } from 'drizzle-orm/pg-core'

export const industryEnum = pgEnum('industry', [
  'UNDEFINED',
  'RETAIL_ECOMMERCE',
  'HEALTHCARE',
  'TECHNOLOGY',
  'PROFESSIONAL_SERVICES',
  'FINANCE',
  'EDUCATION',
  'HOSPITALITY',
  'LOGISTICS_TRANSPORT',
  'MANUFACTURING_PRODUCTION',
  'WELLNESS_LIFESTYLE',
  'AGRICULTURE',
  'ENERGY',
  'NGO_SOCIAL',
  'OTHER'
])
