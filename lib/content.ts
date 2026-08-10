import "server-only";
import { ensureDatabase, getSql, productSectionDefaults } from "./database";

export type ContentItem={id:string;type:"video"|"update"|"download"|"photo";title:string;slug:string;summary:string;body:string;media_url:string;category:string;status:"draft"|"published";sort_order:number;created_at:string};
export type ProductSection={key:string;title:string;body:string;media_url:string;sort_order:number};
export async function getPublishedContent(type:ContentItem["type"]):Promise<ContentItem[]>{try{await ensureDatabase();return await getSql()`SELECT * FROM content_items WHERE type=${type} AND status='published' ORDER BY sort_order DESC,created_at DESC` as unknown as ContentItem[]}catch{return[]}}
export async function getProductSections():Promise<ProductSection[]>{try{await ensureDatabase();return await getSql()`SELECT key,title,body,media_url,sort_order FROM product_sections ORDER BY sort_order` as unknown as ProductSection[]}catch{return productSectionDefaults.map(([key,title,body,media_url],sort_order)=>({key,title,body,media_url,sort_order}))}}
export async function getSiteSettings(){const fallback={public_email:"peixing@hotmail.com",phone:"0435 694 228",notification_email:"peixing@hotmail.com"};try{await ensureDatabase();const rows=await getSql()`SELECT key,value FROM site_settings` as unknown as Array<{key:string;value:string}>;return{...fallback,...Object.fromEntries(rows.map((row)=>[row.key,row.value]))}}catch{return fallback}}
export function youtubeEmbed(url:string){const match=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);return match?`https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`:""}
