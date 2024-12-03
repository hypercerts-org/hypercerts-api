import { SignatureRequestStatus } from "../graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import { Database } from "../types/supabaseData.js";
import { getCommand } from "../commands/CommandFactory.js";

import { SupabaseDataService } from "./SupabaseDataService.js";
import { SafeApiQueue } from "./SafeApiQueue.js";

type SignatureRequest =
  Database["public"]["Tables"]["signature_requests"]["Row"];

export class SignatureRequestProcessor {
  private static instance: SignatureRequestProcessor;

  private readonly dataService: SupabaseDataService;
  private readonly queue: SafeApiQueue;

  constructor() {
    this.dataService = new SupabaseDataService();
    this.queue = SafeApiQueue.getInstance();
  }

  async processPendingRequests(): Promise<void> {
    const pendingRequests = await this.getPendingRequests();

    console.log(`Found ${pendingRequests.length} pending requests`);

    for (const request of pendingRequests) {
      const command = getCommand(request);
      if (this.queue.hasCommand(command)) {
        continue;
      }
      this.queue.addCommand(command);
    }
  }

  private async getPendingRequests(): Promise<SignatureRequest[]> {
    const response = await this.dataService.getSignatureRequests({
      where: {
        status: { eq: SignatureRequestStatus.PENDING },
      },
    });

    return this.dataService.db.transaction().execute(async (transaction) => {
      const dataRes = await transaction.executeQuery(response.data);
      return dataRes.rows as SignatureRequest[];
    });
  }

  static getInstance(): SignatureRequestProcessor {
    if (!SignatureRequestProcessor.instance) {
      SignatureRequestProcessor.instance = new SignatureRequestProcessor();
    }
    return SignatureRequestProcessor.instance;
  }
}
