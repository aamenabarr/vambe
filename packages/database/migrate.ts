import { migrate } from 'drizzle-orm/neon-serverless/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

const main = async () => {
  const client = new Client({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    connectionString: process.env.DRIZZLE_DATABASE_URL as string,
  })

  const drizzleClient = drizzle(client)
  await migrate(drizzleClient, { migrationsFolder: './migrations' })
}

void main()
