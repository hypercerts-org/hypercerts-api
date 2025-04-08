import { SignatureRequestStatus } from "../graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import { getCommand, SignatureRequest } from "../commands/CommandFactory.js";

import { SafeApiQueue } from "./SafeApiQueue.js";
import { container, inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "./database/entities/SignatureRequestsEntityService.js";
import { DataKyselyService } from "../client/kysely.js";
import { Selectable } from "kysely";

@injectable()
export default class SignatureRequestProcessor {
  private static instance: SignatureRequestProcessor;
  private readonly queue: SafeApiQueue;

  constructor(
    @inject(SignatureRequestsService)
    private signatureRequestService: SignatureRequestsService,
    @inject(DataKyselyService) private dbService: DataKyselyService,
  ) {
    this.queue = SafeApiQueue.getInstance();
  }

  async processPendingRequests(): Promise<void> {
    const pendingRequests = await this.getPendingRequests();

    console.log(`Found ${pendingRequests.length} pending signature requests`);

    for (const request of pendingRequests) {
      const command = getCommand(request);
      if (this.queue.hasCommand(command)) {
        continue;
      }
      this.queue.addCommand(command);
    }
  }

  private async getPendingRequests(): Promise<Selectable<SignatureRequest>[]> {
    const { data } = await this.signatureRequestService.getSignatureRequests({
      where: {
        status: { eq: SignatureRequestStatus.PENDING },
      },
    });

    return data;
  }

  static getInstance(): SignatureRequestProcessor {
    if (!SignatureRequestProcessor.instance) {
      SignatureRequestProcessor.instance = new SignatureRequestProcessor(
        container.resolve(SignatureRequestsService),
        container.resolve(DataKyselyService),
      );
    }
    return SignatureRequestProcessor.instance;
  }
}
