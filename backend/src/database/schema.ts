import { getDatabasePool } from "./mysql.js";

const createDemoRequestsTable = `
  CREATE TABLE IF NOT EXISTS demo_requests (
    id CHAR(36) NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    firm_name VARCHAR(160) NOT NULL,
    email VARCHAR(180) NOT NULL,
    phone VARCHAR(40) NULL,
    role VARCHAR(120) NULL,
    caseload VARCHAR(80) NULL,
    message TEXT NULL,
    consent TINYINT(1) NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    requested_at TIMESTAMP(3) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    INDEX idx_demo_requests_email (email),
    INDEX idx_demo_requests_requested_at (requested_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

export async function initializeDatabaseSchema() {
  await getDatabasePool().execute(createDemoRequestsTable);
}
