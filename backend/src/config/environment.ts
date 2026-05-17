import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  MYSQL_HOST: z.string().default("127.0.0.1"),
  MYSQL_PORT: z.coerce.number().int().positive().default(3306),
  MYSQL_DATABASE: z.string().default("smartsuite"),
  MYSQL_USER: z.string().default("smartsuite"),
  MYSQL_PASSWORD: z.string().default("smartsuite_password"),
  MYSQL_CONNECTION_LIMIT: z.coerce.number().int().positive().default(10),
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
