import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CleanIcon, FarmIcon, LabourIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Product", description: "Explore the Wise Saturn automatic self-cleaning livestock water trough." };

export default function ProductPage() {
  return <main className="inner-page">
    <section className="page-hero page-shell"><div className="section-label"><span>Product</span> Wise Saturn water trough</div><h1>A livestock trough,<br/>reconsidered.</h1><p>Automatic cleaning support in a practical, low-profile system for Australian livestock operations.</p></section>
    <section className="product-primary page-shell"><div className="studio-image"><img src="/images/products/main-product/studio/water-trough-main-front.png" alt="Wise Saturn water trough, front studio view" /></div><div className="product-summary"><span className="overline">Main product</span><h2>Long, accessible and built for daily use.</h2><p>The Wise Saturn trough provides a generous drinking edge with key system components protected at each end.</p><Link className="button button-dark" href="/contact">Request product information <ArrowIcon/></Link></div></section>
    <section className="detail-band page-shell"><div><CleanIcon/><h3>Automatic cleaning</h3><p>Designed to support regular, repeatable cleaning cycles.</p></div><div><WaterIcon/><h3>Cleaner water</h3><p>Regular cleaning helps reduce settled material in the trough.</p></div><div><LabourIcon/><h3>Less manual work</h3><p>Reduce the time spent on repetitive trough maintenance.</p></div><div><FarmIcon/><h3>Farm ready</h3><p>A straightforward format for livestock environments.</p></div></section>
    <section className="product-angle"><div className="angle-copy"><div className="section-label light"><span>Design</span> Every side considered</div><h2>Protected where it matters.</h2><p>End housings keep key components contained while retaining a clean, durable working form.</p></div><div className="angle-image"><img src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn water trough, three-quarter studio view" /></div></section>
    <section className="page-cta page-shell"><h2>Get the right information<br/>for your property.</h2><Link className="button button-dark" href="/contact">Talk to Wise Saturn <ArrowIcon/></Link></section>
  </main>;
}

