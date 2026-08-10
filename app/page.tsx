import Image from "next/image";
import Link from "next/link";
import DemoVideo from "./components/DemoVideo";
import { ArrowIcon, CleanIcon, FlowIcon, LabourIcon, WaterIcon } from "./components/Icons";

const benefits=[
  {title:"Self cleaning",text:"A timed cycle moves settled waste out of the trough.",icon:<CleanIcon/>},
  {title:"Save water",text:"Targeted flushing avoids repeatedly emptying the entire trough.",icon:<WaterIcon/>},
  {title:"Exchange & cooling",text:"Regular water exchange helps reduce stale, heat-affected water.",icon:<FlowIcon/>},
  {title:"Reduce labour",text:"Spend less time on repetitive trough emptying and scrubbing.",icon:<LabourIcon/>},
];

export default function Home(){return <main>
  <section className="home-hero sales-hero"><Image className="hero-media" src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn self-cleaning trough with sheep and cattle" fill priority sizes="100vw"/><div className="hero-shade"/><div className="hero-content page-shell"><p className="eyebrow light"><span>Built for feedlot sheep operations</span></p><h1><span>Automatic Self-Cleaning</span><span>Water Trough</span></h1><p className="hero-audience">Cleaner water. Less labour. Save water. Keep water cool.</p><div className="hero-actions"><DemoVideo/><Link className="button button-outline" href="/contact?type=trial">Apply for 3-month trial <ArrowIcon/></Link></div></div><div className="hero-index"><span>WISE SATURN</span><b>01</b></div></section>

  <section className="features-section page-shell home-benefits"><div className="section-label"><span>01</span> Operational value</div><div className="feature-heading"><h2>Five problems.<br/>One practical system.</h2><p>Designed around the daily reality of commercial livestock water management.</p></div><div className="feature-grid">{benefits.map((item,index)=><article key={item.title}><div className="feature-top"><span>0{index+1}</span>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

  <section className="trial-home"><div className="page-shell trial-home-grid"><div><p className="eyebrow light"><span>Try before you buy</span></p><h2>3-Month<br/>Feedlot Trial.</h2></div><div><p>Approved Australian sheep feedlot operations can evaluate the trough on-site with installation and trial support, then decide after the trial.</p><ol><li>Apply</li><li>Site review</li><li>Install & trial</li><li>Decide</li></ol><Link className="button button-white" href="/trial">See trial details <ArrowIcon/></Link></div></div></section>

  <section className="product-showcase home-product"><div className="product-copy"><div className="section-label light"><span>02</span> Product overview</div><h2>Long, low-profile,<br/>built to work.</h2><p>Approximate 2000 × 200 × 400 mm proportions, protected end housings and a serviceable automatic cleaning system.</p><ul><li>Sheep feedlot focused</li><li>Valve and controller integration</li><li>Installation support</li></ul><Link className="button button-white dark-text" href="/product">Explore the product <ArrowIcon/></Link></div><div className="product-image-wrap"><Image src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn water trough in realistic low-profile proportions" width={1400} height={900} sizes="(max-width:760px) 100vw,60vw"/></div></section>

  <section className="home-video page-shell"><div><div className="section-label"><span>03</span> Product demonstration</div><h2>See the cleaning system working.</h2><p>Watch the existing Wise Saturn demonstration before reviewing the detailed product information.</p></div><div className="home-video-player"><iframe src="https://www.youtube-nocookie.com/embed/2WqtQojcaEk?rel=0" title="Wise Saturn product demonstration" allow="encrypted-media; picture-in-picture" allowFullScreen/></div></section>

  <section className="home-paths page-shell"><Link href="/updates"><span>04</span><small>Latest</small><h2>Trial, product and dealer updates.</h2><ArrowIcon/></Link><Link href="/contact?type=dealer"><span>05</span><small>Dealer opportunities</small><h2>Represent Wise Saturn in your region.</h2><ArrowIcon/></Link></section>
  <section className="contact-strip page-shell"><p>Discuss your operation with Wise Saturn.</p><Link href="/contact">Start an enquiry <ArrowIcon/></Link></section>
</main>}
