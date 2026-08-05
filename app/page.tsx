import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, CleanIcon, FarmIcon, LabourIcon, PlayIcon, WaterIcon } from "./components/Icons";

const features = [
  { title: "Automatic Cleaning", text: "A scheduled cleaning cycle helps move settled waste from the trough.", icon: <CleanIcon /> },
  { title: "Cleaner Water", text: "Regular turnover supports cleaner water for cattle and sheep.", icon: <WaterIcon /> },
  { title: "Healthier Livestock", text: "Cleaner drinking water supports the daily health and wellbeing of livestock.", icon: <FarmIcon /> },
  { title: "Lower Maintenance", text: "Reduce repetitive trough-cleaning work across the property.", icon: <LabourIcon /> },
];

export default function Home() {
  return <main>
    <section className="home-hero">
      <Image className="hero-media" src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn livestock water trough with cattle and sheep on an Australian farm" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="hero-content page-shell">
        <p className="eyebrow light"><span>Patent-Pending Self-Cleaning Technology</span></p>
        <h1>
          <span className="hero-title-desktop">Automatic Self-Cleaning</span>
          <span className="hero-title-mobile"><span>Automatic</span><span>Self-Cleaning</span></span>
          <span className="hero-title-product">Livestock Water Trough</span>
        </h1>
        <p className="hero-audience">For Cattle &amp; Sheep Farms</p>
        <ul className="hero-points"><li>Automatic Cleaning</li><li>Cleaner Water</li><li>Healthier Livestock</li><li>Lower Maintenance</li></ul>
        <div className="hero-actions"><Link className="button button-white" href="/videos"><PlayIcon/> Watch Demo</Link><Link className="button button-outline" href="/contact?enquiry=trial">Request a Trial <ArrowIcon/></Link></div>
      </div>
      <div className="hero-index"><span>WISE SATURN</span><b>01</b></div>
    </section>

    <section className="intro-section page-shell">
      <div className="section-label"><span>01</span> The better daily routine</div>
      <div className="intro-grid">
        <h2>Water systems should work as hard as the farm does.</h2>
        <div><p className="large-copy">Wise Saturn is designed to keep livestock water trough maintenance straightforward, consistent and easier to manage.</p><Link className="text-link" href="/technology">Explore the technology <ArrowIcon/></Link></div>
      </div>
    </section>

    <section className="product-showcase">
      <div className="product-copy">
        <div className="section-label light"><span>02</span> The product</div>
        <h2>Purpose-built.<br/>Nothing extra.</h2>
        <p>A low-profile livestock water trough with protected end housings and a clean, serviceable form.</p>
        <ul><li>Long drinking edge</li><li>Protected system components</li><li>Designed for cattle and sheep</li></ul>
        <Link className="button button-white dark-text" href="/product">View the product <ArrowIcon/></Link>
      </div>
      <div className="product-image-wrap"><Image src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn water trough, angled studio view" width={1400} height={900} sizes="(max-width: 760px) 100vw, 60vw" /></div>
    </section>

    <section className="features-section page-shell">
      <div className="section-label"><span>03</span> Practical advantages</div>
      <div className="feature-heading"><h2>Built around four clear outcomes.</h2><p>Simple benefits for the people managing the property and the livestock relying on it.</p></div>
      <div className="feature-grid">{features.map((item, i) => <article key={item.title}><div className="feature-top"><span>0{i + 1}</span>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className="video-banner page-shell">
      <div><div className="section-label light"><span>04</span> See it working</div><h2>Watch the product<br/>in action.</h2></div>
      <Link className="video-play" href="/videos" aria-label="Watch the Wise Saturn product video"><PlayIcon/><span>Watch demo</span></Link>
    </section>

    <section className="contact-strip page-shell"><p>Ready to discuss your property?</p><Link href="/contact">Contact Wise Saturn <ArrowIcon/></Link></section>
  </main>;
}
