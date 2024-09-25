import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
const { Pool } = pkg;
import type { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { cachingDatabaseUrl, dataDatabaseUrl } from "../utils/constants.js";
import { DataDatabase } from "../types/kyselySupabaseData.js";

export const kyselyCaching = new Kysely<CachingDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: cachingDatabaseUrl,
    }),
  }),
});

export const kyselyData = new Kysely<DataDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: dataDatabaseUrl,
    }),
  }),
});
