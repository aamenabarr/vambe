import { pgEnum } from 'drizzle-orm/pg-core'

export const buyerSentimentEnum = pgEnum('buyer_sentiment', [
  'UNDEFINED',
  'CONFIDENT',
  'NEUTRAL',
  'SKEPTICAL',
])
