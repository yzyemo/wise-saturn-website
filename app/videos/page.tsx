import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PlayIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Videos", description: "Watch the Wise Saturn livestock water trough in action." };

const future = ["Cleaning Cycle", "Cattle Installation", "Sheep Installation", "Customer Trial"];

export default function VideosPage() {
  return <main className="inner-page videos-page">
    <section className="page-hero page-shell"><div className="section-label"><span>Videos</span> Product demonstrations</div><h1>Watch the Product<br/>in Action</h1><p>See the Wise Saturn livestock water trough and learn how the system fits into farm operations.</p></section>
    <section className="video-section page-shell"><div className="video-tabs" role="tablist" aria-label="Video categories"><button className="active" role="tab" aria-selected="true">Product Overview</button>{future.map(x=><button key={x} role="tab" aria-selected="false" disabled>{x}<small>Coming Soon</small></button>)}</div><div className="video-frame"><iframe src="https://www.youtube.com/embed/2WqtQojcaEk?rel=0" title="Watch the Wise Saturn product in action" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="video-caption"><div><span>01</span><h2>Product Overview</h2></div><a href="https://www.youtube.com/watch?v=2WqtQojcaEk" target="_blank" rel="noreferrer">Open on YouTube <ArrowIcon/></a></div></section>
    <section className="upcoming page-shell"><div><PlayIcon/><span>More field videos will be added as they become available.</span></div><Link href="/contact">Ask a product question <ArrowIcon/></Link></section>
  </main>;
}

