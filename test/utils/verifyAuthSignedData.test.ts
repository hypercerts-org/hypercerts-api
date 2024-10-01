import { describe, it, expect } from "vitest";
import { verifyAuthSignedData } from "../../src/utils/verifyAuthSignedData.js";
import { createTestClient, http, publicActions, walletActions } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { optimism, sepolia } from "viem/chains";

describe("verifyAuthSignedData", async () => {
  // Create first test wallet
  const privateKey1 = generatePrivateKey();
  const testClient1 = createTestClient({
    account: privateKeyToAccount(privateKey1),
    chain: sepolia,
    mode: "anvil",
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions);
  const address1 = testClient1.account.address;

  // Create second test wallet
  const privateKey2 = generatePrivateKey();
  const testClient2 = createTestClient({
    account: privateKeyToAccount(privateKey2),
    chain: optimism,
    mode: "anvil",
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions);
  const address2 = testClient2.account.address;

  const types = {
    test: [{ name: "message", type: "string" }],
  } as const;
  const domain = {
    name: "Hypercerts",
    version: "1",
    chainId: sepolia.id,
  } as const;
  const message = {
    message: "test",
  } as const;

  const signTypedData = async (
    client: typeof testClient1,
    overrides?: {
      domainOverride?: Partial<{
        name: string;
        version: string;
        chainId: number;
      }>;
      messageOverride?: Partial<typeof message>;
    },
  ) => {
    return await client.signTypedData({
      domain: overrides?.domainOverride ?? domain,
      message: overrides?.messageOverride ?? message,
      types,
      primaryType: "test",
    });
  };
  it("Verifies signature correctly", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(true);
  });

  it("Fails to verify signature with wrong address", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address2,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify signature with wrong message", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "wrong",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify signature with wrong chainId", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: optimism.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify with wrong domain - missing chain id", async () => {
    const signature = await signTypedData(testClient1, {
      domainOverride: { name: "Hypercerts", version: "1" },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify with wrong domain - wrong chain id", async () => {
    const signature = await signTypedData(testClient1, {
      domainOverride: {
        name: "Hypercerts",
        version: "1",
        chainId: optimism.id,
      },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify with wrong domain - wrong name", async () => {
    const signature = await signTypedData(testClient1, {
      domainOverride: {
        name: "Wrong",
        version: "1",
        chainId: sepolia.id,
      },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("Fails to verify with wrong domain - wrong version", async () => {
    const signature = await signTypedData(testClient1, {
      domainOverride: {
        name: "Hypercerts",
        version: "2",
        chainId: sepolia.id,
      },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify wrong domain - null fields", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: null,
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify wrong message - null fields", async () => {
    const signature = await signTypedData(testClient1, {
      messageOverride: { message: null },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: null,
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify wrong message - different fields", async () => {
    const signature = await signTypedData(testClient1, {
      messageOverride: { message: "different", other: "fields" },
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: { message: "different", other: "fields" },
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify wrong message - verify primary type", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: { message: "test" },
      },
      types,
      signature,
      primaryType: "mock",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify wrong message - signed different primary type", async () => {
    const signature = await signTypedData(testClient1);

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: { message: "test" },
      },
      types,
      signature,
      primaryType: "mock",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("fails to verify with malformed signature", async () => {
    const signature = "0xInvalidSignature";

    const result = await verifyAuthSignedData({
      address: address1,
      message: {
        message: "test",
      },
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(false);
  });

  it("verifies message with special characters", async () => {
    const specialMessage = {
      message: "Test with special chars: éèàù@#$%^&*()_+",
    };
    const signature = await signTypedData(testClient1, {
      messageOverride: specialMessage,
    });

    const result = await verifyAuthSignedData({
      address: address1,
      message: specialMessage,
      types,
      signature,
      primaryType: "test",
      requiredChainId: sepolia.id,
    });
    expect(result).toEqual(true);
  });
});
