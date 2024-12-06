import { describe, it, expect, vi } from "vitest";
import { SafeApiQueue } from "../../src/services/SafeApiQueue.js";
import { ISafeApiCommand } from "../../src/types/safe-signatures.js";

class MockCommand implements ISafeApiCommand {
  constructor(
    private safeAddress: string,
    private messageHash: string,
  ) {}

  async execute(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  getId(): string {
    return `${this.safeAddress}-${this.messageHash}`;
  }
}

describe("SafeApiQueue", () => {
  it("should not add duplicate commands", () => {
    const queue = new SafeApiQueue({ maxConcurrent: 1, rateLimit: 1 });
    const commands = Array.from(
      { length: 10 },
      (_, i) => new MockCommand("0x123", `hash${i}`),
    );
    commands.forEach((command) => queue.addCommand(command));
    const duplicate = new MockCommand("0x123", "hash9");
    const spy = vi.spyOn(duplicate, "execute");
    queue.addCommand(duplicate);
    expect(queue.hasCommand(duplicate)).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should not exceed max concurrent executions", async () => {
    const queue = new SafeApiQueue({ maxConcurrent: 5, rateLimit: 5 });
    const commands = Array.from(
      { length: 10 },
      (_, i) => new MockCommand("0x123", `hash${i}`),
    );

    commands.forEach((command) => queue.addCommand(command));

    // Mock the execute method to track execution
    const executeSpies = commands.map((command) =>
      vi.spyOn(command, "execute"),
    );

    // Wait for processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check that no more than maxConcurrent commands were executed at once
    const maxConcurrentExecutions = Math.max(
      ...executeSpies.map((spy) => spy.mock.calls.length),
    );

    expect(maxConcurrentExecutions).toBeLessThanOrEqual(5);
  });
});
