import type { FastifyInstance } from "fastify";
import { demoRequestSchema } from "../schemas/demoRequestSchema.js";
import { DemoRequestService } from "../services/demoRequestService.js";

const demoRequestService = new DemoRequestService();

export async function demoRequestRoutes(app: FastifyInstance) {
  app.post("/demo-requests", async (request, reply) => {
    const result = demoRequestSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(422).send({
        message: "Please check the highlighted fields.",
        errors: result.error.flatten().fieldErrors
      });
    }

    const record = await demoRequestService.create(result.data, {
      ipAddress: request.ip,
      userAgent: request.headers["user-agent"]
    });

    request.log.info({ demoRequestId: record.id, firmName: record.firmName }, "Demo request received");

    return reply.status(201).send({
      id: record.id,
      message: "Demo request received."
    });
  });
}
