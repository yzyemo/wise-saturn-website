import { del } from "@vercel/blob";
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
  if (resource === "dashboard") {
    const [enquiries, content, userRows, recent] = await Promise.all([
      sql`SELECT type,count(*)::int AS count FROM enquiries GROUP BY type`,
      sql`SELECT type,count(*)::int AS count FROM content_items GROUP BY type`,
      sql`SELECT count(*)::int AS count FROM admin_users WHERE active=true`,
      sql`SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 8`,
    ]);
    const users = userRows as unknown as Array<{ count: number }>;
    return NextResponse.json({ enquiries, content, users: Number(users[0]?.count ?? 0), recent });
  }
  if (resource === "enquiries") return NextResponse.json({ items: await sql`SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500` });
  if (resource === "content") return NextResponse.json({ items: await sql`SELECT * FROM content_items ORDER BY type,sort_order DESC,updated_at DESC` });
  if (resource === "products") return NextResponse.json({ items: await sql`SELECT * FROM product_sections ORDER BY sort_order` });
  if (resource === "settings" && session.role === "super_admin") return NextResponse.json({ items: await sql`SELECT key,value,updated_at FROM site_settings ORDER BY key` });
  if (resource === "users" && session.role === "super_admin") return NextResponse.json({ items: await sql`SELECT id,username,display_name,role,active,created_at FROM admin_users ORDER BY created_at` });
  return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
}

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const sql = getSql();
  const body = await request.json();
  if (body.resource !== "content") return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
  const type = clean(body.type, 20), title = clean(body.title, 160);
  if (!title || !["video", "update", "download", "photo"].includes(type)) return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  const id = crypto.randomUUID(), slug = slugify(clean(body.slug, 100) || title) || id;
  await sql`INSERT INTO content_items (id,type,title,slug,summary,body,media_url,category,status,sort_order) VALUES (${id},${type},${title},${slug},${clean(body.summary,500)},${clean(body.body)},${clean(body.media_url,1000)},${clean(body.category,80)},${body.status === "published" ? "published" : "draft"},${Number(body.sort_order) || 0})`;
  await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'create',${type},${id})`;
  return NextResponse.json({ ok: true, id });
}

export async function PATCH(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const sql = getSql(), body = await request.json(), id = clean(body.id, 100);
  if (body.resource === "enquiry" && id) {
    await sql`UPDATE enquiries SET status=${clean(body.status,40) || "new"},notes=${clean(body.notes)},updated_at=now() WHERE id=${id}`;
    await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'update','enquiry',${id})`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "content" && id) {
    const title = clean(body.title, 160);
    const existing = await sql`SELECT slug FROM content_items WHERE id=${id} LIMIT 1` as unknown as Array<{slug:string}>;
    await sql`UPDATE content_items SET title=${title},slug=${slugify(clean(body.slug,100) || existing[0]?.slug || title)},summary=${clean(body.summary,500)},body=${clean(body.body)},media_url=${clean(body.media_url,1000)},category=${clean(body.category,80)},status=${body.status === "published" ? "published" : "draft"},sort_order=${Number(body.sort_order) || 0},updated_at=now() WHERE id=${id}`;
    await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'update','content',${id})`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "product" && id) {
    await sql`UPDATE product_sections SET title=${clean(body.title,160)},body=${clean(body.body)},media_url=${clean(body.media_url,1000)},updated_at=now() WHERE key=${id}`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "user" && id && session.role === "super_admin") {
    await sql`UPDATE admin_users SET active=${Boolean(body.active)},updated_at=now() WHERE id=${id}`;
    return NextResponse.json({ ok: true });
  }
  if (body.resource === "settings" && session.role === "super_admin") {
    for (const [key, value] of Object.entries(body.values ?? {})) await sql`INSERT INTO site_settings (key,value) VALUES (${clean(key,80)},${clean(value,500)}) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value,updated_at=now()`;
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
  const sql = getSql(), rows = await sql`SELECT media_url FROM content_items WHERE id=${id} LIMIT 1` as unknown as Array<{media_url:string}>;
  await sql`DELETE FROM content_items WHERE id=${id}`;
  const mediaUrl = rows[0]?.media_url ?? "";
  if (mediaUrl.includes(".blob.vercel-storage.com")) try {
    await del(mediaUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch (error) {
    console.error("Blob cleanup failed", error instanceof Error ? error.message : "Unknown error");
  }
  await sql`INSERT INTO activity_log (id,username,action,entity_type,entity_id) VALUES (${crypto.randomUUID()},${session.username},'delete','content',${id})`;
  return NextResponse.json({ ok: true });
}
