import { buildApp } from "./app.js";
import { environment } from "./config/environment.js";

const app = await buildApp();

try {
  await app.listen({
    host: environment.HOST,
    port: environment.PORT
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

const shutdown = async (signal: NodeJS.Signals) => {
  app.log.info({ signal }, "Shutting down API");
  await app.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
