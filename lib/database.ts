import "server-only";
import { neon } from "@neondatabase/serverless";
import { hashPassword } from "./admin-auth";
import { howItWorksTitle, howItWorksBody } from "./how-it-works";

let client: ReturnType<typeof neon> | null = null;
let initialized = false;

export const productSectionDefaults = [
  ["overview", "Automatic cleaning system", "A long, low-profile livestock trough designed to exchange water regularly and move settled waste through a protected discharge cycle.", "/product"],
  ["dimensions", "Realistic working proportions", "Approximate dimensions are 2000 mm long, 200 mm wide and 400 mm high. Final site measurements are confirmed before installation.", "/product#dimensions"],
  ["installation", "Site-reviewed installation", "Water supply, drainage, power, livestock access and service clearance are reviewed before installation.", "/product#installation"],
  ["valve", "Protected valve system", "Serviceable valve components manage refill and the selected automatic cleaning cycle.", "/downloads"],
  ["bluetooth", "Bluetooth controller", "Supported installations include controller setup information for scheduling, operation and service checks.", "/downloads"],
  ["downloads", "Current approved documents", "Access the product brochure, installation information, valve notes and Bluetooth controller resources.", "/downloads"],
  ["videos", "Product demonstrations", "Watch cleaning, installation, trial and dealer videos in the Wise Saturn video library.", "/videos"],
  ["how_it_works", howItWorksTitle, howItWorksBody, ""],
] as const;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  client ??= neon(url);
  return client;
}

export async function ensureDatabase() {
  if (initialized) return;
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS admin_users (id text PRIMARY KEY,username text UNIQUE NOT NULL,display_name text NOT NULL,role text NOT NULL CHECK (role IN ('super_admin','content_manager')),password_hash text NOT NULL,active boolean NOT NULL DEFAULT true,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS enquiries (id text PRIMARY KEY,type text NOT NULL CHECK (type IN ('customer','trial','dealer')),name text NOT NULL,email text NOT NULL,phone text NOT NULL,company text,location text,status text NOT NULL DEFAULT 'new',message text,details jsonb NOT NULL DEFAULT '{}'::jsonb,notes text NOT NULL DEFAULT '',created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS reference_number text`;
  await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS resend_message_id text`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference_number) WHERE reference_number IS NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_enquiries_type_status ON enquiries(type,status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC)`;
  await sql`CREATE TABLE IF NOT EXISTS content_items (id text PRIMARY KEY,type text NOT NULL,title text NOT NULL,slug text NOT NULL,summary text NOT NULL DEFAULT '',body text NOT NULL DEFAULT '',media_url text NOT NULL DEFAULT '',category text NOT NULL DEFAULT '',status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),sort_order integer NOT NULL DEFAULT 0,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now(),UNIQUE(type,slug))`;
  await sql`ALTER TABLE content_items DROP CONSTRAINT IF EXISTS content_items_type_check`;
  await sql`CREATE INDEX IF NOT EXISTS idx_content_type_status_sort ON content_items(type,status,sort_order)`;
  await sql`CREATE TABLE IF NOT EXISTS product_sections (key text PRIMARY KEY,title text NOT NULL,body text NOT NULL,media_url text NOT NULL DEFAULT '',sort_order integer NOT NULL DEFAULT 0,updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS site_settings (key text PRIMARY KEY,value text NOT NULL,updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS activity_log (id text PRIMARY KEY,username text NOT NULL,action text NOT NULL,entity_type text NOT NULL,entity_id text,created_at timestamptz NOT NULL DEFAULT now())`;

  const contentCount = await sql`SELECT count(*)::int AS count FROM content_items` as unknown as Array<{count:number}>;
  if (Number(contentCount[0]?.count ?? 0) === 0) {
    await sql`INSERT INTO content_items (id,type,title,slug,summary,media_url,category,status,sort_order) VALUES
      (${crypto.randomUUID()},'video','Wise Saturn Product Demonstration','product-demonstration','See the automatic self-cleaning trough in operation.','https://www.youtube.com/watch?v=2WqtQojcaEk','Overview','published',100),
      (${crypto.randomUUID()},'update','Three-Month Feedlot Trial Applications Open','trial-applications-open','Australian sheep feedlot operators can register interest in a supported Wise Saturn product trial.','','Support','published',100),
      (${crypto.randomUUID()},'download','Wise Saturn Product Brochure','product-brochure','Product overview and current system information.','/documents/brochures/wise-saturn-product-brochure.pdf','Brochure','published',100)`;
  }
  for (const [key,title,body,mediaUrl] of productSectionDefaults) await sql`INSERT INTO product_sections (key,title,body,media_url,sort_order) VALUES (${key},${title},${body},${mediaUrl},${productSectionDefaults.findIndex((item)=>item[0]===key)}) ON CONFLICT (key) DO NOTHING`;
  for (const [key,value] of [["public_email","peixing@hotmail.com"],["phone","0435 694 228"],["notification_email","peixing@hotmail.com"]] as const) await sql`INSERT INTO site_settings (key,value) VALUES (${key},${value}) ON CONFLICT (key) DO NOTHING`;
  initialized = true;
}

export async function ensureAdminUsers() {
  await ensureDatabase();
  const passwords = { admin:process.env.ADMIN_INITIAL_PASSWORD,david:process.env.DAVID_INITIAL_PASSWORD,nemo:process.env.NEMO_INITIAL_PASSWORD };
  if (!passwords.admin || !passwords.david || !passwords.nemo) throw new Error("Initial admin password environment variables are not configured");
  const sql=getSql();
  const existing=await sql`SELECT username FROM admin_users` as unknown as Array<{username:string}>;
  const usernames=new Set(existing.map((row)=>String(row.username)));
  for (const [username,displayName,role,password] of [["admin","Admin","super_admin",passwords.admin],["david","David","content_manager",passwords.david],["nemo","Nemo","content_manager",passwords.nemo]] as const) {
    if (!usernames.has(username)) await sql`INSERT INTO admin_users (id,username,display_name,role,password_hash) VALUES (${crypto.randomUUID()},${username},${displayName},${role},${hashPassword(password)})`;
  }
}
