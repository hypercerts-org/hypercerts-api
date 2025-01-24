import cron from "node-cron";

import SignatureRequestProcessor from "../services/SignatureRequestProcessor.js";

export default class SignatureRequestProcessorCron {
  private static instance: SignatureRequestProcessorCron;
  private processor: SignatureRequestProcessor;

  private constructor() {
    this.processor = SignatureRequestProcessor.getInstance();
    this.setupCronJob();
  }

  private setupCronJob() {
    // Run every 30 seconds
    cron.schedule("*/30 * * * * *", async () => {
      try {
        await this.processor.processPendingRequests();
      } catch (error) {
        console.error("Error in signature request processor cron job:", error);
      }
    });
  }

  public static start(): void {
    if (!SignatureRequestProcessorCron.instance) {
      SignatureRequestProcessorCron.instance =
        new SignatureRequestProcessorCron();
    }
  }
}
