import type { DemoRequestInput } from "../schemas/demoRequestSchema.js";

export type DemoRequestRecord = DemoRequestInput & {
  id: string;
  requestedAt: string;
  source: {
    ipAddress?: string;
    userAgent?: string;
  };
};
