import type { MetadataRoute } from "next";
const routes = ["", "/product", "/technology", "/videos", "/about", "/contact", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(route => ({ url: `https://wise-saturn-website-eight.vercel.app${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .8 })); }
