import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './schemas',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    url: `${process.env.DRIZZLE_DATABASE_URL}`,
  },
})
