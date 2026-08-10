import { NextResponse } from "next/server";
import { hashPassword, sessionFromRequest, verifyPassword } from "@/lib/admin-auth";
import { ensureDatabase, getSql } from "@/lib/database";

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
    if (newPassword.length < 12 || newPassword.length > 200) return NextResponse.json({ error: "New password must be at least 12 characters." }, { status: 400 });
    if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/\d/.test(newPassword)) return NextResponse.json({ error: "Use uppercase, lowercase and a number." }, { status: 400 });
    if (currentPassword === newPassword) return NextResponse.json({ error: "Choose a different password." }, { status: 400 });
    await ensureDatabase();
    const sql = getSql();
    const rows = await sql`SELECT password_hash FROM admin_users WHERE id=${session.sub} AND active=true LIMIT 1` as unknown as Array<{ password_hash: string }>;
    if (!rows[0] || !verifyPassword(currentPassword, rows[0].password_hash)) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    await sql`UPDATE admin_users SET password_hash=${hashPassword(newPassword)},updated_at=now() WHERE id=${session.sub}`;
    await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'change_password','admin_user',${session.sub})`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Password change failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Unable to change password." }, { status: 500 });
  }
}
