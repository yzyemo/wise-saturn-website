import Image from "next/image";
import Link from "next/link";
import { getProductSections,getPublishedContent,youtubeEmbed } from "@/lib/content";
import DemoVideo from "./components/DemoVideo";
import ProductTabs from "./components/ProductTabs";
import { ArrowIcon } from "./components/Icons";
import { howItWorksDefault } from "@/lib/how-it-works";
import "./award.css";

const benefitCards=[
  {title:"Self Cleaning",text:"A scheduled cycle moves settled waste through the protected discharge system.",value:"Less repetitive trough emptying and scrubbing.",image:"/images/products/main-product/studio/water-trough-main-angle.png",position:"50% 56%"},
  {title:"Save Water",text:"Targeted cleaning avoids routinely draining the entire trough.",value:"Use water for the cleaning task, not unnecessary full-volume dumping.",image:"/images/homepage/hero/wise-saturn-homepage-hero.png",position:"30% 58%"},
  {title:"Continuous Water Exchange",text:"Regular exchange replaces stale water during daily operation.",value:"Maintain a fresher supply for livestock across the day.",image:"/images/products/main-product/studio/water-trough-main-front.png",position:"50% 48%"},
  {title:"Keeps Water Cooler",text:"Water exchange helps reduce heat-affected standing water.",value:"Support more consistent drinking conditions in warm weather.",image:"/images/homepage/hero/wise-saturn-homepage-hero.png",position:"72% 52%"},
];

export const dynamic="force-dynamic";
export default async function Home(){const[sections,videos,updates]=await Promise.all([getProductSections(),getPublishedContent("video"),getPublishedContent("update")]);const how=sections.find(item=>item.key==="how_it_works")??howItWorksDefault,featured=videos[0],embed=youtubeEmbed(featured?.media_url||"https://www.youtube.com/watch?v=2WqtQojcaEk");return <main>
  <section className="production-hero">
    <div className="hero-copy"><span className="kicker light">Automatic livestock water management</span><h1>Automatic Self-Cleaning Water Trough</h1><div className="hero-benefits"><span>Cleaner Water</span><span>Less Labour</span><span>Save Water</span><span>Continuous Water Exchange</span><span>Keeps Water Cooler</span></div><div className="hero-actions"><DemoVideo className="button light-button" label="Watch Demo"/><Link className="button outline-button" href="/contact?type=trial">Start 3 Month Trial</Link><Link className="button text-button" href="/contact?type=dealer">Become A Dealer <ArrowIcon/></Link></div></div>
    <div className="hero-product"><Image src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn automatic self-cleaning water trough in realistic 2000 by 200 by 400 millimetre proportions" fill priority sizes="(max-width:900px) 100vw,52vw"/><div className="hero-video"><iframe src={`${embed}&autoplay=0`} title="Play the Wise Saturn product demonstration" allow="encrypted-media;picture-in-picture" allowFullScreen/></div><div className="hero-dimensions"><span>2000 mm L</span><span>200 mm W</span><span>400 mm H</span></div></div>
  </section>

  {updates.some(item=>item.slug==="saturn-trough-2026-nab-agribusiness-award-excellence")&&<section className="page-shell award-recognition"><div className="award-recognition-image"><Image src="/images/news/anfd-2026-443.webp" alt="Presentation of the NAB Agribusiness Award of Excellence to Wisepac Australia" width={1800} height={1350} sizes="(max-width:800px) 100vw, 320px"/></div><div><span className="kicker">Recognition · 2026</span><h2>NAB Agribusiness Award of Excellence</h2><p>Presented to Wisepac Australia at Australian National Field Days.</p><Link className="inline-link" href="/updates/saturn-trough-2026-nab-agribusiness-award-excellence">Read the story <ArrowIcon/></Link></div></section>}

  <section className="benefit-section page-shell"><div className="section-heading"><div><span className="kicker">Operational value</span><h2>Four direct outcomes.</h2></div><p>Each outcome addresses a daily livestock water-management task.</p></div><div className="benefit-photo-grid">{benefitCards.map((item)=><article key={item.title}><div className="card-photo"><Image src={item.image} alt={`${item.title} operational view of the Wise Saturn water trough`} fill sizes="(max-width:700px) 100vw,25vw" style={{objectPosition:item.position}}/></div><div><h3>{item.title}</h3><p>{item.text}</p><strong>{item.value}</strong></div></article>)}</div></section>

  <section className="trial-panel"><div className="page-shell trial-panel-grid"><div><span className="kicker light">Try Before You Buy</span><h2>3 Month Trial.</h2><p>Evaluate the Wise Saturn trough in your own operation with installation support and a defined performance review.</p></div><ol><li><b>01</b><span>Application</span></li><li><b>02</b><span>Installation Support</span></li><li><b>03</b><span>Performance Evaluation</span></li><li><b>04</b><span>Purchase After Trial</span></li></ol><Link className="button light-button" href="/contact?type=trial">Apply For Trial <ArrowIcon/></Link></div></section>

  <section className="page-shell how-compact"><span className="kicker">How It Works</span><h2>{how.title}</h2><p>{how.body.split(/\n\s*\n/).filter(Boolean).at(-1)}</p><Link className="inline-link" href="/product#how-it-works">Discover how it works <ArrowIcon/></Link></section>

  <section className="product-tab-section page-shell"><div className="section-heading"><div><span className="kicker">Product</span><h2>One system. Full detail.</h2></div><p>Review the product, installation, controls and approved resources without leaving the page.</p></div><ProductTabs sections={sections.filter(item=>item.key!=="how_it_works")}/></section>

  <section className="media-news-grid page-shell"><div className="homepage-library"><div className="section-heading compact"><div><span className="kicker">Videos</span><h2>See it working.</h2></div><Link className="inline-link" href="/videos">All videos <ArrowIcon/></Link></div><div className="wide-video"><iframe src={embed} title={featured?.title||"Wise Saturn product demonstration"} allow="encrypted-media;picture-in-picture" allowFullScreen/></div><p>{featured?.summary||"See the automatic self-cleaning trough in operation."}</p></div><div className="homepage-news"><div className="section-heading compact"><div><span className="kicker">News</span><h2>Current activity.</h2></div><Link className="inline-link" href="/updates">All news <ArrowIcon/></Link></div>{(updates.length?updates.slice(0,3):[{id:"trial",category:"Support",title:"Three-Month Feedlot Trial Applications Open",summary:"Australian sheep feedlot operators can apply for an on-site product trial."}]).map((item)=><article key={item.id}><span>{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div></section>

  <section className="conversion-strip page-shell"><div><span className="kicker">Next step</span><h2>Trial the product or represent Wise Saturn.</h2></div><div><Link className="button primary" href="/contact?type=trial">Apply For Trial</Link><Link className="button secondary" href="/contact?type=dealer">Dealer Enquiry</Link></div></section>
</main>}
