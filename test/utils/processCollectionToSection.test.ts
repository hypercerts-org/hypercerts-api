import { describe, it, expect } from "vitest";
import { processCollectionToSection } from "../../src/utils/processCollectionToSection.js";
import { sepolia } from "viem/chains";
import { Database as DataDatabase } from "../../src/types/supabaseData.js";

describe("processCollectionToSection", async () => {
  const collection = {
    name: "test",
    hidden: false,
    description: "test",
    chain_ids: [sepolia.id],
    id: "test",
    created_at: new Date().toISOString(),
  };
  const emptyArgs = {
    blueprintMetadata: [],
    allowlistEntries: [],
    fractions: [],
    hypercerts: [],
    blueprints: [],
    users: [],
    hypercert_metadata: [],
    collection,
  };
  const user1: DataDatabase["public"]["Tables"]["users"]["Row"] = {
    address: "0x1",
    chain_id: sepolia.id,
    avatar: "testAvatar1",
    display_name: "testDisplayName1",
    id: "testUser1",
    created_at: new Date().toISOString(),
  };

  const user2: DataDatabase["public"]["Tables"]["users"]["Row"] = {
    address: "0x2",
    chain_id: sepolia.id,
    avatar: "testAvatar2",
    display_name: "testDisplayName2",
    id: "testUser2",
    created_at: new Date().toISOString(),
  };

  const hypercert1 = {
    hypercert_id: "test1",
    uri: "test",
    units: 1,
    id: "test",
    token_id: 1,
    owner_address: user1.address,
    attestations_count: 1,
    claim_attestation_count: 1,
    contracts_id: "test",
    creation_block_number: 1,
    creation_block_timestamp: 1,
    creator_address: user1.address,
    last_update_block_number: 1,
    last_update_block_timestamp: 1,
    value: 1,
    sales_count: 1,
    name: "test1",
  };

  const hypercert2 = {
    hypercert_id: "test2",
    uri: "test",
    units: 100,
    id: "test",
    token_id: 2,
    owner_address: user1.address,
    attestations_count: 1,
    claim_attestation_count: 1,
    contracts_id: "test",
    creation_block_number: 1,
    creation_block_timestamp: 1,
    creator_address: user1.address,
    last_update_block_number: 1,
    last_update_block_timestamp: 1,
    value: 1,
    sales_count: 1,
    name: "test2",
  };

  const allowlistEntry1 = {
    hypercert_id: "test1",
    entry: 1,
    id: "testAllowlistEntry 1",
    user_address: "0x1",
    chain_id: sepolia.id,
    claimed: false,
    leaf: "test",
    proof: [],
    root: "test",
    units: 1,
    total_units: 10,
    token_id: 1,
    hypercert_allow_lists_id: "test",
  };
  const allowlistEntry2 = {
    hypercert_id: "test1",
    entry: 1,
    id: "testAllowlistEntry 2",
    user_address: "0x2",
    chain_id: sepolia.id,
    claimed: false,
    leaf: "test",
    proof: [],
    root: "test",
    units: 3,
    total_units: 10,
    token_id: 2,
    hypercert_allow_lists_id: "test",
  };

  const hypercertMetadata1: DataDatabase["public"]["Tables"]["hyperboard_hypercert_metadata"]["Row"] =
    {
      hypercert_id: hypercert1.hypercert_id as string,
      hyperboard_id: "testHyperboard1",
      collection_id: "testCollection1",
      display_size: 1,
      created_at: new Date().toISOString(),
    };

  const hypercertMetadata2: DataDatabase["public"]["Tables"]["hyperboard_hypercert_metadata"]["Row"] =
    {
      hypercert_id: hypercert2.hypercert_id as string,
      hyperboard_id: "testHyperboard2",
      collection_id: "testCollection2",
      display_size: 1,
      created_at: new Date().toISOString(),
    };
  it("should process empty collection to section", async () => {
    const emptySection = processCollectionToSection(emptyArgs);

    expect(emptySection).toBeDefined();
    expect(emptySection.entries).toBeDefined();
    expect(emptySection.entries.length).toBe(0);
    expect(emptySection.owners).toBeDefined();
    expect(emptySection.owners.length).toBe(0);
  });

  it("should process allowlist entries according to size", async () => {
    const section = processCollectionToSection({
      ...emptyArgs,
      hypercerts: [
        { ...hypercert1, units: allowlistEntry1.units + allowlistEntry2.units },
      ],
      hypercert_metadata: [hypercertMetadata1],
      allowlistEntries: [allowlistEntry1, allowlistEntry2],
    });

    expect(section.owners.length).toBe(2);
    expect(
      section.owners.find(
        (owner) => owner.address === allowlistEntry1.user_address,
      )?.percentage_owned,
    ).toBe(25);
    expect(
      section.owners.find(
        (owner) => owner.address === allowlistEntry2.user_address,
      )?.percentage_owned,
    ).toBe(75);
  });

  it("should ignore allowlist entries that have already been claimed", () => {
    const section = processCollectionToSection({
      ...emptyArgs,
      hypercerts: [hypercert1],
      hypercert_metadata: [hypercertMetadata1],
      allowlistEntries: [
        allowlistEntry1,
        { ...allowlistEntry2, claimed: true },
      ],
    });

    expect(section.owners.length).toBe(1);
    expect(section.owners[0].percentage_owned).toBe(100);
  });

  it("should use correct user metadata for allowlist entries", async () => {
    const { owners } = processCollectionToSection({
      ...emptyArgs,
      hypercerts: [hypercert1],
      hypercert_metadata: [hypercertMetadata1],
      allowlistEntries: [allowlistEntry1],
      users: [user1],
    });
    console.log(owners);
    expect(
      owners.find((owner) => owner.address === user1.address)?.avatar,
    ).toBe(user1.avatar);
    expect(
      owners.find((owner) => owner.address === user1.address)?.display_name,
    ).toBe(user1.display_name);
  });

  it("Should adjust for display size", () => {
    const { owners } = processCollectionToSection({
      ...emptyArgs,
      hypercerts: [hypercert1, { ...hypercert2, units: 157 }],
      hypercert_metadata: [hypercertMetadata1, hypercertMetadata2],
      users: [user1, user2],
      fractions: [
        {
          fraction_id: "fraction1",
          hypercert_id: hypercert1.hypercert_id,
          owner_address: user1.address,
          token_id: 1,
          units: 1,
          creation_block_timestamp: 1,
          creation_block_number: 1,
          last_update_block_number: 1,
          last_update_block_timestamp: 1,
          id: "test1",
          claims_id: "test1",
          value: 1,
        },
        {
          fraction_id: "fraction2",
          hypercert_id: hypercert2.hypercert_id,
          owner_address: user2.address,
          token_id: 2,
          units: 157,
          creation_block_timestamp: 1,
          creation_block_number: 1,
          last_update_block_number: 1,
          last_update_block_timestamp: 1,
          id: "test2",
          claims_id: "test2",
          value: 1,
        },
      ],
    });

    expect(owners[0].percentage_owned).toBe(owners[1].percentage_owned);
  });
});
