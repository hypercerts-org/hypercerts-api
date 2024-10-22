import { describe, it, expect } from "vitest";
import { processSectionsToHyperboardOwnership } from "../../src/utils/processSectionsToHyperboardOwnership.js";

describe("processSectionsToHyperboardOwnership", async () => {
  it("should return an empty array if no sections are provided", async () => {
    const owners = processSectionsToHyperboardOwnership([]);
    expect(owners).toBeDefined();
    expect(owners.length).toBe(0);
  });

  it("should return empty array if section has no owners", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: [],
      },
    ]);
    expect(owners).toBeDefined();
    expect(owners.length).toBe(0);
  });

  it("should return ignore sections without owners", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: [
          {
            address: "0x123",
            percentage_owned: 100,
          },
        ],
      },
      {
        owners: [],
      },
    ]);
    expect(owners.length).toBe(1);
    expect(owners[0].address).toBe("0x123");
    expect(owners[0].percentage_owned).toBe(100);
  });

  it("should process a single section with a single owner", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: [
          {
            address: "0x123",
            percentage_owned: 100,
          },
        ],
      },
    ]);
    expect(owners.length).toBe(1);
    expect(owners[0].address).toBe("0x123");
    expect(owners[0].percentage_owned).toBe(100);
  });

  it("should process a single section with multiple owners", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: [
          {
            address: "0x123",
            percentage_owned: 50,
          },
          {
            address: "0x456",
            percentage_owned: 50,
          },
        ],
      },
    ]);
    expect(owners.length).toBe(2);
    expect(owners[0].address).toBe("0x123");
    expect(owners[0].percentage_owned).toBe(50);
    expect(owners[1].address).toBe("0x456");
    expect(owners[1].percentage_owned).toBe(50);
  });

  it("should process multiple sections with multiple owners", async () => {
    const owners = processSectionsToHyperboardOwnership([
      {
        owners: [
          {
            address: "0x123",
            percentage_owned: 50,
          },
          {
            address: "0x456",
            percentage_owned: 50,
          },
        ],
      },
      {
        owners: [
          {
            address: "0x123",
            percentage_owned: 50,
          },
          {
            address: "0x789",
            percentage_owned: 50,
          },
        ],
      },
    ]);
    expect(owners.length).toBe(3);
    expect(owners[0].address).toBe("0x123");
    expect(owners[0].percentage_owned).toBe(50);
    expect(owners[1].address).toBe("0x456");
    expect(owners[1].percentage_owned).toBe(25);
    expect(owners[2].address).toBe("0x789");
    expect(owners[2].percentage_owned).toBe(25);
  });
});
