"use client";
import { FormEvent, useState } from "react";
import { ArrowIcon } from "../components/Icons";

type EnquiryType = "customer" | "trial" | "dealer";
type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ initialType = "customer" }: { initialType?: EnquiryType }) {
  const [type, setType] = useState<EnquiryType>(initialType);
  const [status, setStatus] = useState<Status>("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      if (!response.ok) throw new Error("Submission failed");
      form.reset(); setType("customer"); setStatus("success");
    } catch { setStatus("error"); }
  }
  return <form className="contact-form smart-enquiry-form" onSubmit={submit}>
    <div className="contact-form-heading"><span>Start an enquiry</span><p>Fields marked * are required.</p></div>
    <fieldset className="enquiry-type"><legend>I am interested in</legend>{(["customer","trial","dealer"] as EnquiryType[]).map((value)=><label key={value}><input type="radio" name="type" value={value} checked={type===value} onChange={()=>setType(value)}/><span>{value === "customer" ? "Product" : value === "trial" ? "3-Month Trial" : "Dealer"}</span></label>)}</fieldset>
    <div className="contact-form-row"><label><span>Name *</span><input name="name" required maxLength={100} autoComplete="name" /></label><label><span>{type === "dealer" ? "Company *" : "Farm / Company"}</span><input name="company" required={type === "dealer"} maxLength={150} autoComplete="organization" /></label></div>
    <div className="contact-form-row"><label><span>Phone *</span><input name="phone" type="tel" required maxLength={50} autoComplete="tel" /></label><label><span>Email *</span><input name="email" type="email" required maxLength={254} autoComplete="email" /></label></div>
    <div className="contact-form-row"><label><span>{type === "dealer" ? "Country *" : "Location *"}</span><input name="location" required maxLength={160} autoComplete="address-level1" /></label><label><span>{type === "dealer" ? "Region" : "Livestock"}</span><input name="livestock" maxLength={120} placeholder={type === "dealer" ? "Sales territory" : "Sheep, cattle or mixed"}/></label></div>
    {type !== "dealer" && <><div className="contact-form-row"><label><span>Head Count</span><input name="headCount" type="number" min="0" max="10000000" /></label><label><span>Current Watering</span><input name="currentWatering" maxLength={200} /></label></div>{type === "trial" && <div className="contact-form-row"><label><span>Preferred Trial Time</span><input name="preferredTrialTime" maxLength={120} /></label><label><span>Interested Quantity</span><input name="interestedQuantity" type="number" min="1" max="10000" /></label></div>}{type === "trial" && <label><span>Current Cleaning Method</span><input name="cleaningMethod" maxLength={240} /></label>}</>}
    {type === "dealer" && <><div className="contact-form-row"><label><span>Sales Experience</span><input name="salesExperience" maxLength={240}/></label><label><span>Expected Annual Volume</span><input name="annualVolume" type="number" min="0" max="100000" /></label></div><div className="contact-form-row"><label><span>Expected First Order</span><input name="firstOrder" type="number" min="0" max="100000" /></label><label><span>Warehouse</span><select name="warehouse"><option value="">Select</option><option value="yes">Available</option><option value="no">Not currently</option></select></label></div></>}
    <label><span>Message</span><textarea name="message" rows={5} maxLength={5000} /></label>
    <label className="contact-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : type === "trial" ? "Apply for Trial" : type === "dealer" ? "Send Dealer Enquiry" : "Send Enquiry"} <ArrowIcon /></button>
    <div className="form-response" aria-live="polite">{status === "success" && <p className="form-success">Thank you. Your enquiry has been received.</p>}{status === "error" && <p className="form-error">Sorry, something went wrong. Please try again later.</p>}</div>
  </form>;
}
