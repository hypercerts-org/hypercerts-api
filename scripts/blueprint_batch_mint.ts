import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  celo,
  filecoin,
  filecoinCalibration,
  optimism,
  sepolia,
} from "viem/chains";
import { input, select } from "@inquirer/prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface FormValues {
  title: string;
  description: string;
  logo: string;
  banner: string;
  cardImage?: string;
  tags: string[];
  projectDates: {
    from: Date;
    to: Date;
  };
  link: string;
  contributors: string[];
  allowlistEntries?: {
    address: string;
    units: string;
  }[];
}

interface BlueprintCreateRequest {
  form_values: FormValues;
  minter_address: string;
  admin_address: string;
  signature: string;
  chain_id: number;
}

export const hypercertApiSigningDomain = (chainId: number) => ({
  name: "Hypercerts",
  version: "1",
  chainId,
});

async function main() {
  // Parse the csv file from the current directory
  const privateKey = await input({
    message: "Enter your private key",
    required: true,
  });

  if (!privateKey) {
    console.error("PRIVATE_KEY is not set");
    return;
  }

  const csv = await input({
    message: "Enter the path to the csv file",
    required: true,
    default: path.join(__dirname, "blueprint_batch_mint.csv"),
  });

  const testnetChains = [
    sepolia,
    arbitrumSepolia,
    baseSepolia,
    filecoinCalibration,
  ];

  const prodChains = [optimism, celo, base, arbitrum, filecoin];
  const allChains = [...testnetChains, ...prodChains];

  const chainId = await select({
    message: "Select chain",
    choices: [...allChains.map((c) => ({ name: c.name, value: c.id }))],
  });

  const chain = allChains.find((c) => c.id === chainId);
  const isTestnet = testnetChains.some((c) => c.id === chainId);

  if (!chain) {
    console.error("Chain not found");
    return;
  }

  const csvContent = fs.readFileSync(csv, "utf8");
  const records = parse(csvContent, {
    columns: true,
  });

  const account = privateKeyToAccount(
    privateKey.startsWith("0x")
      ? (privateKey as `0x${string}`)
      : `0x${privateKey}`,
  );
  const wallet = createWalletClient({
    account,
    chain,
    transport: http(),
  });
  console.log("Using account", account.address);

  const signature = await wallet.signTypedData({
    account: account,
    domain: hypercertApiSigningDomain(chain.id),
    types: { Message: [{ name: "message", type: "string" }] },
    primaryType: "Message",
    message: {
      message: `Create blueprint for ${account.address}`,
    },
  });

  // const TESTNET_API_URL = "http://localhost:4000/v1";
  const TESTNET_API_URL = "https://staging-api.hypercerts.org/v1";
  const PROD_API_URL = "https://api.hypercerts.org/v1";
  const ENDPOINT = isTestnet ? TESTNET_API_URL : PROD_API_URL;

  for (const record of records) {
    const {
      title,
      description,
      logo_image,
      banner_image,
      link,
      contributors,
      allowlist_entries,
      work_scope,
      work_time_from,
      work_time_to,
      recipient,
    } = record;
    const formValues: FormValues = {
      title,
      description,
      logo: logo_image,
      banner: banner_image,
      tags: work_scope.split(",").map((tag) => tag.trim()),
      projectDates: {
        from: new Date(work_time_from),
        to: new Date(work_time_to),
      },
      link,
      contributors: contributors
        .split(",")
        .map((contributor) => contributor.trim()),
    };

    if (allowlist_entries) {
      formValues.allowlistEntries = JSON.parse(`[${allowlist_entries}]`);
    }

    console.log("formValues", formValues);

    const blueprint: BlueprintCreateRequest = {
      form_values: formValues,
      minter_address: recipient,
      admin_address: account.address,
      signature,
      chain_id: chain.id,
    };

    const response = await fetch(`${ENDPOINT}/blueprints`, {
      method: "POST",
      body: JSON.stringify(blueprint),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });

    console.log("blueprint created", JSON.stringify(response, null, 2));
  }
}

main();
