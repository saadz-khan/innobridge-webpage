import { randomUUID } from "node:crypto";
import { DemoRequestRepository } from "../repositories/demoRequestRepository.js";
import type { DemoRequestInput } from "../schemas/demoRequestSchema.js";
import type { DemoRequestRecord } from "../types/demoRequest.js";

type RequestSource = {
  ipAddress?: string;
  userAgent?: string;
};

export class DemoRequestService {
  constructor(private readonly demoRequestRepository = new DemoRequestRepository()) {}

  async create(input: DemoRequestInput, source: RequestSource): Promise<DemoRequestRecord> {
    const record: DemoRequestRecord = {
      ...input,
      id: randomUUID(),
      requestedAt: new Date().toISOString(),
      source
    };

    await this.demoRequestRepository.create(record);

    return record;
  }
}
