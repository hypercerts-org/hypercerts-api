import { Eip1193Provider, FetchRequest } from "ethers";

interface CustomEip1193Config {
  headers?: Record<string, string>;
}

interface CustomEip1193ProviderOptions {
  url: string | FetchRequest;
  config?: CustomEip1193Config;
}

export class CustomEip1193Provider implements Eip1193Provider {
  private fetchRequest: FetchRequest;

  constructor({ url, config }: CustomEip1193ProviderOptions) {
    if (typeof url === "string") {
      url = new FetchRequest(url);
    }
    this.fetchRequest = url.clone();

    if (config?.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        this.fetchRequest.setHeader(key, value);
      });
    }
  }

  async request(args: {
    method: string;
    params?: Array<unknown>;
  }): Promise<unknown> {
    this.fetchRequest.method = "POST";
    this.fetchRequest.body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: args.method,
      params: args.params || [],
    });

    const response = await this.fetchRequest.send();

    const result = JSON.parse(response.bodyText);
    if (result.error) {
      throw new Error(result.error.message || "RPC Error");
    }
    return result.result;
  }
}
