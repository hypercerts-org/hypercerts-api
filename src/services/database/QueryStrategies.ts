import { Kysely, SelectQueryBuilder } from "kysely";
import { BaseArgs } from "../../graphql/schemas/args/baseArgs.js";
import { CachingDatabase } from "../../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../types/kyselySupabaseData.js";

// Combined database type
export type SupportedDatabases = CachingDatabase | DataDatabase;

// TODO fix this
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
/**
 * Strategy interface for building queries
 */
export interface QueryStrategy<
  DB extends SupportedDatabases,
  T extends keyof DB,
> {
  buildDataQuery(
    db: Kysely<DB>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): SelectQueryBuilder<DB, T, any>;
  buildCountQuery(
    db: Kysely<DB>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
  ): SelectQueryBuilder<DB, T, { count: string | number | bigint }>;
}

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

export class MetadataQueryStrategy
  implements QueryStrategy<CachingDatabase, "metadata">
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDataQuery(db: Kysely<CachingDatabase>, args: BaseArgs<any>) {
    return db
      .selectFrom("metadata")
      .selectAll("metadata")
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
