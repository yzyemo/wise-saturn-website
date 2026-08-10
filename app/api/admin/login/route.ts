import { NextResponse } from "next/server";
import { createSessionToken, verifyPassword } from "@/lib/admin-auth";
import { ensureAdminUsers, getSql } from "@/lib/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase().slice(0, 50) : "";
    const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
    if (!username || !password) return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    await ensureAdminUsers();
    const sql = getSql();
    const rows = await sql`SELECT id,username,role,password_hash,active FROM admin_users WHERE username=${username} LIMIT 1` as unknown as Array<{id:string;username:string;role:string;password_hash:string;active:boolean}>;
    const user = rows[0];
    if (!user || !user.active || !verifyPassword(password, String(user.password_hash))) return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    const token = createSessionToken({ sub: String(user.id), username: String(user.username), role: user.role as "super_admin" | "content_manager" });
    await sql`INSERT INTO activity_log (id,username,action,entity_type) VALUES (${crypto.randomUUID()},${username},'login','session')`;
    const response = NextResponse.json({ ok: true, username, role: user.role });
    response.cookies.set("ws_admin_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch (error) {
    console.error("Admin login failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Admin service is not configured" }, { status: 503 });
  }
}
