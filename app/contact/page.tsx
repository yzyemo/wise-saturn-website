import type { Metadata } from "next";
import { ArrowIcon } from "../components/Icons";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Contact Wise Saturn Australia for product, trial, business and distributor enquiries.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main className="inner-page contact-page contact-page-complete">
    <section className="contact-complete-hero"><div className="page-shell"><div className="section-label light"><span>Contact</span> Wise Saturn Australia</div><h1>Let&apos;s Talk About<br/>Your Property.</h1><p>For product questions, demonstrations, brochure requests and purchase enquiries, contact Wise Saturn directly.</p></div></section>
    <section className="contact-complete-main">
      <div className="contact-complete-details">
        <span className="overline">Direct Contact</span><h2>Start a Product Enquiry.</h2><p>Tell us about your livestock, location and current watering setup. We will help you understand whether Wise Saturn is relevant to your operation.</p>
        <div className="contact-complete-list"><a href="mailto:peixing@hotmail.com"><small>Email</small><strong>peixing@hotmail.com</strong><ArrowIcon /></a><a href="tel:+61435694228"><small>Phone</small><strong>0435 694 228</strong><ArrowIcon /></a><div><small>Company Location</small><strong>Australia</strong></div></div>
      </div>
      <ContactForm />
    </section>
    <section className="contact-map page-shell" aria-label="Wise Saturn location"><div><span className="overline">Company Location</span><h2>Australia</h2><p>Serving cattle and sheep operations across Australia. Contact us to discuss your property and installation area.</p></div><div className="map-placeholder" role="img" aria-label="Map placeholder showing Australia"><span>AU</span><p>Google Maps location available by appointment</p></div></section>
    <section className="contact-inquiry-cta page-shell"><p>Prefer to speak directly?</p><a className="button button-dark" href="tel:+61435694228">Call Wise Saturn <ArrowIcon /></a></section>
  </main>;
}
