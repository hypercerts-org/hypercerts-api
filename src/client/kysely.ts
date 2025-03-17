import { Kysely, PostgresDialect } from "kysely";
import { singleton } from "tsyringe";
import pkg from "pg";
const { Pool } = pkg;
import type { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import type { DataDatabase } from "../types/kyselySupabaseData.js";
import { cachingDatabaseUrl, dataDatabaseUrl } from "../utils/constants.js";
import { container } from "tsyringe";
import { format } from "date-fns";

pkg.types.setTypeParser(pkg.types.builtins.TIMESTAMPTZ, (val) => {
  return format(new Date(val), "t");
});

pkg.types.setTypeParser(pkg.types.builtins.TIMESTAMP, (val) => {
  return format(new Date(val), "t");
});

export abstract class BaseKyselyService<
  DB extends CachingDatabase | DataDatabase,
> {
  constructor(protected readonly db: Kysely<DB>) {}

  getConnection() {
    return this.db;
  }
}

@singleton()
export class CachingKyselyService extends BaseKyselyService<CachingDatabase> {
  constructor() {
    super(
      new Kysely<CachingDatabase>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: cachingDatabaseUrl,
          }),
        }),
      }),
    );
  }
}

@singleton()
export class DataKyselyService extends BaseKyselyService<DataDatabase> {
  constructor() {
    super(
      new Kysely<DataDatabase>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: dataDatabaseUrl,
          }),
        }),
      }),
    );
  }
}

// For backwards compatibility during refactor
export const kyselyCaching = container
  .resolve(CachingKyselyService)
  .getConnection();

export const kyselyData = container.resolve(DataKyselyService).getConnection();
