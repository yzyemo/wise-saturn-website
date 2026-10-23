import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedContent } from "@/lib/content";
import { BreadcrumbData } from "../../components/StructuredData";
import "./style.css";

const slug = "saturn-trough-2026-nab-agribusiness-award-excellence";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "2026 NAB Agribusiness Award of Excellence",
  description: "Wisepac Australia received the 2026 NAB Agribusiness Award of Excellence at Australian National Field Days for the Saturn Smart Livestock Water System.",
  alternates: { canonical: `/updates/${slug}` },
  openGraph: { images: ["/images/news/anfd-2026-445.webp"] },
};
const photos = [
  ["444", "The 2026 NAB Agribusiness Award of Excellence certificate presented to Wisepac Australia."],
  ["443", "Award presentation at Australian National Field Days."],
  ["446", "Visitors discuss the Saturn system at the field days."],
  ["447", "A conversation at the Saturn exhibition display."],
  ["448", "A discussion beside the Saturn trough at the field days."],
  ["449", "Saturn livestock water system on display at the field days."],
  ["450", "The Saturn exhibition at Australian National Field Days."],
  ["451", "The Saturn display and award certificate at the field days."],
  ["452", "Two people beside the Saturn display at the field days."],
  ["453", "A presenter beside the Saturn display and award certificate."],
  ["454", "Another view of the presenter and Saturn field days display."],
  ["455", "Field days display with annotated dimensions and two mounted riders in the background."],
];
export default async function AwardArticle() {
  const item = (await getPublishedContent("update")).find(entry => entry.slug === slug);
  if (!item) notFound();
  return <main className="inner-page"><BreadcrumbData items={[["Home", "/"], ["News", "/updates"], ["Award of Excellence", `/updates/${slug}`]]}/>
    <article className="page-shell award-article"><Link href="/updates" className="inline-link">← All news</Link><span className="kicker">{item.category} · 23 October 2026</span><h1>{item.title}</h1>
      <figure><Image src="/images/news/anfd-2026-445.webp" alt="Saturn livestock water system displayed at Australian National Field Days" width={1800} height={1350} sizes="(max-width: 800px) 100vw, 1100px" priority/><figcaption>Saturn at the 2026 Australian National Field Days.</figcaption></figure>
      <div className="award-copy">{item.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index)=><p key={index}>{paragraph}</p>)}<p><Link className="inline-link" href="/product">See how it works →</Link>　<Link className="inline-link" href="/contact?type=trial">Apply for a 3-month trial →</Link></p><p>Sources: <a href="https://anfd.com.au/">Australian National Field Days</a>; <a href="https://www.nsw.gov.au/visiting-and-exploring-nsw/nsw-events/australian-national-field-days-0">NSW Government</a>; supplied award certificate and photographs.</p></div>
      <div className="award-gallery">{photos.map(([id, caption])=><figure key={id}><Image src={`/images/news/anfd-2026-${id}.webp`} alt={caption} width={1800} height={1350} sizes="(max-width: 800px) 100vw, 50vw"/><figcaption>{caption}</figcaption></figure>)}</div>
    </article></main>;
}
