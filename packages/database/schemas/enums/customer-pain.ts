import { pgEnum } from 'drizzle-orm/pg-core'

export const customerPainEnum = pgEnum('customer_pain', [
  'UNDEFINED',
  'HIGH_VOLUME_INTERACTIONS',
  'MANUAL_PROCESS_INEFFICIENCY',
  'RESPONSE_TIME_DELAYS',
  'SCALABILITY_ISSUES',
  'TEAM_OVERLOAD',
  'LACK_OF_AUTOMATION',
  'CUSTOMER_EXPERIENCE_DEGRADATION',
  'PEAK_SEASON_OVERLOAD',
  'OTHER',
])
