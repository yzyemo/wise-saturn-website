import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CleanIcon, FarmIcon, FlowIcon, LabourIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Product",
  description: "Explore the Wise Saturn automatic self-cleaning livestock water trough.",
};

const benefits = [
  { title: "Automatically removes sediment", icon: <CleanIcon /> },
  { title: "Cleaner drinking water", icon: <WaterIcon /> },
  { title: "Reduces algae build-up", icon: <ShieldIcon /> },
  { title: "Lower maintenance", icon: <LabourIcon /> },
  { title: "Suitable for cattle and sheep", icon: <FlowIcon /> },
  { title: "Designed for Australian farms", icon: <FarmIcon /> },
];

const specifications = [
  ["Material", "Durable farm-ready construction"],
  ["Capacity", "Model-specific — contact Wise Saturn"],
  ["Drain System", "Automatic waste-flushing outlet"],
  ["Cleaning Cycle", "Timed automatic cycle"],
  ["Power Supply", "Installation-specific"],
  ["Suitable Animals", "Cattle and sheep"],
  ["Installation", "Property assessment recommended"],
];

export default function ProductPage() {
  return <main className="inner-page product-page">
    <section className="product-overview page-shell">
      <div className="product-overview-image">
        <img src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn automatic self-cleaning livestock water trough" />
      </div>
      <div className="product-overview-copy">
        <div className="section-label"><span>Product</span> Wise Saturn water trough</div>
        <h1><span>Automatic Self-Cleaning</span><span>Livestock Water Trough</span></h1>
        <p>Designed for Australian cattle and sheep farms to provide cleaner drinking water with significantly reduced maintenance.</p>
        <div className="product-overview-badges" aria-label="Product highlights">
          <span>Automatic Cleaning</span><span>Cleaner Water</span><span>Cattle &amp; Sheep</span><span>Low Maintenance</span>
        </div>
        <div className="product-overview-actions">
          <Link className="button button-dark product-overview-cta" href="/contact">Contact Us <ArrowIcon /></Link>
          <a className="button product-brochure-button" href="/documents/brochures/wise-saturn-product-brochure.pdf" download>Download Brochure <ArrowIcon /></a>
        </div>
      </div>
    </section>

    <section className="product-benefits page-shell">
      <div className="section-label"><span>01</span> Key Benefits</div>
      <div className="product-section-heading"><h2>Practical outcomes.<br/>Built into the product.</h2><p>Six clear benefits designed around cleaner water, easier upkeep and everyday livestock use.</p></div>
      <div className="product-benefit-grid">
        {benefits.map((benefit, index) => <article key={benefit.title}><div><span>0{index + 1}</span>{benefit.icon}</div><h3>{benefit.title}</h3></article>)}
      </div>
    </section>

    <section className="product-how">
      <div className="page-shell">
        <div className="section-label light"><span>02</span> How It Works</div>
        <div className="product-how-heading"><h2>A simple automatic cycle.</h2><p>Cleaning is handled in three straightforward stages.</p></div>
        <div className="product-steps">
          <article><span>01</span><h3>Sediment settles naturally.</h3></article>
          <div className="product-step-arrow" aria-hidden="true">↓</div>
          <article><span>02</span><h3>Timed cleaning cycle activates.</h3></article>
          <div className="product-step-arrow" aria-hidden="true">↓</div>
          <article><span>03</span><h3>Waste is flushed away automatically.</h3></article>
        </div>
      </div>
    </section>

    <section className="product-applications page-shell">
      <div className="section-label"><span>03</span> Applications</div>
      <div className="product-section-heading"><h2>One system.<br/>Two livestock settings.</h2><p>Purposeful water access for cattle and sheep operations.</p></div>
      <div className="application-grid">
        <article><div className="application-image cattle"><img src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn trough in a cattle installation" /></div><div><span>01</span><h3>Cattle Installation</h3></div></article>
        <article><div className="application-image sheep"><img src="/images/homepage/hero/wise-saturn-homepage-hero.png" alt="Wise Saturn trough in a sheep installation" /></div><div><span>02</span><h3>Sheep Installation</h3></div></article>
      </div>
    </section>

    <section className="product-specifications page-shell">
      <div className="section-label"><span>04</span> Specifications</div>
      <div className="product-spec-layout">
        <div><h2>Product details at a glance.</h2><p>Final specifications are confirmed for the selected model and installation.</p></div>
        <div className="spec-table" role="table" aria-label="Wise Saturn product specifications">
          {specifications.map(([label, value]) => <div className="spec-row" role="row" key={label}><div role="rowheader">{label}</div><div role="cell">{value}</div></div>)}
        </div>
      </div>
    </section>

    <section className="product-bottom-cta page-shell">
      <p>Ready to improve livestock water quality?</p>
      <Link className="button button-dark" href="/contact">Contact Us <ArrowIcon /></Link>
    </section>
  </main>;
}
