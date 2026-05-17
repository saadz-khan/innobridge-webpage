import type { FastifyInstance, FastifyReply } from "fastify";
import { checkDatabaseHealth } from "../database/mysql.js";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async (_request, reply) => {
    try {
      await checkDatabaseHealth();

      return {
        status: "ok",
        service: "SmartSuiteBackend",
        database: "ok",
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      requestDatabaseUnavailable(reply, error);
    }
  });
}

function requestDatabaseUnavailable(reply: FastifyReply, error: unknown) {
  reply.status(503).send({
    status: "unavailable",
    service: "SmartSuiteBackend",
    database: "unavailable",
    message: "Database health check failed.",
    error: error instanceof Error ? error.message : "Unknown database error",
    timestamp: new Date().toISOString()
  });
}
