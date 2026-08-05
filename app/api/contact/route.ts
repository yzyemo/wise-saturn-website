import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) { attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  try {
    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const name = clean(body.name, 100);
    const company = clean(body.company, 150);
    const phone = clean(body.phone, 50);
    const email = clean(body.email, 254).toLowerCase();
    const message = clean(body.message, 5000);
    if (!name || !phone || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    const submissionTime = new Date().toISOString();
    const text = [`Name: ${name}`, `Company / Farm: ${company || "Not provided"}`, `Phone: ${phone}`, `Email: ${email}`, "", "Message:", message, "", `Submission Time: ${submissionTime}`].join("\n");
    const { error } = await getResend().emails.send({ from: "Wise Saturn Website <website@wisesaturn.com>", to: ["peixing@hotmail.com"], replyTo: email, subject: "New Wise Saturn Website Enquiry", text });
    if (error) { console.error("Resend contact form error", error.name); return NextResponse.json({ error: "Delivery failed" }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}
