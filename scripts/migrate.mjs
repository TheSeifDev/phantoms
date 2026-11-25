import { readFile } from "node:fs/promises";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required to run database migrations.");
  process.exit(1);
}

const migration = await readFile(new URL("../drizzle/0001_project_inquiries.sql", import.meta.url), "utf8");
const sql = postgres(connectionString, { max: 1, connect_timeout: 10, ssl: "require" });

try {
  await sql.unsafe(migration);
  console.log("Applied migration: 0001_project_inquiries.sql");
} finally {
  await sql.end({ timeout: 5 });
}
