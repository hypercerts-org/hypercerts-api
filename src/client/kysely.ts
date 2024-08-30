import { Kysely, PostgresDialect } from "kysely";
import pkg from 'pg';
const { Pool } = pkg;
import type { CachingDatabase } from "../types/kyselySupabase.js";
import { cachingDatabaseUrl } from "../utils/constants.js";

export const kysely = new Kysely<CachingDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: cachingDatabaseUrl
    })
  })
});
