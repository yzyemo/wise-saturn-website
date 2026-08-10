import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/admin-auth";
export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  return session ? NextResponse.json({ authenticated: true, session }) : NextResponse.json({ authenticated: false }, { status: 401 });
}

