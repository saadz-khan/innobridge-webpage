import type { FastifyError, FastifyInstance } from "fastify";

export function registerErrorHandlers(app: FastifyInstance) {
  app.setNotFoundHandler((request, reply) => {
    request.log.warn({ path: request.url }, "Route not found");
    reply.status(404).send({
      message: "The requested API route was not found."
    });
  });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({ error }, "Unhandled API error");

    const statusCode = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;

    reply.status(statusCode).send({
      message: statusCode >= 500 ? "Something went wrong. Please try again." : error.message
    });
  });
}
