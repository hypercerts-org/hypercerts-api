import { Route, Get, Response } from "tsoa";

@Route("v1/monitoring")
export class MonitoringController {
  @Get("/health")
  @Response(200, "OK")
  public async healthCheck(): Promise<{
    status: string;
    uptime: number;
    timestamp: number;
    memory: NodeJS.MemoryUsage;
  }> {
    return {
      status: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
      memory: process.memoryUsage(),
    };
  }
}
