import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DEMO_REQUEST_LOG_PATH: z.string().default("storage/demo-requests.jsonl"),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(80),
  RATE_LIMIT_WINDOW: z.string().default("1 minute")
});

const parsed = environmentSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const corsOrigins = parsed.data.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const environment = {
  ...parsed.data,
  corsOrigins,
  isProduction: parsed.data.NODE_ENV === "production"
};
