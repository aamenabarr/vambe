import { pgEnum } from 'drizzle-orm/pg-core'

export const technologicalMaturityEnum = pgEnum('technological_maturity', [
  'UNDEFINED',
  'ANALOG',
  'DIGITALIZED',
  'TECH_SAVVY',
])
