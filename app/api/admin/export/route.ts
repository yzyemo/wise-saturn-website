import { sessionFromRequest } from "@/lib/admin-auth";
import { ensureDatabase, getSql } from "@/lib/database";

function csv(value: unknown) { return `"${String(value ?? "").replaceAll('"','""')}"`; }
export async function GET(request: Request) {
  if (!sessionFromRequest(request)) return new Response("Unauthorized", { status: 401 });
  await ensureDatabase();
  const rows = await getSql()`SELECT * FROM enquiries ORDER BY created_at DESC` as unknown as Array<Record<string,unknown>>;
  const headers = ["id","type","name","email","phone","company","location","status","message","notes","details","created_at"];
  const lines = [headers.map(csv).join(","), ...rows.map((row) => headers.map((key) => csv(key === "details" ? JSON.stringify(row[key]) : row[key])).join(","))];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=wise-saturn-enquiries.csv" } });
}
