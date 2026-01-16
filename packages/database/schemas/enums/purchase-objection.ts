import { pgEnum } from 'drizzle-orm/pg-core'

export const purchaseObjectionEnum = pgEnum('purchase_objection', [
  'UNDEFINED',
  'TECHNOLOGY_CONCERNS',
  'DATA_CONFIDENTIALITY',
  'LOSS_OF_PERSONAL_TOUCH',
  'INTEGRATION_COMPLEXITY',
  'BUDGET_CONSTRAINTS',
  'UNCERTAINTY_ABOUT_RESULTS',
  'COMPATIBILITY_ISSUES',
  'IMPLEMENTATION_EFFORT',
  'OTHER',
])
