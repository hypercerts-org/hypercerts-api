import { describe, it, expect } from "vitest";
import { processSectionsToHyperboardOwnership } from "../../src/utils/processSectionsToHyperboardOwnership.js";
import { generateMockAddress } from "./testUtils.js";

describe("processSectionsToHyperboardOwnership", async () => {
  it("should return an empty array if no sections are provided", async () => {
    const owners = processSectionsToHyperboardOwnership([]);
    expect(owners).toBeDefined();
    expect(owners.length).toBe(0);
  });

  it("should return empty array if section has no owners", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: { data: [], count: 0 },
      },
    ]);
    expect(owners).toBeDefined();
    expect(owners.length).toBe(0);
  });

  it("should return ignore sections without owners", async () => {
    const address = generateMockAddress();
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: {
          data: [
            {
              address,
              percentage_owned: 100,
            },
          ],
          count: 1,
        },
      },
      {
        owners: { data: [], count: 0 },
      },
    ]);
    expect(owners.length).toBe(1);
    expect(owners[0].address).toBe(address);
    expect(owners[0].percentage_owned).toBe(100);
  });

  it("should process a single section with a single owner", async () => {
    const address = generateMockAddress();
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: {
          data: [
            {
              address,
              percentage_owned: 100,
            },
          ],
          count: 1,
        },
      },
    ]);
    expect(owners.length).toBe(1);
    expect(owners[0].address).toBe(address);
    expect(owners[0].percentage_owned).toBe(100);
  });

  it("should process a single section with multiple owners", async () => {
    const address1 = generateMockAddress();
    const address2 = generateMockAddress();
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: {
          data: [
            {
              address: address1,
              percentage_owned: 50,
            },
            {
              address: address2,
              percentage_owned: 50,
            },
          ],
          count: 2,
        },
      },
    ]);
    expect(owners.length).toBe(2);
    expect(owners[0].address).toBe(address1);
    expect(owners[0].percentage_owned).toBe(50);
    expect(owners[1].address).toBe(address2);
    expect(owners[1].percentage_owned).toBe(50);
  });

  it("should process multiple sections with multiple owners", async () => {
    const address1 = generateMockAddress();
    const address2 = generateMockAddress();
    const address3 = generateMockAddress();
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: {
          data: [
            {
              address: address1,
              percentage_owned: 50,
            },
            {
              address: address2,
              percentage_owned: 50,
            },
          ],
          count: 2,
        },
      },
      {
        owners: {
          data: [
            {
              address: address3,
              percentage_owned: 50,
            },
            {
              address: address2,
              percentage_owned: 50,
            },
          ],
          count: 2,
        },
      },
    ]);
    expect(owners.length).toBe(3);
    expect(owners[0].address).toBe(address1);
    expect(owners[0].percentage_owned).toBe(25);
    expect(owners[1].address).toBe(address2);
    expect(owners[1].percentage_owned).toBe(50);
    expect(owners[2].address).toBe(address3);
    expect(owners[2].percentage_owned).toBe(25);
  });
});
