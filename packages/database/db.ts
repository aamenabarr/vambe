import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schemas'

const client = new Pool({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  connectionString: process.env.DRIZZLE_DATABASE_URL as string,
})

const drizzleClient = drizzle(client, { schema, logger: true })

export default drizzleClient
