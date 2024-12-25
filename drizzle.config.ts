import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/database/",
  dialect: "sqlite",
  out: "./drizzle",
  driver: "expo",
} satisfies Config;