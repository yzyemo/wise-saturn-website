import "server-only";
import { neon } from "@neondatabase/serverless";
import { hashPassword } from "./admin-auth";

let client: ReturnType<typeof neon> | null = null;
let initialized = false;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  client ??= neon(url);
  return client;
}

export async function ensureDatabase() {
  if (initialized) return;
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS admin_users (
    id text PRIMARY KEY,
    username text UNIQUE NOT NULL,
    display_name text NOT NULL,
    role text NOT NULL CHECK (role IN ('super_admin','content_manager')),
    password_hash text NOT NULL,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS enquiries (
    id text PRIMARY KEY,
    type text NOT NULL CHECK (type IN ('customer','trial','dealer')),
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    company text,
    location text,
    status text NOT NULL DEFAULT 'new',
    message text,
    details jsonb NOT NULL DEFAULT '{}'::jsonb,
    notes text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE INDEX IF NOT EXISTS idx_enquiries_type_status ON enquiries(type,status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC)`;
  await sql`CREATE TABLE IF NOT EXISTS content_items (
    id text PRIMARY KEY,
    type text NOT NULL CHECK (type IN ('video','update','download')),
    title text NOT NULL,
    slug text NOT NULL,
    summary text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    media_url text NOT NULL DEFAULT '',
    category text NOT NULL DEFAULT '',
    status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(type,slug)
  )`;
  await sql`CREATE INDEX IF NOT EXISTS idx_content_type_status_sort ON content_items(type,status,sort_order)`;
  await sql`CREATE TABLE IF NOT EXISTS activity_log (
    id text PRIMARY KEY,
    username text NOT NULL,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;

  const contentCount = await sql`SELECT count(*)::int AS count FROM content_items` as unknown as Array<{count:number}>;
  if (Number(contentCount[0]?.count ?? 0) === 0) {
    await sql`INSERT INTO content_items (id,type,title,slug,summary,media_url,category,status,sort_order) VALUES
      (${crypto.randomUUID()},'video','Wise Saturn Product Demonstration','product-demonstration','See the automatic self-cleaning trough in operation.','https://www.youtube.com/watch?v=2WqtQojcaEk','Overview','published',10),
      (${crypto.randomUUID()},'update','Three-Month Feedlot Trial Applications Open','trial-applications-open','Australian sheep feedlot operators can register interest in a supported three-month product trial.','','Trial','published',10),
      (${crypto.randomUUID()},'download','Wise Saturn Product Brochure','product-brochure','Product overview and current system information.','/documents/brochures/wise-saturn-product-brochure.pdf','Brochure','published',10)`;
  }
  initialized = true;
}

export async function ensureAdminUsers() {
  await ensureDatabase();
  const passwords = {
    admin: process.env.ADMIN_INITIAL_PASSWORD,
    david: process.env.DAVID_INITIAL_PASSWORD,
    nemo: process.env.NEMO_INITIAL_PASSWORD,
  };
  if (!passwords.admin || !passwords.david || !passwords.nemo) {
    throw new Error("Initial admin password environment variables are not configured");
  }
  const sql = getSql();
  const existing = await sql`SELECT username FROM admin_users` as unknown as Array<{username:string}>;
  const usernames = new Set(existing.map((row) => String(row.username)));
  const seeds = [
    ["admin", "Admin", "super_admin", passwords.admin],
    ["david", "David", "content_manager", passwords.david],
    ["nemo", "Nemo", "content_manager", passwords.nemo],
  ] as const;
  for (const [username, displayName, role, password] of seeds) {
    if (!usernames.has(username)) {
      await sql`INSERT INTO admin_users (id,username,display_name,role,password_hash)
        VALUES (${crypto.randomUUID()},${username},${displayName},${role},${hashPassword(password)})`;
    }
  }
}
