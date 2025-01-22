import {
  JsonRpcProvider,
  FetchRequest,
  JsonRpcApiProviderOptions,
  Networkish,
} from "ethers";

interface CustomProviderConfig {
  headers?: Record<string, string>;
}

interface CustomProviderOptions {
  url: string | FetchRequest;
  config?: CustomProviderConfig;
  network?: Networkish;
  providerOptions?: JsonRpcApiProviderOptions;
}

export class CustomEthersJsonRpcProvider extends JsonRpcProvider {
  constructor({
    url,
    config,
    network,
    providerOptions,
  }: CustomProviderOptions) {
    if (typeof url === "string") {
      url = new FetchRequest(url);
    }
    url = url.clone();

    if (config?.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        url.setHeader(key, value);
      });
    }

    super(url, network, providerOptions);
  }
}
