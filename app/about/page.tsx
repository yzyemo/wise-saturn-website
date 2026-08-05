import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, FarmIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = { title: "About", description: "About Wise Saturn and its practical approach to livestock water systems." };

export default function AboutPage() {
  return <main className="inner-page">
    <section className="page-hero about-hero"><div className="page-shell"><div className="section-label light"><span>About</span> Wise Saturn</div><h1>Practical thinking<br/>for Australian farms.</h1><p>Wise Saturn is focused on improving a routine piece of livestock infrastructure: the water trough.</p></div></section>
    <section className="about-story page-shell"><div><span className="overline">Our focus</span><h2>Less complexity.<br/>Better daily operation.</h2></div><div><p className="large-copy">We believe farm equipment should solve a clear problem, stand up to daily use and remain straightforward to understand.</p><p>Wise Saturn applies that thinking to livestock water trough maintenance—supporting cleaner water routines while reducing repetitive work.</p></div></section>
    <section className="values page-shell"><article><WaterIcon/><span>01</span><h3>Animal water</h3><p>Support a cleaner, more consistent livestock watering environment.</p></article><article><FarmIcon/><span>02</span><h3>Farm practicality</h3><p>Design around real operating conditions and straightforward use.</p></article><article><ShieldIcon/><span>03</span><h3>Clear ownership</h3><p>Keep the product understandable, serviceable and easy to discuss.</p></article></section>
    <section className="page-cta page-shell"><h2>Talk directly with<br/>Wise Saturn Australia.</h2><Link className="button button-dark" href="/contact">Contact us <ArrowIcon/></Link></section>
  </main>;
}

