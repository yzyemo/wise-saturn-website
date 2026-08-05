import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, PlayIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Videos", description: "Watch the Wise Saturn product overview, cleaning cycle, installations and customer trials.", alternates: { canonical: "/videos" } };

const upcomingVideos = [
  ["01", "Cleaning Cycle", "A closer look at the automatic cleaning sequence."],
  ["02", "Cattle Installation", "The Wise Saturn trough in a cattle operation."],
  ["03", "Sheep Installation", "Water access and trough use for sheep."],
  ["04", "Customer Trial", "Field observations from an operating property."],
];

export default function VideosPage() {
  return <main className="inner-page videos-page videos-showcase-page">
    <section className="videos-overview">
      <div className="videos-overview-copy">
        <div className="section-label light"><span>Videos</span> Product demonstrations</div>
        <h1>Watch the Product<br/>in Action.</h1>
        <p>See the Wise Saturn livestock water trough and learn how the system fits into practical farm operations.</p>
        <a className="button button-white dark-text" href="#featured-video"><PlayIcon /> Watch Video</a>
      </div>
      <div className="videos-overview-image"><Image src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn water trough with livestock on an Australian farm" width={1920} height={1080} sizes="(max-width: 1040px) 100vw, 62vw" /></div>
    </section>

    <section className="videos-featured page-shell" id="featured-video">
      <div className="section-label"><span>01</span> Featured Video</div>
      <div className="videos-heading"><h2>Product Overview.</h2><p>An introduction to the Wise Saturn trough, its working form and its place in livestock operations.</p></div>
      <div className="videos-player"><iframe src="https://www.youtube.com/embed/2WqtQojcaEk?rel=0" title="Watch the Wise Saturn product in action" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
      <div className="videos-player-caption"><div><span>01</span><h3>Wise Saturn Product Overview</h3></div><a href="https://www.youtube.com/watch?v=2WqtQojcaEk" target="_blank" rel="noreferrer">Open on YouTube <ArrowIcon /></a></div>
    </section>

    <section className="videos-library">
      <div className="page-shell">
        <div className="section-label light"><span>02</span> Field Video Library</div>
        <div className="videos-heading light"><h2>More from the field.</h2><p>Additional demonstrations and installation videos will be added as they become available.</p></div>
        <div className="videos-library-grid">{upcomingVideos.map(([number, title, text]) => <article key={title}><div className="library-video"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/2WqtQojcaEk?rel=0" title={`${title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><small>Video {number}</small><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="videos-bottom-cta page-shell"><p>Have a question about the product?</p><Link className="button button-dark" href="/contact">Contact Us <ArrowIcon /></Link></section>
  </main>;
}
