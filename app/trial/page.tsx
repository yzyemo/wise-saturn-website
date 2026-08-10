import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "../components/Icons";

export const metadata: Metadata = { title:"3-Month Feedlot Trial",description:"Apply for a supported three-month Wise Saturn self-cleaning water trough trial for Australian sheep feedlot operations.",alternates:{canonical:"/trial"} };
export default function TrialPage(){return <main className="inner-page campaign-page">
  <section className="campaign-hero page-shell"><p className="eyebrow light"><span>Try before you buy</span></p><h1>3-Month<br/>Feedlot Trial.</h1><p>Evaluate the Wise Saturn self-cleaning trough in your own sheep operation before making a purchase decision.</p><Link className="button button-white" href="/contact?type=trial">Apply for the trial <ArrowIcon/></Link></section>
  <section className="campaign-benefits page-shell"><div className="section-label"><span>01</span> Trial support</div><div className="trial-grid"><article><b>01</b><h2>Zero upfront product cost.</h2><p>Approved trial sites can assess the trough during the agreed trial period before deciding whether to purchase.</p></article><article><b>02</b><h2>Installation support.</h2><p>We review the water supply, drainage, operating environment and livestock access before installation.</p></article><article><b>03</b><h2>Operational follow-up.</h2><p>We monitor practical performance and gather feedback throughout the three-month trial.</p></article><article><b>04</b><h2>Decision after trial.</h2><p>At completion, choose whether to purchase, expand the installation or conclude the trial.</p></article></div></section>
  <section className="campaign-fit"><div className="page-shell"><div><div className="section-label light"><span>02</span> Best fit</div><h2>Built for commercial sheep operations.</h2></div><ul><li>Australian feedlot sheep operations</li><li>Large commercial sheep farms</li><li>Sites with reliable water supply and drainage</li><li>Teams seeking lower cleaning labour</li></ul></div></section>
  <section className="contact-strip page-shell"><p>Ready to test it on your property?</p><Link href="/contact?type=trial">Apply for a 3-month trial <ArrowIcon/></Link></section>
  </main>}

