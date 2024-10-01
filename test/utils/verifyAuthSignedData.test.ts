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
    domainOverride?: Partial<{
      name: string;
      version: string;
      chainId: number;
    }>,
  ) => {
    return await client.signTypedData({
      domain: domainOverride ?? domain,
      message,
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
      name: "Hypercerts",
      version: "1",
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
      name: "Hypercerts",
      version: "1",
      chainId: optimism.id,
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
      name: "Wrong",
      version: "1",
      chainId: sepolia.id,
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
      name: "Hypercerts",
      version: "2",
      chainId: sepolia.id,
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
});
