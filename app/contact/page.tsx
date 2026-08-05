import type { Metadata } from "next";
import { ArrowIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Contact Wise Saturn Australia about its livestock water trough system." };

export default function ContactPage() {
  return <main className="inner-page contact-page">
    <section className="contact-hero page-shell"><div className="section-label light"><span>Contact</span> Wise Saturn Australia</div><h1>Let’s talk about<br/>your property.</h1><p>For product questions, demonstrations and purchase enquiries, contact Wise Saturn directly.</p></section>
    <section className="contact-details page-shell"><div className="contact-intro"><span className="overline">Direct contact</span><h2>Real questions deserve a direct answer.</h2><p>Tell us about your livestock, property and current watering setup. We’ll help you understand whether Wise Saturn is relevant to your operation.</p></div><div className="contact-list"><a href="mailto:peixing@hotmail.com"><small>Email</small><strong>peixing@hotmail.com</strong><ArrowIcon/></a><a href="tel:+61435694228"><small>Phone</small><strong>0435 694 228</strong><ArrowIcon/></a><div><small>Country</small><strong>Australia</strong></div></div></section>
    <section className="contact-note page-shell"><span>Product enquiries</span><p>Please include your location, livestock type and approximate head count when contacting us.</p></section>
  </main>;
}

