import { pgTable, text } from 'drizzle-orm/pg-core'

export const dummy = pgTable('dummy', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()).notNull(),
})
