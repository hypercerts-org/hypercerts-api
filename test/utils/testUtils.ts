import { faker } from "@faker-js/faker";
import { currenciesByNetwork } from "@hypercerts-org/marketplace-sdk";
import { Kysely, sql } from "kysely";
import { DataType, newDb } from "pg-mem";
import { getAddress } from "viem";
import { expect } from "vitest";
import { MarketplaceOrderSelect } from "../../src/services/database/entities/MarketplaceOrdersEntityService.js";
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

  mem.public.registerFunction({
    name: "exists",
    args: [mem.public.getType(DataType.uuid).asArray()],
    returns: mem.public.getType(DataType.bool),
    implementation: (arr: string[]) => arr.length > 0,
  });

  // Create marketplace_orders table
  // TODO typings in DB are inconsisten do this will need to be updated when the DB is updated
  await db.schema
    .createTable("marketplace_orders")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`generateuuid()`),
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("quoteType", "bigint", (col) => col.notNull())
    .addColumn("globalNonce", "text", (col) => col.notNull())
    .addColumn("orderNonce", "text", (col) => col.notNull())
    .addColumn("strategyId", "bigint", (col) => col.notNull())
    .addColumn("collectionType", "bigint", (col) => col.notNull())
    .addColumn("collection", "text", (col) => col.notNull())
    .addColumn("currency", "text", (col) => col.notNull())
    .addColumn("signer", "text", (col) => col.notNull())
    .addColumn("startTime", "bigint", (col) => col.notNull())
    .addColumn("endTime", "bigint", (col) => col.notNull())
    .addColumn("price", "text", (col) => col.notNull())
    .addColumn("signature", "text", (col) => col.notNull())
    .addColumn("additionalParameters", "text", (col) => col.notNull())
    .addColumn("chainId", "bigint", (col) => col.notNull())
    .addColumn("subsetNonce", "bigint", (col) => col.notNull())
    .addColumn("itemIds", sql`text[]`, (col) => col.notNull())
    .addColumn("amounts", sql`bigint[]`, (col) => col.notNull())
    .addColumn("invalidated", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn("validator_codes", sql`integer[]`)
    .addColumn("hypercert_id", "text", (col) => col.notNull().defaultTo(""))
    .execute();

  // Create marketplace_order_nonces table
  await db.schema
    .createTable("marketplace_order_nonces")
    .addColumn("address", "text", (col) => col.notNull())
    .addColumn("chain_id", "bigint", (col) => col.notNull())
    .addColumn("nonce_counter", "bigint", (col) => col.notNull())
    .addUniqueConstraint("marketplace_order_nonces_pkey", [
      "address",
      "chain_id",
    ])
    .execute();

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

  // Create collections table
  await db.schema
    .createTable("collections")
    .addColumn("id", "uuid", (b) =>
      b.primaryKey().defaultTo(sql`generateuuid()`),
    )
    .addColumn("name", "varchar")
    .addColumn("description", "varchar")
    .addColumn("chain_ids", sql`integer[]`, (col) => col.notNull())
    .addColumn("hidden", "boolean")
    .addColumn("created_at", "timestamp")
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

  // Create hypercerts table
  await db.schema
    .createTable("hypercerts")
    .addColumn("hypercert_id", "text", (col) => col.notNull())
    .addColumn("collection_id", "uuid", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("hypercerts_pkey", ["hypercert_id", "collection_id"])
    .execute();

  // Create collection_blueprints table
  await db.schema
    .createTable("collection_blueprints")
    .addColumn("blueprint_id", "integer", (col) =>
      col.notNull().references("blueprints.id").onDelete("cascade"),
    )
    .addColumn("collection_id", "uuid", (col) =>
      col.notNull().references("collections.id").onDelete("cascade"),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addUniqueConstraint("collection_blueprints_pkey", [
      "blueprint_id",
      "collection_id",
    ])
    .execute();

  // Create blueprint_admins table
  await db.schema
    .createTable("blueprint_admins")
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("blueprint_id", "integer", (col) =>
      col.notNull().references("blueprints.id").onDelete("cascade"),
    )
    .addUniqueConstraint("blueprint_admins_pkey", ["user_id", "blueprint_id"])
    .execute();

  // Create collection_admins table
  await db.schema
    .createTable("collection_admins")
    .addColumn("collection_id", "uuid", (col) =>
      col.notNull().references("collections.id").onDelete("cascade"),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addUniqueConstraint("collection_admins_pkey", ["collection_id", "user_id"])
    .execute();

  // Create blueprints_with_admins view
  await db.schema
    .createView("blueprints_with_admins")
    .as(
      db
        .selectFrom("blueprints")
        .innerJoin(
          "blueprint_admins",
          "blueprints.id",
          "blueprint_admins.blueprint_id",
        )
        .innerJoin("users", "blueprint_admins.user_id", "users.id")
        .select([
          "blueprints.id as id",
          "blueprints.form_values as form_values",
          "blueprints.created_at as created_at",
          "blueprints.minter_address as minter_address",
          "blueprints.minted as minted",
          "blueprints.hypercert_ids as hypercert_ids",
          "users.address as admin_address",
          "users.chain_id as admin_chain_id",
          "users.avatar",
          "users.display_name",
        ]),
    )
    .execute();

  // Create hyperboards table
  await db.schema
    .createTable("hyperboards")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`generateuuid()`),
    )
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("background_image", "text")
    .addColumn("grayscale_images", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn("tile_border_color", "text")
    .addColumn("chain_ids", sql`integer[]`, (col) => col.notNull())
    .execute();

  // Create hyperboard_blueprint_metadata table
  await db.schema
    .createTable("hyperboard_blueprint_metadata")
    .addColumn("blueprint_id", "integer", (col) => col.notNull())
    .addColumn("hyperboard_id", "text", (col) => col.notNull())
    .addColumn("collection_id", "uuid", (col) => col.notNull())
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

  // Create hyperboard_collections table
  await db.schema
    .createTable("hyperboard_collections")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("hyperboard_id", "uuid", (col) =>
      col.notNull().references("hyperboards.id").onDelete("cascade"),
    )
    .addColumn("collection_id", "uuid", (col) =>
      col.notNull().references("collections.id").onDelete("cascade"),
    )
    .addColumn("label", "text")
    .addColumn("render_method", "text")
    .addUniqueConstraint("hyperboard_collections_pkey", [
      "hyperboard_id",
      "collection_id",
    ])
    .execute();

  // Create hyperboard_admins table
  await db.schema
    .createTable("hyperboard_admins")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("hyperboard_id", "uuid", (col) =>
      col.notNull().references("hyperboards.id").onDelete("cascade"),
    )
    .addUniqueConstraint("hyperboard_admins_pkey", ["user_id", "hyperboard_id"])
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
  return 11155111n;
}

export function generateCurrency(): string {
  const currency = currenciesByNetwork[11155111]["WETH"];
  if (!currency) {
    throw new Error("Currency not found");
  }
  return currency.address;
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
    chain_id: generateChainId(),
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
    chain_id: generateChainId(),
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
  };
}

/**
 * Generates a mock marketplace order record
 * @returns A mock marketplace order record
 */
export function generateMockOrder(
  overrides?: Partial<{
    id: string;
    createdAt: string;
    quoteType: bigint;
    globalNonce: string;
    orderNonce: string;
    strategyId: bigint;
    collectionType: bigint;
    collection: string;
    currency: string;
    signer: string;
    startTime: bigint;
    endTime: bigint;
    price: string;
    signature: string;
    additionalParameters: string;
    chainId: bigint;
    subsetNonce: bigint;
    itemIds: string[];
    amounts: bigint[];
    invalidated: boolean;
    validator_codes: number[];
    hypercert_id: string;
  }>,
) {
  const defaultOrder = {
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    quoteType: faker.number.bigInt({ min: 1n, max: 100n }),
    globalNonce: faker.string.alphanumeric(10),
    orderNonce: faker.string.alphanumeric(10),
    strategyId: faker.number.bigInt({ min: 1n, max: 100n }),
    collectionType: faker.number.bigInt({ min: 1n, max: 100n }),
    collection: generateMockAddress(),
    currency: generateCurrency(),
    signer: generateMockAddress(),
    startTime: faker.number.bigInt({ min: 1n, max: 100000n }),
    endTime: faker.number.bigInt({ min: 100001n, max: 200000n }),
    price: faker.number.bigInt({ min: 1000000n, max: 1000000000n }).toString(),
    signature: faker.string.hexadecimal({ length: 130 }),
    additionalParameters: faker.string.alphanumeric(10),
    chainId: generateChainId(),
    subsetNonce: faker.number.bigInt({ min: 1n, max: 100n }),
    itemIds: [generateTokenId().toString(), generateTokenId().toString()],
    amounts: [
      faker.number.bigInt({ min: 1n, max: 1000n }),
      faker.number.bigInt({ min: 1n, max: 1000n }),
    ],
    invalidated: faker.datatype.boolean(),
    validator_codes: [faker.number.int({ min: 1, max: 100 })],
    hypercert_id: generateHypercertId(),
  };

  return {
    ...defaultOrder,
    ...overrides,
  } as unknown as MarketplaceOrderSelect;
}

export function generateMockHyperboard(
  overrides?: Partial<{
    id: string;
    name: string;
    chain_ids: (bigint | number | string)[];
    background_image: string;
    grayscale_images: boolean;
    tile_border_color: string;
    admins: { data: ReturnType<typeof generateMockUser>[]; count: number };
    sections: Array<{
      data: Array<{
        label: string;
        collection: ReturnType<typeof generateMockCollection>;
        entries: {
          id: string;
          is_blueprint: boolean;
          percentage_of_section: number;
          display_size: number;
          name?: string;
          total_units?: bigint | number | string;
          owners: {
            data: Array<
              ReturnType<typeof generateMockUser> & {
                percentage: number;
                units?: bigint | number | string;
              }
            >;
            count: number;
          };
        }[];
        owners: Array<{
          data: Array<
            ReturnType<typeof generateMockUser> & { percentage_owned: number }
          >;
          count: number;
        }>;
      }>;
      count: number;
    }>;
    owners: {
      data: Array<
        ReturnType<typeof generateMockUser> & { percentage_owned: number }
      >;
      count: number;
    };
  }>,
) {
  const mockUser = generateMockUser();
  const mockCollection = generateMockCollection();

  const defaultHyperboard = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    chain_ids: [generateChainId()],
    background_image: faker.image.url(),
    grayscale_images: faker.datatype.boolean(),
    tile_border_color: faker.color.rgb(),
    admins: {
      data: [mockUser],
      count: 1,
    },
    sections: [
      {
        data: [
          {
            label: faker.commerce.department(),
            collection: mockCollection,
            entries: [
              {
                id: faker.string.uuid(),
                is_blueprint: faker.datatype.boolean(),
                percentage_of_section: faker.number.float({
                  min: 0,
                  max: 100,
                  fractionDigits: 2,
                }),
                display_size: faker.number.float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                }),
                name: faker.commerce.productName(),
                total_units: faker.number.bigInt({ min: 1000n, max: 1000000n }),
                owners: {
                  data: [
                    {
                      ...mockUser,
                      percentage: faker.number.float({
                        min: 0,
                        max: 100,
                        fractionDigits: 2,
                      }),
                      units: faker.number.bigInt({ min: 1n, max: 1000n }),
                    },
                  ],
                  count: 1,
                },
              },
            ],
            owners: [
              {
                data: [
                  {
                    ...mockUser,
                    percentage_owned: faker.number.float({
                      min: 0,
                      max: 100,
                      fractionDigits: 2,
                    }),
                  },
                ],
                count: 1,
              },
            ],
          },
        ],
        count: 1,
      },
    ],
    owners: {
      data: [
        {
          ...mockUser,
          percentage_owned: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
        },
      ],
      count: 1,
    },
  };

  return {
    ...defaultHyperboard,
    ...overrides,
  };
}

// Check similarity of mock and returned object. The createdAt field is a timestamp and will be different. Its value in seconds should be the same.
// Bigints and numbers are compared as strings.
export const checkSimilarity = (obj1: unknown, obj2: unknown) => {
  // Extract all timestamp fields (both regular and timezone-aware)
  const timestampFields = ["createdAt", "created_at"];
  const timestamps1: Record<string, string> = {};
  const timestamps2: Record<string, string> = {};
  const rest1: Record<string, unknown> = {};
  const rest2: Record<string, unknown> = {};

  // Separate timestamp fields from other fields
  Object.entries(obj1 || {}).forEach(([key, value]) => {
    if (timestampFields.includes(key)) {
      timestamps1[key] = value as string;
    } else {
      rest1[key] = value;
    }
  });

  Object.entries(obj2 || {}).forEach(([key, value]) => {
    if (timestampFields.includes(key)) {
      timestamps2[key] = value as string;
    } else {
      rest2[key] = value;
    }
  });

  // Compare non-timestamp fields
  for (const key in rest1) {
    if (typeof rest1[key] === "bigint" || typeof rest1[key] === "number") {
      expect(rest1[key].toString()).toEqual(rest2[key]?.toString());
    } else if (Array.isArray(rest1[key])) {
      for (let i = 0; i < rest1[key].length; i++) {
        checkSimilarity(rest1[key][i], rest2[key]?.[i]);
      }
    } else {
      expect(rest1[key]).toEqual(rest2[key]);
    }
  }

  // Compare timestamp fields
  for (const key in timestamps1) {
    if (timestamps1[key] && timestamps2[key]) {
      const date1 = new Date(timestamps1[key]);
      const date2 = new Date(timestamps2[key]);
      expect(date1.getTime()).toEqual(date2.getTime());
    }
  }
};
