import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { environment } from "./config/environment.js";
import { registerErrorHandlers } from "./middleware/errorHandler.js";
import { demoRequestRoutes } from "./routes/demoRequestRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: environment.isProduction ? "info" : "debug"
    },
    bodyLimit: 24 * 1024,
    requestIdHeader: "x-request-id"
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  });

  await app.register(cors, {
    origin: environment.corsOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Request-Id"],
    maxAge: 86400
  });

  await app.register(rateLimit, {
    max: environment.RATE_LIMIT_MAX,
    timeWindow: environment.RATE_LIMIT_WINDOW
  });

  await app.register(healthRoutes, { prefix: "/api" });
  await app.register(demoRequestRoutes, { prefix: "/api" });

  registerErrorHandlers(app);

  return app;
}
