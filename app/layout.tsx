import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://wise-saturn-website-eight.vercel.app"),
  title: { default: "Wise Saturn | Self-Cleaning Livestock Water Troughs", template: "%s | Wise Saturn" },
  description: "Automatic self-cleaning livestock water troughs for Australian cattle and sheep operations.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_AU", siteName: "Wise Saturn", title: "Wise Saturn | Self-Cleaning Livestock Water Troughs", description: "Cleaner livestock water with less maintenance for Australian cattle and sheep farms.", images: [{ url: "/images/homepage/hero/wise-saturn-homepage-hero.png", width: 1920, height: 1080, alt: "Wise Saturn trough on an Australian farm" }] },
  twitter: { card: "summary_large_image", title: "Wise Saturn | Self-Cleaning Livestock Water Troughs", description: "Cleaner livestock water with less maintenance for Australian cattle and sheep farms.", images: ["/images/homepage/hero/wise-saturn-homepage-hero.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Wise Saturn", url: "https://wise-saturn-website-eight.vercel.app", logo: "https://wise-saturn-website-eight.vercel.app/brand/logo/wise-saturn-logo-primary.png", email: "peixing@hotmail.com", telephone: "+61435694228", areaServed: "Australia", description: "Automatic self-cleaning livestock water troughs for Australian cattle and sheep farms." };
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}/><SiteHeader />{children}<SiteFooter /></body></html>;
}
