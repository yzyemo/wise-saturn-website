import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, FarmIcon, FlowIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = { title: "About", description: "Wise Saturn is an Australian livestock water technology company focused on practical, patent-pending innovation.", alternates: { canonical: "/about" } };

const principles = [
  { number: "01", title: "Australian Designed", text: "Developed around Australian weather, livestock and farm routines.", icon: <FarmIcon /> },
  { number: "02", title: "Patent Pending", text: "A focused self-cleaning approach developed to improve trough upkeep.", icon: <ShieldIcon /> },
  { number: "03", title: "Cattle & Sheep Farms", text: "Purpose-built for Australian cattle and sheep operations.", icon: <WaterIcon /> },
  { number: "04", title: "Reliable & Low Maintenance", text: "Protected components and straightforward servicing support dependable use.", icon: <FlowIcon /> },
];

export default function AboutPage() {
  return <main className="inner-page about-page-complete">
    <section className="about-overview">
      <div className="about-overview-copy"><div className="section-label light"><span>About</span> Wise Saturn Australia</div><h1>Practical Innovation<br/>for Australian Farms.</h1><p>Wise Saturn is an Australian livestock water systems company focused on improving one essential piece of farm infrastructure: the water trough.</p></div>
      <div className="about-overview-image"><Image src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn livestock water trough on an Australian farm" width={1920} height={1080} sizes="(max-width: 1040px) 100vw, 58vw" /></div>
    </section>
    <section className="about-introduction page-shell"><div><span className="overline">Company Introduction</span><h2>A clear problem.<br/>A practical response.</h2></div><div><p className="large-copy">Livestock water troughs are essential, but keeping them clean can require repetitive work across a property.</p><p>Wise Saturn applies straightforward product thinking to that routine. The automatic self-cleaning trough is designed to support cleaner drinking water while reducing the maintenance burden for cattle and sheep operations.</p></div></section>
    <section className="about-principles page-shell"><div className="section-label"><span>01</span> What Guides Us</div><div className="about-principle-grid">{principles.map(item => <article key={item.number}><div>{item.icon}<span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-focus page-shell"><div><div className="section-label"><span>02</span> Industry Focus</div><h2>Built for livestock<br/>water management.</h2></div><div><p>Wise Saturn concentrates on cattle and sheep operations where dependable water infrastructure and efficient property maintenance matter every day.</p><h3>Why choose Wise Saturn</h3><ul><li>Patent-pending self-cleaning technology</li><li>Australian product development</li><li>Focused cattle and sheep application</li><li>Direct product and installation support</li></ul></div></section>
    <section className="about-vision"><div className="page-shell"><div className="section-label light"><span>03</span> Looking Ahead</div><div className="about-vision-layout"><h2>Better water systems.<br/>Built around the farm.</h2><p>Our direction remains focused: develop practical technology that makes livestock water management more consistent, less labour-intensive and easier to maintain over time.</p></div></div></section>
    <section className="about-bottom-cta page-shell"><h2>Talk Directly with<br/>Wise Saturn Australia.</h2><Link className="button button-dark" href="/contact">Contact Us <ArrowIcon /></Link></section>
  </main>;
}
