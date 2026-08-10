import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";
import "./responsive-fixes.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wisesaturn.com"),
  title: { default: "Wise Saturn | Self-Cleaning Sheep Water Trough", template: "%s | Wise Saturn" },
  description: "Automatic self-cleaning livestock water troughs. Watch the product demonstration, apply for a three-month trial or enquire about becoming a dealer.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_AU", siteName: "Wise Saturn", title: "Wise Saturn | Automatic Self-Cleaning Water Trough", description: "Watch the product, apply for a three-month trial or become a dealer.", images: [{ url: "/images/homepage/hero/wise-saturn-homepage-hero.png", width: 1672, height: 941, alt: "Wise Saturn automatic self-cleaning livestock water trough" }] },
  twitter: { card: "summary_large_image", title: "Wise Saturn | Automatic Self-Cleaning Water Trough", description: "Watch the product, apply for a three-month trial or become a dealer.", images: ["/images/homepage/hero/wise-saturn-homepage-hero.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Wise Saturn", url: "https://www.wisesaturn.com", logo: "https://www.wisesaturn.com/brand/logo/wise-saturn-logo-primary.png", email: "peixing@hotmail.com", telephone: "+61435694228", areaServed: "Australia", description: "Automatic self-cleaning livestock water troughs with trial and dealer programs.", sameAs:["https://www.youtube.com/watch?v=2WqtQojcaEk"] };
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}/><SiteHeader />{children}<SiteFooter /></body></html>;
}
