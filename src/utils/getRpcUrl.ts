import { alchemyApiKey, drpcApiPkey, infuraApiKey } from "./constants.js";

export const alchemyUrl = (chainId: number) => {
  switch (chainId) {
    case 10:
      return `https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
    case 8453:
      return `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
    case 42220:
      return;
    case 84532:
      return `https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`;
    case 11155111:
      return `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

const infuraUrl = (chainId: number) => {
  switch (chainId) {
    case 10:
      return `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`;
    case 8453:
      return;
    case 42220:
      return `https://celo-mainnet.infura.io/v3/${infuraApiKey}`;
    case 84532:
      return;
    case 11155111:
      return `https://sepolia.infura.io/v3/${infuraApiKey}`;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

const drpcUrl = (chainId: number) => {
  switch (chainId) {
    case 10:
      return `https://lb.drpc.org/ogrpc?network=optimism&dkey=${drpcApiPkey}`;
    case 8453:
      return `https://lb.drpc.org/ogrpc?network=base&dkey=${drpcApiPkey}`;
    case 42220:
      return `https://lb.drpc.org/ogrpc?network=celo&dkey=${drpcApiPkey}`;
    case 84532:
      return;
    case 11155111:
      return;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export const getRpcUrl = (chainId: number) => {
  const alchemy = alchemyUrl(chainId);
  const infura = infuraUrl(chainId);
  const drpc = drpcUrl(chainId);
  return [alchemy, infura, drpc].filter((url) => url)[0];
};
