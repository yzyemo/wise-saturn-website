import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedContent } from "@/lib/content";
import { ArrowIcon } from "../components/Icons";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Updates",description:"Wise Saturn trial, dealer, exhibition, product and media updates.",alternates:{canonical:"/updates"}};
export default async function UpdatesPage(){const items=await getPublishedContent("update"); const fallback=[{id:"trial",category:"Trial",title:"Three-Month Feedlot Trial Applications Open",summary:"Australian sheep feedlot operators can register interest in a supported Wise Saturn product trial.",created_at:"2026-08-10"}]; const list=items.length?items:fallback; return <main className="inner-page editorial-page"><section className="page-hero page-shell"><div className="section-label light"><span>Updates</span> Field notes and company news</div><h1>What&apos;s happening<br/>at Wise Saturn.</h1><p>Trial farms, dealer news, exhibitions, awards, customer stories and product developments in one place.</p></section><section className="editorial-list page-shell">{list.map((item,index)=><article key={item.id}><div><span>{String(index+1).padStart(2,"0")}</span><small>{item.category}</small></div><h2>{item.title}</h2><p>{item.summary}</p></article>)}</section><section className="contact-strip page-shell"><p>Want the next update directly?</p><Link href="/contact">Contact Wise Saturn <ArrowIcon/></Link></section></main>}

