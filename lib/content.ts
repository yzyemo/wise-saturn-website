import "server-only";
import { ensureDatabase, getSql } from "./database";

export type ContentItem = { id:string; type:"video"|"update"|"download"; title:string; slug:string; summary:string; body:string; media_url:string; category:string; status:"draft"|"published"; sort_order:number; created_at:string };

export async function getPublishedContent(type: ContentItem["type"]): Promise<ContentItem[]> {
  try {
    await ensureDatabase();
    const rows = await getSql()`SELECT * FROM content_items WHERE type=${type} AND status='published' ORDER BY sort_order DESC,created_at DESC`;
    return rows as unknown as ContentItem[];
  } catch { return []; }
}

export function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0` : "";
}

