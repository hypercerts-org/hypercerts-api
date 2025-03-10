import { Kysely, Selectable, SelectQueryBuilder } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import {
  applyWhere,
  createStandardQueryModifier,
  QueryModifier,
} from "../../../lib/db/queryModifiers/queryModifiers.js";
import { BaseQueryArgsType } from "../../../lib/graphql/BaseQueryArgs.js";
import {
  QueryStrategy,
  SupportedDatabases,
} from "../strategies/QueryStrategy.js";
import { QueryStrategyFactory } from "../strategies/QueryStrategyFactory.js";

/**
 * Interface defining the core functionality of an entity service
 * @template TEntity - The entity type this service manages
 * @template TArgs - The arguments type for queries
 */
export interface EntityService<TEntity, TArgs> {
  /**
   * Retrieves a single entity based on the provided arguments
   * @param args - Query arguments
   * @returns Promise resolving to the entity or undefined if not found
   */
  getSingle(args: TArgs): Promise<Selectable<TEntity> | undefined>;

  /**
   * Retrieves multiple entities based on the provided arguments
   * @param args - Query arguments
   * @returns Promise resolving to an object containing the data and total count of all matching entities
   */
  getMany(args: TArgs): Promise<{ data: Selectable<TEntity>[]; count: number }>;
}

/**
 * Creates an entity service for a specific database table
 * @template DB - The database schema type
 * @template T - The table name type
 * @template Args - The arguments type for queries
 * @param tableName - Name of the table this service will manage
 * @param ServiceName - Name to be assigned to the generated service class
 * @param dbConnection - Database connection instance
 * @returns An instance of EntityService for the specified table
 * @throws {Error} If the strategy for the table cannot be found
 */
export function createEntityService<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args extends BaseQueryArgsType<
    Record<string, unknown>,
    { [K in keyof DB[T]]?: SortOrder | null }
  >,
>(
  tableName: T,
  ServiceName: string,
  dbConnection: Kysely<DB>,
): EntityService<DB[T], Args> {
  /**
   * Internal service class generated for the specific entity
   */
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

    /**
     * @inheritdoc
     */
    async getSingle(args: Args): Promise<Selectable<DB[T]> | undefined> {
      const query = this.applyQueryModifiers(
        this.strategy.buildDataQuery(this.db, args),
        args,
      );

      return await query.executeTakeFirst();
    }

    /**
     * @inheritdoc
     */
    async getMany(
      args: Args,
    ): Promise<{ data: Selectable<DB[T]>[]; count: number }> {
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
