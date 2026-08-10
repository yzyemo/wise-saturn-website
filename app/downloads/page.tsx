import type { Metadata } from "next";
import { getPublishedContent } from "@/lib/content";
import { BreadcrumbData } from "../components/StructuredData";
import { ArrowIcon } from "../components/Icons";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Downloads",description:"Wise Saturn brochure, installation, valve and Bluetooth controller downloads.",alternates:{canonical:"/downloads"}};
export default async function DownloadsPage(){const items=await getPublishedContent("download"),list=items.length?items:[{id:"brochure",category:"Brochure",title:"Wise Saturn Product Brochure",summary:"Product overview and current system information.",media_url:"/documents/brochures/wise-saturn-product-brochure.pdf"}];return <main className="inner-page"><BreadcrumbData items={[["Home","/"],["Downloads","/downloads"]]}/><section className="compact-hero page-shell"><div><span className="kicker">Downloads</span><h1>Product resources.</h1></div><p>Approved brochure, installation, valve and Bluetooth controller information.</p></section><section className="download-library page-shell">{list.map((item)=><a href={item.media_url} key={item.id} download={item.media_url.startsWith("/")}><div><span className="kicker">{item.category||"Resource"}</span><h2>{item.title}</h2><p>{item.summary}</p></div><ArrowIcon/></a>)}</section></main>}
