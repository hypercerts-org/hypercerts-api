import { Kysely, SelectQueryBuilder } from "kysely";
import { BaseArgs } from "../../graphql/schemas/args/baseArgs.js";
import { CachingDatabase } from "../../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../types/kyselySupabaseData.js";

// Combined database type
export type SupportedDatabases = CachingDatabase | DataDatabase;

// TODO fix this
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Interface defining the contract for building database queries
 * @template DB - The database type (CachingDatabase or DataDatabase)
 * @template T - The table key within the database
 */
export interface QueryStrategy<
  DB extends SupportedDatabases,
  T extends keyof DB,
> {
  /**
   * Builds a query to fetch data from the database
   * @param db - The Kysely database instance
   * @param args - Query arguments extending BaseArgs
   * @returns A SelectQueryBuilder for the specified table
   */
  buildDataQuery(
    db: Kysely<DB>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): SelectQueryBuilder<DB, T, any>;

  /**
   * Builds a query to count records in the database
   * @param db - The Kysely database instance
   * @param args - Query arguments extending BaseArgs
   * @returns A SelectQueryBuilder that returns a count
   */
  buildCountQuery(
    db: Kysely<DB>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
  ): SelectQueryBuilder<DB, T, { count: string | number | bigint }>;
}

/**
 * Strategy for querying allowlist records
 * Implements queries for the claimable_fractions_with_proofs view table
 */
export class AllowlistQueryStrategy
  implements QueryStrategy<CachingDatabase, "claimable_fractions_with_proofs">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("claimable_fractions_with_proofs").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("claimable_fractions_with_proofs")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying attestations
 * Handles joins with claims, metadata, and supported schemas tables
 */
export class AttestationsQueryStrategy
  implements QueryStrategy<CachingDatabase, "attestations">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("attestations")
      .selectAll("attestations")
      .$if(!!args.where?.hypercerts, (qb) =>
        qb.innerJoin("claims", "claims.id", "attestations.claims_id"),
      )
      .$if(!!args.where?.metadata, (qb) =>
        qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
      )
      .$if(!!args.where?.eas_schema, (qb) =>
        qb.innerJoin(
          "supported_schemas",
          "supported_schemas.id",
          "attestations.supported_schemas_id",
        ),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("attestations")
      .$if(!!args.where?.hypercerts, (qb) =>
        qb.innerJoin("claims", "claims.id", "attestations.claims_id"),
      )
      .$if(!!args.where?.metadata, (qb) =>
        qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
      )
      .$if(!!args.where?.eas_schema, (qb) =>
        qb.innerJoin(
          "supported_schemas",
          "supported_schemas.id",
          "attestations.supported_schemas_id",
        ),
      )
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying supported schemas
 * Handles joins with attestations and eas_schema tables
 */
export class SchemasQueryStrategy
  implements QueryStrategy<CachingDatabase, "supported_schemas">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("supported_schemas").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("supported_schemas")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying claims
 * Handles joins with metadata, attestations, fractions, and contracts tables
 */
export class ClaimsQueryStrategy
  implements QueryStrategy<CachingDatabase, "claims">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("claims")
      .$if(!!args.where?.metadata, (qb) =>
        qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
      )
      .$if(!!args.where?.attestations, (qb) =>
        qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
      )
      .$if(!!args.where?.fractions, (qb) =>
        qb.innerJoin("fractions_view", "fractions_view.claims_id", "claims.id"),
      )
      .$if(!!args.where?.contract, (qb) =>
        qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
      )
      .selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("claims")
      .$if(!!args.where?.metadata, (qb) =>
        qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
      )
      .$if(!!args.where?.attestations, (qb) =>
        qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
      )
      .$if(!!args.where?.fractions, (qb) =>
        qb.innerJoin("fractions_view", "fractions_view.claims_id", "claims.id"),
      )
      .$if(!!args.where?.contract, (qb) =>
        qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
      )
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying contracts
 * Handles joins with claims table
 */
export class ContractsQueryStrategy
  implements QueryStrategy<CachingDatabase, "contracts">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("contracts").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("contracts")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

export class FractionsQueryStrategy
  implements QueryStrategy<CachingDatabase, "fractions_view">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("fractions_view").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("fractions_view")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying metadata
 * Handles joins with claims table and selects all columns except for the image column
 */
export class MetadataQueryStrategy
  implements QueryStrategy<CachingDatabase, "metadata">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    // This explicityly selects all columns from the metadata table except for the image column
    return db
      .selectFrom("metadata")
      .select([
        "metadata.id",
        "metadata.name",
        "metadata.description",
        "metadata.external_url",
        "metadata.work_scope",
        "metadata.work_timeframe_from",
        "metadata.work_timeframe_to",
        "metadata.impact_scope",
        "metadata.impact_timeframe_from",
        "metadata.impact_timeframe_to",
        "metadata.contributors",
        "metadata.rights",
        "metadata.uri",
        "metadata.properties",
        "metadata.allow_list_uri",
        "metadata.parsed",
      ])
      .$if(!!args.where?.hypercerts, (qb) =>
        qb.innerJoin("claims", "claims.uri", "metadata.uri"),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("metadata")
      .$if(!!args.where?.hypercerts, (qb) =>
        qb.innerJoin("claims", "claims.uri", "metadata.uri"),
      )
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying sales
 * Handles joins with sales table
 */
export class SalesQueryStrategy
  implements QueryStrategy<CachingDatabase, "sales">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("sales").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("sales").select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying marketplace orders
 * Handles joins with marketplace_orders table
 */
export class MarketplaceOrdersStrategy
  implements QueryStrategy<DataDatabase, "marketplace_orders">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("marketplace_orders").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("marketplace_orders")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying users
 * Handles joins with users table
 */
export class UsersQueryStrategy
  implements QueryStrategy<DataDatabase, "users">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("users").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("users").select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying blueprints with admins
 * Handles joins with blueprints_with_admins table
 */
export class BlueprintsWithAdminsQueryStrategy
  implements QueryStrategy<DataDatabase, "blueprints_with_admins">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("blueprints_with_admins").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("blueprints_with_admins")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying signature requests
 * Handles joins with signature_requests table
 */
export class SignatureRequestsQueryStrategy
  implements QueryStrategy<DataDatabase, "signature_requests">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("signature_requests").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("signature_requests")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}

/**
 * Strategy for querying hyperboards
 * Handles joins with hyperboards table
 */
export class HyperboardsQueryStrategy
  implements QueryStrategy<DataDatabase, "hyperboards">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db.selectFrom("hyperboards").selectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildCountQuery(db: Kysely<DataDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("hyperboards")
      .select((eb) => eb.fn.countAll().as("count"));
  }
}
