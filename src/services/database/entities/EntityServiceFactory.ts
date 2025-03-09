import { Kysely, Selectable, SelectQueryBuilder } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import {
  applyWhere,
  createStandardQueryModifier,
  QueryModifier,
} from "../../../lib/db/queryModifiers/queryModifiers.js";
import { QueryStrategyFactory } from "../strategies/QueryStrategyFactory.js";
import {
  QueryStrategy,
  SupportedDatabases,
} from "../strategies/QueryStrategy.js";

export interface EntityService<TEntity, TArgs> {
  getSingle(args: TArgs): Promise<Selectable<TEntity> | undefined>;
  getMany(args: TArgs): Promise<{ data: Selectable<TEntity>[]; count: number }>;
}

export function createEntityService<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args extends {
    first?: number;
    offset?: number;
    where?: Record<string, unknown>;
    sortBy?: { [K in keyof DB[T]]?: SortOrder | null };
  },
>(
  tableName: T,
  ServiceName: string,
  dbConnection: Kysely<DB>,
): EntityService<DB[T], Args> {
  class GeneratedEntityService implements EntityService<DB[T], Args> {
    private readonly strategy: QueryStrategy<DB, T, Args>;
    private readonly db: Kysely<DB>;
    private readonly tableName: T;
    private readonly applyQueryModifiers: QueryModifier<DB, T, Args>;

    constructor(dbConnection: Kysely<DB>, tableName: T) {
      this.db = dbConnection;
      this.strategy = QueryStrategyFactory.getStrategy(tableName);
      this.tableName = tableName;
      this.applyQueryModifiers = createStandardQueryModifier<DB, T, Args>(
        tableName,
      );
    }

    async getSingle(args: Args) {
      const query = this.applyQueryModifiers(
        this.strategy.buildDataQuery(this.db, args),
        args,
      );

      return await query.executeTakeFirst();
    }

    async getMany(args: Args) {
      const dataQuery = this.applyQueryModifiers(
        this.strategy.buildDataQuery(this.db, args),
        args,
      );

      // For count query, we only need to apply where conditions
      let countQuery = this.strategy.buildCountQuery(this.db, args);
      if (args.where) {
        countQuery = applyWhere(
          this.tableName,
          countQuery as unknown as SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
          args,
        ) as unknown as typeof countQuery;
      }

      const result = await this.db
        .transaction()
        .execute(async (transaction) => {
          const [dataRes, countRes] = await Promise.all([
            transaction.executeQuery(dataQuery),
            transaction.executeQuery(countQuery),
          ]);

          return {
            data: dataRes.rows as unknown as Selectable<DB[T]>[],
            count: Number(countRes.rows[0]?.count ?? dataRes.rows.length),
          };
        });

      return result;
    }
  }

  Object.defineProperty(GeneratedEntityService, "name", { value: ServiceName });
  return new GeneratedEntityService(dbConnection, tableName);
}
