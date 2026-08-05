import type { Metadata } from "next";
import { ArrowIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Contact Wise Saturn Australia about its livestock water trough system." };

export default function ContactPage() {
  return <main className="inner-page contact-page contact-page-complete">
    <section className="contact-complete-hero"><div className="page-shell"><div className="section-label light"><span>Contact</span> Wise Saturn Australia</div><h1>Let's Talk About<br/>Your Property.</h1><p>For product questions, demonstrations, brochure requests and purchase enquiries, contact Wise Saturn directly.</p></div></section>
    <section className="contact-complete-main">
      <div className="contact-complete-details">
        <span className="overline">Direct Contact</span><h2>Start a Product Enquiry.</h2><p>Tell us about your livestock, location and current watering setup. We will help you understand whether Wise Saturn is relevant to your operation.</p>
        <div className="contact-complete-list"><a href="mailto:peixing@hotmail.com"><small>Email</small><strong>peixing@hotmail.com</strong><ArrowIcon /></a><a href="tel:+61435694228"><small>Phone</small><strong>0435 694 228</strong><ArrowIcon /></a><div><small>Company Location</small><strong>Australia</strong></div></div>
      </div>
      <form className="contact-form" action="mailto:peixing@hotmail.com" method="post" encType="text/plain">
        <div className="contact-form-heading"><span>Product Inquiry</span><p>Fields marked * are required.</p></div>
        <label><span>Name *</span><input name="Name" type="text" required autoComplete="name" /></label>
        <label><span>Email *</span><input name="Email" type="email" required autoComplete="email" /></label>
        <div className="contact-form-row"><label><span>Phone</span><input name="Phone" type="tel" autoComplete="tel" /></label><label><span>Location</span><input name="Location" type="text" autoComplete="address-level2" /></label></div>
        <label><span>Livestock Type</span><select name="Livestock"><option value="">Select an option</option><option>Cattle</option><option>Sheep</option><option>Cattle and Sheep</option><option>Other</option></select></label>
        <label><span>How Can We Help? *</span><textarea name="Message" rows={5} required /></label>
        <button className="button button-dark" type="submit">Send Inquiry <ArrowIcon /></button>
        <p className="contact-form-note">Submitting opens your email application with the enquiry details.</p>
      </form>
    </section>
    <section className="contact-inquiry-cta page-shell"><p>Prefer to speak directly?</p><a className="button button-dark" href="tel:+61435694228">Call Wise Saturn <ArrowIcon /></a></section>
  </main>;
}
