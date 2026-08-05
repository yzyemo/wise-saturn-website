import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://wise-saturn-website-eight.vercel.app/sitemap.xml" }; }
