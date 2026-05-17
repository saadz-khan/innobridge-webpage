import { getDatabasePool } from "../database/mysql.js";
import type { DemoRequestRecord } from "../types/demoRequest.js";

export class DemoRequestRepository {
  async create(record: DemoRequestRecord) {
    await getDatabasePool().execute(
      `
        INSERT INTO demo_requests (
          id,
          first_name,
          last_name,
          firm_name,
          email,
          phone,
          role,
          caseload,
          message,
          consent,
          ip_address,
          user_agent,
          requested_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.firstName,
        record.lastName,
        record.firmName,
        record.email,
        record.phone || null,
        record.role || null,
        record.caseload || null,
        record.message || null,
        record.consent,
        record.source.ipAddress || null,
        record.source.userAgent || null,
        new Date(record.requestedAt)
      ]
    );
  }
}
