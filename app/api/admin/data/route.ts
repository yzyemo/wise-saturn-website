import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/admin-auth";
import { ensureDatabase, getSql } from "@/lib/database";

function clean(value: unknown, max = 5000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 100); }

export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const sql = getSql();
  const resource = new URL(request.url).searchParams.get("resource");
  if (resource === "enquiries") return NextResponse.json({ items: await sql`SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500` });
  if (resource === "content") return NextResponse.json({ items: await sql`SELECT * FROM content_items ORDER BY type,sort_order DESC,updated_at DESC` });
  if (resource === "users" && session.role === "super_admin") return NextResponse.json({ items: await sql`SELECT id,username,display_name,role,active,created_at FROM admin_users ORDER BY created_at` });
  if (resource === "activity" && session.role === "super_admin") return NextResponse.json({ items: await sql`SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 100` });
  return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
}

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const sql = getSql();
  const body = await request.json();
  if (body.resource !== "content") return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
  const type = clean(body.type, 20);
  const title = clean(body.title, 160);
  if (!title || !["video", "update", "download"].includes(type)) return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  const id = crypto.randomUUID();
  const slug = slugify(clean(body.slug, 100) || title) || id;
  await sql`INSERT INTO content_items (id,type,title,slug,summary,body,media_url,category,status,sort_order)
    VALUES (${id},${type},${title},${slug},${clean(body.summary,500)},${clean(body.body)},${clean(body.media_url,1000)},${clean(body.category,80)},${body.status === "published" ? "published" : "draft"},${Number(body.sort_order) || 0})`;
  await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'create',${type},${id})`;
  return NextResponse.json({ ok: true, id });
}

export async function PATCH(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const sql = getSql();
  const body = await request.json();
  const id = clean(body.id, 100);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (body.resource === "enquiry") {
    await sql`UPDATE enquiries SET status=${clean(body.status,40) || "new"},notes=${clean(body.notes)},updated_at=now() WHERE id=${id}`;
    await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'update','enquiry',${id})`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "content") {
    const title = clean(body.title, 160);
    await sql`UPDATE content_items SET title=${title},slug=${slugify(clean(body.slug,100) || title)},summary=${clean(body.summary,500)},body=${clean(body.body)},media_url=${clean(body.media_url,1000)},category=${clean(body.category,80)},status=${body.status === "published" ? "published" : "draft"},sort_order=${Number(body.sort_order) || 0},updated_at=now() WHERE id=${id}`;
    await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'update','content',${id})`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "user" && session.role === "super_admin") {
    await sql`UPDATE admin_users SET active=${Boolean(body.active)},updated_at=now() WHERE id=${id}`;
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
}

export async function DELETE(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const id = clean(new URL(request.url).searchParams.get("id"), 100);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const sql = getSql();
  await sql`DELETE FROM content_items WHERE id=${id}`;
  await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'delete','content',${id})`;
  return NextResponse.json({ ok: true });
}

