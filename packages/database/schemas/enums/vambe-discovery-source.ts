import { pgEnum } from 'drizzle-orm/pg-core'

export const vambeDiscoverySourceEnum = pgEnum('vambe_discovery_source', [
  'UNDEFINED',
  'CONFERENCE',
  'GOOGLE_SEARCH',
  'COLLEAGUE_RECOMMENDATION',
  'LINKEDIN',
  'PODCAST',
  'ONLINE_ARTICLE',
  'FORUM_GROUP',
  'NETWORKING_EVENT',
  'OTHER',
])
