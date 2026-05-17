import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";
import { environment } from "../config/environment.js";

let pool: Pool | undefined;

export function getDatabasePool() {
  if (!pool) {
    pool = mysql.createPool({
      host: environment.MYSQL_HOST,
      port: environment.MYSQL_PORT,
      database: environment.MYSQL_DATABASE,
      user: environment.MYSQL_USER,
      password: environment.MYSQL_PASSWORD,
      waitForConnections: true,
      connectionLimit: environment.MYSQL_CONNECTION_LIMIT,
      queueLimit: 0,
      timezone: "Z"
    });
  }

  return pool;
}

export async function closeDatabasePool() {
  if (!pool) {
    return;
  }

  await pool.end();
  pool = undefined;
}

export async function checkDatabaseHealth() {
  await getDatabasePool().query("SELECT 1");
}
