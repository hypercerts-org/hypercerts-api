import { describe, it, expect, beforeEach } from "vitest";
import { MonitoringController } from "../../src/controllers/MonitoringController";

describe("MonitoringController", () => {
  let controller: MonitoringController;

  beforeEach(() => {
    controller = new MonitoringController();
  });

  describe("healthCheck", () => {
    it("returns health status with required metrics", async () => {
      const result = await controller.healthCheck();

      expect(result).toEqual(
        expect.objectContaining({
          status: "OK",
          uptime: expect.any(Number),
          timestamp: expect.any(Number),
          memory: expect.objectContaining({
            heapTotal: expect.any(Number),
            heapUsed: expect.any(Number),
            rss: expect.any(Number),
            external: expect.any(Number),
          }),
        }),
      );
    });

    it("returns current timestamp", async () => {
      const before = Date.now();
      const result = await controller.healthCheck();
      const after = Date.now();

      expect(result.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.timestamp).toBeLessThanOrEqual(after);
    });

    it("returns positive uptime", async () => {
      const result = await controller.healthCheck();

      expect(result.uptime).toBeGreaterThan(0);
    });
  });
});
