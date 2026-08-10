import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "Blob storage is not configured" }, { status: 503 });

  try {
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({
      token,
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const safe = pathname.replace(/[^a-zA-Z0-9._/-]/g, "-").slice(0, 180);
        return {
          allowedContentTypes: [
            "video/mp4",
            "video/webm",
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
            "application/zip",
            "text/plain",
          ],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ username: session.username, pathname: safe }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Admin upload failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Upload failed" }, { status: 400 });
  }
}
