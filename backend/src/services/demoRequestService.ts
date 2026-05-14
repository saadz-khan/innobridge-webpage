import { mkdir, appendFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { environment } from "../config/environment.js";
import type { DemoRequestInput } from "../schemas/demoRequestSchema.js";
import type { DemoRequestRecord } from "../types/demoRequest.js";

type RequestSource = {
  ipAddress?: string;
  userAgent?: string;
};

export class DemoRequestService {
  async create(input: DemoRequestInput, source: RequestSource): Promise<DemoRequestRecord> {
    const record: DemoRequestRecord = {
      ...input,
      id: randomUUID(),
      requestedAt: new Date().toISOString(),
      source
    };

    await mkdir(dirname(environment.DEMO_REQUEST_LOG_PATH), { recursive: true });
    await appendFile(environment.DEMO_REQUEST_LOG_PATH, `${JSON.stringify(record)}\n`, "utf8");

    return record;
  }
}
