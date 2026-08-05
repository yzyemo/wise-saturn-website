import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, FarmIcon, FlowIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = { title: "About", description: "About Wise Saturn and its practical approach to livestock water systems." };

const principles = [
  { number: "01", title: "Australian Innovation", text: "Developing practical livestock water systems around Australian farm conditions.", icon: <FarmIcon /> },
  { number: "02", title: "Our Mission", text: "Support cleaner livestock water with less repetitive trough maintenance.", icon: <WaterIcon /> },
  { number: "03", title: "Quality", text: "Keep the product purposeful, understandable and suited to daily use.", icon: <ShieldIcon /> },
  { number: "04", title: "Future Vision", text: "Continue improving livestock water infrastructure through focused innovation.", icon: <FlowIcon /> },
];

export default function AboutPage() {
  return <main className="inner-page about-page-complete">
    <section className="about-overview">
      <div className="about-overview-copy"><div className="section-label light"><span>About</span> Wise Saturn Australia</div><h1>Practical Innovation<br/>for Australian Farms.</h1><p>Wise Saturn is an Australian livestock water systems company focused on improving one essential piece of farm infrastructure: the water trough.</p></div>
      <div className="about-overview-image"><img src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn livestock water trough on an Australian farm" /></div>
    </section>
    <section className="about-introduction page-shell"><div><span className="overline">Company Introduction</span><h2>A clear problem.<br/>A practical response.</h2></div><div><p className="large-copy">Livestock water troughs are essential, but keeping them clean can require repetitive work across a property.</p><p>Wise Saturn applies straightforward product thinking to that routine. The automatic self-cleaning trough is designed to support cleaner drinking water while reducing the maintenance burden for cattle and sheep operations.</p></div></section>
    <section className="about-principles page-shell"><div className="section-label"><span>01</span> What Guides Us</div><div className="about-principle-grid">{principles.map(item => <article key={item.number}><div>{item.icon}<span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-vision"><div className="page-shell"><div className="section-label light"><span>02</span> Looking Ahead</div><div className="about-vision-layout"><h2>Better water systems.<br/>Built around the farm.</h2><p>Our direction remains focused: develop practical technology that makes livestock water management more consistent, less labour-intensive and easier to maintain over time.</p></div></div></section>
    <section className="about-bottom-cta page-shell"><h2>Talk Directly with<br/>Wise Saturn Australia.</h2><Link className="button button-dark" href="/contact">Contact Us <ArrowIcon /></Link></section>
  </main>;
}
