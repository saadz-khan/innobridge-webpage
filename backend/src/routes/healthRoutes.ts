import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    service: "innobridge-smartconveyance-api",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  }));
}
