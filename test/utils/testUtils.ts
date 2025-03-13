import { faker } from "@faker-js/faker";
import { Kysely, sql } from "kysely";
import { DataType, newDb } from "pg-mem";
import { getAddress } from "viem";
import { CachingDatabase } from "../../src/types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../src/types/kyselySupabaseData.js";

export type TestDatabase = CachingDatabase | DataDatabase;

export async function createTestDataDatabase(
  setupSchema?: (db: Kysely<DataDatabase>) => Promise<void>,
) {
  const mem = newDb();

  // Create database instance
  const db = mem.adapters.createKysely() as Kysely<DataDatabase>;

  // NOTE: pg-mem does not support the generateUUID() function, so we need to register our own and for some reason it needs to be lowercase
  mem.public.registerFunction({
    name: "generateuuid",
    returns: DataType.uuid,
    implementation: () => faker.string.uuid(),
  });

  // NOTE: pg-mem does not support the array_append function, so we need to register our own
  mem.public.registerFunction({
    name: "array_append",
    args: [
      mem.public.getType(DataType.text).asArray(),
      mem.public.getType(DataType.text),
    ],
    returns: mem.public.getType(DataType.text).asArray(),
    implementation: (arr: string[], element: string) => [...arr, element],
  });

  // Create blueprints table
  await db.schema
    .createTable("blueprints")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("form_values", "jsonb", (col) => col.notNull())
    .addColumn("minter_address", "text", (col) => col.notNull())
    .addColumn("minted", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("hypercert_ids", sql`text[]`, (col) => col.notNull())
    .execute();

  // Create users table
  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`generateuuid()`),
    )
    .addColumn("address", "text", (col) => col.notNull())
    .addColumn("display_name", "text")
    .addColumn("avatar", "text")
    .addColumn("chain_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("users_address_chain_id", ["address", "chain_id"])
    .execute();

  // Create blueprint_admins table
  await db.schema
    .createTable("blueprint_admins")
    .addColumn("blueprint_id", "integer", (col) => col.notNull())
    .addColumn("user_id", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("blueprint_admins_pkey", ["blueprint_id", "user_id"])
    .execute();

  // Create hypercerts table
  await db.schema
    .createTable("hypercerts")
    .addColumn("hypercert_id", "text", (col) => col.notNull())
    .addColumn("collection_id", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("hypercerts_pkey", ["hypercert_id", "collection_id"])
    .execute();

  // Create hyperboard_blueprint_metadata table
  await db.schema
    .createTable("hyperboard_blueprint_metadata")
    .addColumn("blueprint_id", "integer", (col) => col.notNull())
    .addColumn("hyperboard_id", "text", (col) => col.notNull())
    .addColumn("collection_id", "text", (col) => col.notNull())
    .addColumn("display_size", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  // Create hyperboard_hypercert_metadata table
  await db.schema
    .createTable("hyperboard_hypercert_metadata")
    .addColumn("hyperboard_id", "text", (col) => col.notNull())
    .addColumn("hypercert_id", "text", (col) => col.notNull())
    .addColumn("collection_id", "text", (col) => col.notNull())
    .addColumn("display_size", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("hyperboard_hypercert_metadata_pkey", [
      "hyperboard_id",
      "hypercert_id",
      "collection_id",
    ])
    .execute();

  // Create collections table
  await db.schema
    .createTable("collections")
    .addColumn("id", "varchar", (b) =>
      b.primaryKey().defaultTo(sql`generateuuid()`),
    )
    .addColumn("name", "varchar")
    .addColumn("description", "varchar")
    .addColumn("chain_ids", sql`integer[]`, (col) => col.notNull())
    .addColumn("hidden", "boolean")
    .addColumn("created_at", "timestamp")
    .execute();

  // Create collection_admins table
  await db.schema
    .createTable("collection_admins")
    .addColumn("collection_id", "varchar")
    .addColumn("user_id", "varchar")
    .execute();

  // Create collection_blueprints table
  await db.schema
    .createTable("collection_blueprints")
    .addColumn("blueprint_id", "integer", (col) => col.notNull())
    .addColumn("collection_id", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  // Allow caller to setup additional schema
  if (setupSchema) {
    await setupSchema(db);
  }

  return { db, mem };
}

/**
 * Creates a test database instance with the given schema
 * @param setupSchema - Optional function to setup additional schema beyond the base tables
 * @returns Object containing database instance and memory db instance
 */
export async function createTestCachingDatabase(
  setupSchema?: (db: Kysely<CachingDatabase>) => Promise<void>,
) {
  const mem = newDb();
  const db = mem.adapters.createKysely() as Kysely<CachingDatabase>;

  // Create base tables that are commonly needed
  await db.schema
    .createTable("contracts")
    .addColumn("id", "varchar", (b) => b.primaryKey())
    .addColumn("chain_id", "integer")
    .addColumn("contract_address", "varchar")
    .addColumn("start_block", "integer")
    .execute();

  await db.schema
    .createTable("claims")
    .addColumn("id", "integer", (b) => b.primaryKey())
    .addColumn("contracts_id", "varchar")
    .execute();

  await db.schema
    .createTable("fractions_view")
    .addColumn("id", "varchar", (b) => b.primaryKey())
    .addColumn("claims_id", "varchar")
    .addColumn("hypercert_id", "varchar")
    .addColumn("fraction_id", "varchar")
    .addColumn("owner_address", "varchar")
    .addColumn("units", "integer")
    .execute();

  // Allow caller to setup additional schema
  if (setupSchema) {
    await setupSchema(db);
  }

  return { db, mem };
}

export function generateChainId(): bigint {
  return faker.number.bigInt({ min: 1, max: 100000 });
}

/**
 * Generates a mock Ethereum address using faker and viem's getAddress
 * @returns A checksummed Ethereum address
 */
export function generateMockAddress(): string {
  return getAddress(faker.finance.ethereumAddress());
}

// TODO can be more specific meeting constraint of claims/fraction token ids
export function generateTokenId(): bigint {
  return faker.number.bigInt();
}

// chain_id-contract_address-fraction_id
export function generateFractionId(): string {
  return `${generateChainId()}-${generateMockAddress()}-${generateTokenId().toString()}`;
}

// TODO filter on allowed values for claim_id and fraction_id
// chain_id-contract_address-claim_id
export function generateHypercertId(): string {
  return `${generateChainId()}-${generateMockAddress()}-${generateTokenId().toString()}`;
}

/**
 * Generates a mock contract record
 * @returns A mock contract record
 */
export function generateMockContract() {
  return {
    id: faker.string.uuid(),
    chain_id: faker.number.int({ min: 1, max: 100000 }),
    contract_address: generateMockAddress(),
    start_block: faker.number.int({ min: 1, max: 1000000 }),
  };
}

/**
 * Generates a mock fraction record
 * @returns A mock fraction record
 */
export function generateMockFraction() {
  return {
    id: faker.string.uuid(),
    claims_id: faker.string.uuid(),
    hypercert_id: generateHypercertId(),
    fraction_id: generateFractionId(),
    owner_address: generateMockAddress(),
    units: faker.number.bigInt({ min: 100000n, max: 100000000000n }),
  };
}

/**
 * Generates a mock metadata record with all required fields
 * @returns A mock metadata record with realistic test data
 */
export function generateMockMetadata() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    uri: `ipfs://${faker.string.alphanumeric(46)}`,
    external_url: faker.internet.url(),
    work_scope: faker.lorem.sentence(),
    work_timeframe_from: faker.date.past().toISOString(),
    work_timeframe_to: faker.date.future().toISOString(),
    impact_scope: faker.lorem.sentence(),
    impact_timeframe_from: faker.date.past().toISOString(),
    impact_timeframe_to: faker.date.future().toISOString(),
    contributors: [faker.internet.userName(), faker.internet.userName()],
    rights: faker.lorem.sentence(),
    properties: {},
    allow_list_uri: null,
    parsed: true,
  };
}

/**
 * Generates a minimal mock metadata record with only required fields
 * Useful for testing specific fields or error cases
 * @returns A minimal mock metadata record
 */
export function generateMinimalMockMetadata() {
  return {
    id: faker.string.uuid(),
    uri: `ipfs://${faker.string.alphanumeric(46)}`,
  };
}

/**
 * Generates a mock blueprint record
 * @returns A mock blueprint record with realistic test data
 */
export function generateMockBlueprint() {
  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    created_at: faker.date.past().toISOString(),
    form_values: {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      contributors: [faker.person.fullName(), faker.internet.username()],
      work_scope: faker.lorem.sentence(),
      impact_scope: faker.lorem.sentence(),
      rights: faker.lorem.sentence(),
    },
    minter_address: generateMockAddress(),
    minted: faker.datatype.boolean(),
    hypercert_ids: [generateHypercertId(), generateHypercertId()],
  };
}

/**
 * Generates a mock user record
 * @returns A mock user record with realistic test data
 */
export function generateMockUser(
  overrides?: Partial<{
    id: string;
    address: string;
    chain_id: number;
    display_name: string;
    avatar: string;
  }>,
) {
  const defaultUser = {
    id: faker.string.uuid(),
    address: generateMockAddress(),
    chain_id: faker.number.int({ min: 1, max: 100000 }),
    display_name: faker.internet.username(),
    avatar: faker.image.avatar(),
    created_at: faker.date.past().toISOString(),
  };

  return {
    ...defaultUser,
    ...overrides,
  };
}

/**
 * Generates a mock signature request
 * @param overrides Optional overrides for the generated data
 * @returns A mock signature request with realistic test data
 */
export function generateMockSignatureRequest(
  overrides?: Partial<{
    chain_id: number;
    message: string;
    message_hash: string;
    purpose: "update_user_data";
    safe_address: string;
    status: "pending" | "executed" | "canceled";
    timestamp: number;
  }>,
) {
  const defaultMessage = {
    metadata: {
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
    },
  };

  return {
    chain_id: faker.number.int({ min: 1, max: 100000 }),
    message: JSON.stringify(
      overrides?.message ? JSON.parse(overrides.message) : defaultMessage,
    ),
    message_hash: faker.string.hexadecimal({ length: 64 }),
    purpose: "update_user_data" as const,
    safe_address: faker.finance.ethereumAddress(),
    status: "pending" as const,
    timestamp: Math.floor(Date.now() / 1000),
    ...overrides,
  };
}

export function generateMockHypercert() {
  return {
    chain_id: faker.number.int({ min: 1, max: 100000 }),
    hypercert_id: generateHypercertId(),
    units: faker.number.bigInt({ min: 100000n, max: 100000000000n }),
    owner_address: generateMockAddress(),
    created_at: faker.date.past().toISOString(),
    contracts_id: generateMockContract().id,
    token_id: generateTokenId(),
    uri: `ipfs://${faker.string.alphanumeric(46)}`,
    creation_block_number: faker.number.int({ min: 1, max: 1000000 }),
    creation_block_timestamp: faker.date.past().toISOString(),
    last_update_block_number: faker.number.int({ min: 1, max: 1000000 }),
    last_update_block_timestamp: faker.date.past().toISOString(),
    attestations_count: faker.number.int({ min: 0, max: 100 }),
    sales_count: faker.number.int({ min: 0, max: 100 }),
  };
}

export function generateMockCollection() {
  return {
    id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    chain_ids: [generateChainId()],
    hidden: faker.datatype.boolean(),
    admins: [generateMockUser()],
    hypercerts: [{ data: [generateMockHypercert()], count: 1 }],
    blueprints: [generateMockBlueprint()],
  };
}
