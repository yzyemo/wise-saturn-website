import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { ensureDatabase, getSql } from "@/lib/database";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function isRateLimited(ip: string) { const now=Date.now(); const current=attempts.get(ip); if(!current||current.resetAt<=now){attempts.set(ip,{count:1,resetAt:now+WINDOW_MS});return false} current.count+=1; return current.count>MAX_REQUESTS; }

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  try {
    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const type = ["customer","trial","dealer"].includes(body.type) ? body.type as "customer"|"trial"|"dealer" : "customer";
    const name=clean(body.name,100), company=clean(body.company,150), phone=clean(body.phone,50), email=clean(body.email,254).toLowerCase(), location=clean(body.location,160), message=clean(body.message,5000);
    if (!name || !phone || !location || (type === "dealer" && !company) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    const details = { livestock:clean(body.livestock,120), headCount:clean(body.headCount,20), currentWatering:clean(body.currentWatering,200), preferredTrialTime:clean(body.preferredTrialTime,120), cleaningMethod:clean(body.cleaningMethod,240), interestedQuantity:clean(body.interestedQuantity,20), salesExperience:clean(body.salesExperience,240), annualVolume:clean(body.annualVolume,20), firstOrder:clean(body.firstOrder,20), warehouse:clean(body.warehouse,20) };
    await ensureDatabase();
    const id = crypto.randomUUID();
    await getSql()`INSERT INTO enquiries (id,type,name,email,phone,company,location,message,details) VALUES (${id},${type},${name},${email},${phone},${company},${location},${message},${JSON.stringify(details)}::jsonb)`;
    try { const { error } = await getResend().emails.send({ from:"Wise Saturn Website <website@wisesaturn.com>",to:["peixing@hotmail.com"],subject:`New Wise Saturn ${type} enquiry`,text:`A new ${type} enquiry has been stored in the Wise Saturn admin system.\n\nRecord ID: ${id}\n\nLog in to the admin area to review it.` }); if(error) console.error("Resend notification error",error.name); } catch (error) { console.error("Enquiry stored but notification failed",error instanceof Error?error.message:"Unknown error"); }
    return NextResponse.json({ ok:true,id });
  } catch (error) { console.error("Contact form error",error instanceof Error?error.message:"Unknown error"); return NextResponse.json({ error:"Unable to process request" },{status:500}); }
}
