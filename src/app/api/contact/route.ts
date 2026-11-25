import { NextResponse } from "next/server";
import postgres from "postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const submissionWindows = new Map<string, { count: number; resetAt: number }>();
let database: ReturnType<typeof postgres> | null = null;

function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Contact storage is not configured");
  database ??= postgres(connectionString, { max: 1, idle_timeout: 20, connect_timeout: 10, ssl: "require" });
  return database;
}

function limited(key: string) {
  const now = Date.now();
  const current = submissionWindows.get(key);
  if (!current || now > current.resetAt) {
    submissionWindows.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return jsonError("Too many inquiries. Please try again later.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("The request could not be read.", 400);
  }

  if (!body || typeof body !== "object") return jsonError("Please check the form and try again.", 400);
  const values = body as Record<string, unknown>;
  if (typeof values.website === "string" && values.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
  const service = typeof values.service === "string" ? values.service : "";
  const message = typeof values.message === "string" ? values.message.trim() : "";
  const allowedServices = new Set(["web", "apps", "saas", "other"]);

  if (name.length < 2 || name.length > 100) return jsonError("Please enter a name between 2 and 100 characters.", 400);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("Please enter a valid email address.", 400);
  if (!allowedServices.has(service)) return jsonError("Please choose a project type.", 400);
  if (message.length < 20 || message.length > 4000) return jsonError("Your note must be between 20 and 4,000 characters.", 400);

  try {
    const sql = getDatabase();
    await sql`
      INSERT INTO project_inquiries (name, email, service, message, source)
      VALUES (${name}, ${email}, ${service}, ${message}, 'landing_phantoms')
    `;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("[contact] Inquiry could not be stored.");
    return jsonError("We couldn’t save your inquiry right now. Please try again later.", 503);
  }
}
