import { faker } from "@faker-js/faker";
import { Kysely } from "kysely";
import { newDb } from "pg-mem";
import { getAddress } from "viem";
import { CachingDatabase } from "../../src/types/kyselySupabaseCaching.js";

export type TestDatabase = CachingDatabase;

/**
 * Creates a test database instance with the given schema
 * @param setupSchema - Optional function to setup additional schema beyond the base tables
 * @returns Object containing database instance and memory db instance
 */
export async function createTestDatabase(
  setupSchema?: (db: Kysely<TestDatabase>) => Promise<void>,
) {
  const mem = newDb();
  const db = mem.adapters.createKysely() as Kysely<TestDatabase>;

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
