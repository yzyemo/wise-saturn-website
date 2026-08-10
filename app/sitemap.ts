import type { MetadataRoute } from "next";
const routes = ["", "/product", "/trial", "/videos", "/updates", "/downloads", "/about", "/contact", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(route => ({ url: `https://www.wisesaturn.com${route}`, lastModified: new Date(), changeFrequency: route === "" || route === "/updates" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/product" || route === "/trial" ? .9 : .7 })); }
