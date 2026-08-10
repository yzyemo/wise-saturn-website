import type { Metadata } from "next";
import { getPublishedContent } from "@/lib/content";
import { ArrowIcon } from "../components/Icons";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Downloads",description:"Download Wise Saturn brochures, manuals, valve information and Bluetooth controller resources.",alternates:{canonical:"/downloads"}};
export default async function DownloadsPage(){const items=await getPublishedContent("download"); const fallback=[{id:"brochure",category:"Brochure",title:"Wise Saturn Product Brochure",summary:"Product overview and current system information.",media_url:"/documents/brochures/wise-saturn-product-brochure.pdf"}]; const list=items.length?items:fallback; return <main className="inner-page editorial-page"><section className="page-hero page-shell"><div className="section-label light"><span>Downloads</span> Product resources</div><h1>Information<br/>to keep on hand.</h1><p>Brochures, installation notes, valve details, Bluetooth controller resources and manuals will be published here.</p></section><section className="download-list page-shell">{list.map((item)=><a href={item.media_url} key={item.id} download={item.media_url.startsWith("/")}><div><small>{item.category}</small><h2>{item.title}</h2><p>{item.summary}</p></div><ArrowIcon/></a>)}</section></main>}

